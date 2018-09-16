echo 'Installing Expo CLI'
sudo npm install -g exp@57.1.4
echo 'Starting clean session. Logging out of Expo'
exp logout
echo 'Logging into Expo'
exp login --non-interactive -u $EXPO_EMAIL_ADDRESS -p $EXPO_PASSWORD
echo 'Building and publishing to Expo'
exp publish --non-interactive
echo 'Build and publish successful!'
