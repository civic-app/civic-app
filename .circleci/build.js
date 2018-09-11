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

runCommand(exec('sudo npm install -g exp'))
  /*.then(() => {
    console.log('Logging into Expo');
    return runCommand(exec(`exp login -u ${process.env.EXPO_EMAIL_ADDRESS} -p ${process.env.EXPO_PASSWORD}`));
  })
  .then(() => {
    console.log('Building app for Android');
    return runCommand(exec('exp build:android'));
  })*/
  .then(() => {
    console.log('Build successfull. Logging out of Expo');
    return runCommand(exec('exp logout'));
  });
