const core = require('@actions/core');
const github = require('@actions/github');
const shell = require('shelljs');

try {
    const commit = core.getInput('commit');
    const username = core.getInput('username');
    installDependencies();
    installR();
    Rperform(commit);
    updateResult(username);
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

function Rperform(commitNum) {
  shell.exec('sudo R -e \'install.packages("devtools");' +
      'devtools::install_github("LooDaHu/Rperform");' +
      'devtools::install_dev_deps();' +
      'Rperform::run_all_test(num_commits='+ commitNum+');' +
      'q()\'');
}

function updateResult(username) {
  shell.exec('git config --global user.name \''+ username+ '\'');
  shell.exec('git config --global user.email \''+username+'@users.noreply.github.com\'');
  shell.exec('git add Rperform_Data/');
  shell.exec('git commit -m "Benchmark Result Update"');
  shell.exec('git push');
}
