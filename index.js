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
    installDependencies();
    installR();
    Rperform();
    updateResult();
} catch (error) {
    core.setFailed(error.message);
}


function installDependencies() {
    shell.exec('sudo apt install libcurl4-openssl-dev');
}

function installR() {
    shell.exec('sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E298A3A825C0D65DFD57CBB651716619E084DAB9');
    shell.exec('sudo add-apt-repository \'deb https://cloud.r-project.org/bin/linux/ubuntu bionic-cran35/\'');
    shell.exec('sudo apt update');
    shell.exec('sudo apt install r-base');
    shell.exec('sudo R --version');
}

function Rperform() {
  shell.exec('sudo R -e \'install.packages("devtools");devtools::install_github("LooDaHu/Rperform");devtools::install_dev_deps();Rperform::run_all_test(num_commits=1);q()\'');
}

function updateResult() {
  shell.exec('git config --global user.name \'LooDaHu\'');
  shell.exec('git config --global user.email \'LooDaHu@users.noreply.github.com\'');
  shell.exec('git add Rperform_Data/');
  shell.exec('git commit -m "Benchmark Result Update"');
  shell.exec('git push');
}
