import json
from base64 import b64encode
from os import urandom

from flask import current_app, url_for, request, redirect, session
from rauth import OAuth1Service, OAuth2Service


# https://blog.miguelgrinberg.com/post/oauth-authentication-with-flask

class OAuthSignIn:
    providers = None
    provider_name = None
    oauth_type = None
    authorize_url = None
    access_token_url = None
    request_token_url = None
    base_url = None

    def __init__(self, provider_name):
        self.provider_name = provider_name
        credentials = current_app.config['OAUTH_CREDENTIALS'][provider_name]
        self.consumer_id = credentials['id']
        self.consumer_secret = credentials['secret']
        if self.oauth_type == "oauth2":
            self.service = OAuth2Service(name=self.provider_name,
                                         authorize_url=self.authorize_url,
                                         access_token_url=self.access_token_url,
                                         client_id=self.consumer_id,
                                         client_secret=self.consumer_secret,
                                         base_url=self.base_url)
        elif self.oauth_type == "oauth1":
            self.service = OAuth1Service(name=self.provider_name,
                                         consumer_key=self.consumer_id,
                                         consumer_secret=self.consumer_secret,
                                         request_token_url=self.request_token_url,
                                         authorize_url=self.authorize_url,
                                         access_token_url=self.access_token_url,
                                         base_url=self.base_url)

    def get_oauth1_request_token(self):
        return self.service.get_request_token(params={'oauth_callback': self.get_callback_url()})

    def get_callback_url(self):
        return url_for(current_app.config.get("callback_url", 'oauth_callback'), provider=self.provider_name,
                       _external=True)

    def generate_random_string(self):
        random_bytes = urandom(64)
        return b64encode(random_bytes).decode('utf-8')

    def get_social_id(self, user_id):
        return self.provider_name + "|" + user_id if user_id else None

    def authorize(self):
        pass

    def callback(self):
        pass

    @staticmethod
    def decode_json(payload):
        return json.loads(payload.decode('utf-8'))

    @classmethod
    def get_provider(self, provider_name):
        if self.providers is None:
            self.providers = {provider.provider_name: provider() for provider in self.__subclasses__()}

        return self.providers[provider_name]


class GoogleSignIn(OAuthSignIn):
    oauth_type = "oauth2"
    provider_name = "google"
    authorize_url = 'https://accounts.google.com/o/oauth2/auth'
    access_token_url = 'https://accounts.google.com/o/oauth2/token'
    base_url = 'https://accounts.google.com/o/oauth2'

    def __init__(self):
        super(GoogleSignIn, self).__init__(self.provider_name)

    def authorize(self):
        return redirect(
            self.service.get_authorize_url(scope='profile', response_type='code', redirect_uri=self.get_callback_url())
        )

    def callback(self):
        if 'code' not in request.args:
            return None, None, None
        oauth_session = self.service.get_auth_session(
            data={'code': request.args['code'],
                  'grant_type': 'authorization_code',
                  'redirect_uri': self.get_callback_url()},
            decoder=self.decode_json
        )

        user = oauth_session.get('https://www.googleapis.com/oauth2/v1/userinfo').json()
        social_id = self.get_social_id(user.get("id"))
        return social_id, user.get('email').split('@')[0], user.get("email")


class FacebookSignIn(OAuthSignIn):
    oauth_type = "oauth2"
    provider_name = "facebook"
    authorize_url = 'https://graph.facebook.com/oauth/authorize'
    access_token_url = 'https://graph.facebook.com/oauth/access_token'
    base_url = 'https://graph.facebook.com/'

    def __init__(self):
        super(FacebookSignIn, self).__init__(self.provider_name)

    def authorize(self):
        return redirect(self.service.get_authorize_url(
            scope='email',
            response_type='code',
            redirect_uri=self.get_callback_url())
        )

    def callback(self):
        if 'code' not in request.args:
            return None, None, None
        oauth_session = self.service.get_auth_session(
            data={'code': request.args['code'],
                  'grant_type': 'authorization_code',
                  'redirect_uri': self.get_callback_url()},
            decoder=self.decode_json
        )

        user = oauth_session.get('me?fields=id,email').json()
        social_id = self.get_social_id(user.get("id"))
        return social_id, user.get('email').split('@')[0], user.get('email')


class TwitterSignIn(OAuthSignIn):
    oauth_type = "oauth1"
    provider_name = "twitter"
    authorize_url = 'https://api.twitter.com/oauth/authorize'
    access_token_url = 'https://api.twitter.com/oauth/access_token'
    request_token_url = 'https://api.twitter.com/oauth/request_token'
    base_url = 'https://api.twitter.com/1.1/'

    def __init__(self):
        super(TwitterSignIn, self).__init__(self.provider_name)

    def authorize(self):
        request_token = self.get_oauth1_request_token()
        session['request_token'] = request_token
        return redirect(self.service.get_authorize_url(request_token[0]))

    def callback(self):
        request_token = session.pop('request_token')
        if 'oauth_verifier' not in request.args:
            return None, None, None
        oauth_session = self.service.get_auth_session(
            request_token[0],
            request_token[1],
            data={'oauth_verifier': request.args['oauth_verifier']}
        )
        user = oauth_session.get('account/verify_credentials.json').json()
        social_id = self.get_social_id(str(user.get("id")))
        username = user.get('screen_name')
        return social_id, username, None  # Twitter does not provide email


class GithubSignIn(OAuthSignIn):
    oauth_type = "oauth1"  # https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/
    provider_name = "twitter"
    authorize_url = 'https://github.com/login/oauth/authorize'
    access_token_url = 'https://github.com/login/oauth/access_token'
    base_url = 'https://github.com/login/oauth'

    def __init__(self):
        super(GithubSignIn, self).__init__(self.provider_name)

    def authorize(self):
        state = self.generate_random_string()
        session['github_auth_state'] = state
        return redirect(self.service.get_authorize_url(
            scope='read:user',
            response_type='code',
            state=state,
            redirect_uri=self.get_callback_url())
        )

    def callback(self):
        state = session.pop('github_auth_state')
        if 'code' not in request.args:
            return None, None, None
        oauth_session = self.service.get_auth_session(
            data={'code': request.args['code'],
                  'grant_type': 'authorization_code',
                  'redirect_uri': self.get_callback_url(),
                  "state": state},
            decoder=self.decode_json
        )

        user = oauth_session.get('user').json()
        social_id = self.get_social_id(user.get("id"))
        return social_id, user.get('email').split('@')[0], user.get("email")


class LinkedinSignIn(OAuthSignIn):
    oauth_type = "oauth2"  # https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/
    provider_name = "linkedin"
    authorize_url = 'https://www.linkedin.com/oauth/v2/authorization'
    access_token_url = 'https://www.linkedin.com/oauth/v2/accessToken'
    base_url = 'https://api.linkedin.com/v2/'

    def authorize(self):
        state = self.generate_random_string()
        session['linkedin_auth_state'] = state
        return redirect(self.service.get_authorize_url(
            scope='r_basicprofile',
            response_type='code',
            state=state,
            redirect_uri=self.get_callback_url())
        )

    def callback(self):
        state = session.pop('linkedin_auth_state')
        if 'code' not in request.args:
            return None, None, None
        oauth_session = self.service.get_auth_session(
            data={'code': request.args['code'],
                  'grant_type': 'authorization_code',
                  'redirect_uri': self.get_callback_url(),
                  "state": state},
            decoder=self.decode_json
        )
        # https://developer.linkedin.com/docs/ref/v2/profile/basic-profile
        user = oauth_session.get('me?fields=id,vanityName,firstName,lastName').json()
        social_id = self.get_social_id(user.get("id"))
        return social_id, user.get('vanityName'), None


class Auth0SignIn(OAuthSignIn):
    oauth_type = "oauth2"
    provider_name = "auth0"

    def __init__(self):
        # Auth0 has custom base domain url
        self.auth0subdomain = current_app["OAUTH_CREDENTIALS"]["auth0"]["auth0subdomain"]
        self.authorize_url = 'https://{}.auth0.com'.format(self.auth0subdomain)
        self.access_token_url = 'https://{}.auth0.com/oauth/token'.format(self.auth0subdomain)
        self.base_url = 'https://{}.auth0.com'.format(self.auth0subdomain)
        self.logout_url = "https://cookiecutter-test.auth0.com/v2/logout"
        super(Auth0SignIn, self).__init__(self.provider_name)

    def authorize(self):
        return redirect(self.service.get_authorize_url(
            scope='openid profile',
            response_type='code',
            redirect_uri=self.get_callback_url())
        )

    def callback(self):
        if 'code' not in request.args:
            return None, None, None
        oauth_session = self.service.get_auth_session(
            data={'code': request.args['code'],
                  'grant_type': 'authorization_code',
                  'redirect_uri': self.get_callback_url()},
            decoder=self.decode_json
        )
        user = oauth_session.get('userinfo').json()
        social_id = self.get_social_id(user.get('sub'))
        return social_id, user.get("name"), user
