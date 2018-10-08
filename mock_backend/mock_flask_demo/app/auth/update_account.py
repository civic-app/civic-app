import hashlib
from datetime import datetime

from app.auth.tasks import send_async_email
from app.models.users import User
from flask import url_for, request, render_template, redirect, abort

from app import csrf
from app import db
from app.auth import auth


@auth.route('/verify_and_reset_account/<string:update_type>', methods=['GET', 'POST'])
def verify_and_reset_account(update_type="reset"):
    """
    Displays Reset/Verify Page or Sends Reset Password and Verify Account Email.
    :param update_type: reset or verify.
    :return: URL or Rendered Template
    """
    error = request.args.get("error")
    email = request.form.get("email")
    if email is None:  # checks to render view
        submit_text = "Send Verification Email" if update_type == "verify" else "Reset Password Link"
        return render_template('auth/reset.html', update_type=update_type,
                               submit_text=submit_text, error=error)
    user = User.query.filter_by(email=email).first()
    if user:
        send_verify_reset_email(user, update_type=update_type)
    return url_for('auth.login', _external=True)


@csrf.exempt
@auth.route('/password_reset', methods=['GET', 'POST'])
def password_reset():
    """
    Render Template to Reset Password or Receive and process request to update password
    :return: Rendered Template or URL
    """
    code = request.args.get("code")
    user = User.query.filter_by(password_reset_code=code).first()
    if not user:
        abort(404)
    error = request.args.get('error')
    return render_template("auth/resetPassword.html", code=code, error=error)


@auth.route("/password_reset_response")
def password_reset_response():
    code = request.form.get("code")
    password = request.form.get("password")
    user = User.query.filter_by(password_reset_code=code).first()
    user.password = password
    user.passwordResetCode = ""
    db.session.commit()

    return url_for("auth.login") + "?error={}".format("Password Reset")


@csrf.exempt
@auth.route('/verify_account_response', methods=['GET', 'POST'])
def verify_account_response():
    """
    Verify response from verification email.
    :return: a url to auth.login with message
    """
    user_id = request.args.get("user_id")
    code = request.args.get("code")
    user = User.query.filter_by(user_id=user_id, email_verification_code=code).first()
    if user:
        user.email_verified = True
        user.email_verification_code = ""
        db.session.commit()
        return redirect(url_for("auth.login") + "?error={}".format("Account Verified"))
    return redirect(url_for("auth.login") + "?error={}".format("Invalid Verification Code"))


def send_verify_reset_email(user: User, update_type):
    """
    Sends the Password Reset or Verify account Email.
    :param user: the user to send the account
    :param update_type: Either 'reset' or 'verify'
    """
    code = hashlib.sha256(user.username + update_type + str(datetime.utcnow()))
    if update_type == "reset":
        subject = "Reset Password"
        url = url_for('auth.password_reset', _external=True) + "?code={}".format(code)
        message = render_template('auth/email/password_reset_email.html', username=user.username, url=url)
        user.password_reset_code = code
    else:
        subject = "Verify Account"
        url = url_for('auth.verify_account_response', _external=True) + "?code={}".format(code)
        message = render_template('auth/email/verify_email.html', username=user.username, url=url)
        user.email_verification_code = code
    send_async_email.delay(subject, user.email, message)
    user.save()
