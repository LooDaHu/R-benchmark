# R benchmark

This action helps you timing the run-time of your R code, and saves the timing result in your repository. 

## Prerequisite

`Testthat` for R is required to use this action, you should have a directory, `root_dir/tests/testthat`, with testing scripts in your R project. And this action runs all testing scripts in that folder.

Note: If you are new to R testing and testthat, please check [Unit Testing for R, testthat.](https://testthat.r-lib.org/)

## :pencil2: How to use


### `Set up a workflow`

1. Click ![Action button](./readme_pics/action_button.JPG) at the top your repository page.

2. Click `set up a workflow yourself` which is highlighted in this figure.![set-up link](./readme_pics/set_up_link.JPG)  

3. Copy [Example usage](#Example usage) into the editor then commit it.


**Required** The name of the person to greet. Default `"World"`.

## Outputs

### `time`

The time we greeted you.

## Example usage

```yaml
uses: actions/hello-world-javascript-action@master
with:
  who-to-greet: 'Mona the Octocat'
```
