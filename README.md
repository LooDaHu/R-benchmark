# R benchmark

This action helps you timing the run-time of your R code, and save the timing result in your repository. 

## Prerequisite

`Testthat` for R is required to use this action, you should have testing scripts in your `root_dir/tests/testthat` folder. And this action runs all testing scripts in that folder.

Note: If you are new to R testing and testthat, please check [Unit Testing for R testthat.](https://testthat.r-lib.org/)

## How to use


### `who-to-greet`

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
