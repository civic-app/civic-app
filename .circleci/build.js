const cp = require('child_process');
const { promisify } = require('util');

const exec = promisify(cp.exec);

const runCommand = promiseResult =>
  promiseResult
    .then(output => {
      if (output.stdout) {
        console.log(output.stdout);
      }
      if (output.stderr) {
        console.log(output.stderr);
      }
    })
    .catch(error => {
      console.log(error);
      process.exit(1);
    });

console.log('Installing Expo CLI');

runCommand(exec('sudo npm install -g exp@^55.0.4'))
  .then(() => {
    console.log('Starting clean session. Logging out of Expo');
    return runCommand(exec('exp logout'));
  })
  .then(() => {
    console.log('Logging into Expo');
    // bug with expo login command see: https://github.com/expo/expo/issues/1855
    return runCommand(exec('exp login --non-interactive -u $EXPO_EMAIL_ADDRESS -p $EXPO_PASSWORD'));
  })
  .then(() => {
    console.log('Building app for Android');
    return runCommand(exec('exp --non-interactive build:android'));
  })
  .then(() => {
    console.log('Build successful!');
    process.exit(0);
  });
