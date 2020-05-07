const core = require('@actions/core');
const github = require('@actions/github');
const shell = require('shelljs');

try {
    // `who-to-greet` input defined in action metadata file
    // const nameToGreet = core.getInput('who-to-greet');
    const nameToGreet = "Jinming Yang"
    console.log(`Hello ${nameToGreet}!`);
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    // const payload = JSON.stringify(github.context.payload, undefined, 2)
    // console.log(`The event payload: ${payload}`);

    shell.exec('sudo bash ./scripts/install_dpnd.sh')
    shell.exec('sudo bash ./scripts/install_R.sh')
    shell.exec('sudo bash ./scripts/install_Rperform.sh')
} catch (error) {
    core.setFailed(error.message);
}
