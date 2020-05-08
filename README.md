# R benchmark

This action helps you timing the run-time of your R code, and saves the timing result in your repository. 

## :bulb: Prerequisite

`Testthat` for R is required to use this action, you should have a directory, `root_dir/tests/testthat`, with testing scripts in your R project. And this action runs all testing scripts in that folder.

Note: If you are new to R testing and testthat, please check [Unit Testing for R, testthat.](https://testthat.r-lib.org/)

## :wrench: How to use


### `Set up a workflow`

1. Click ![Action button](./readme_pics/action_button.JPG) at the top your repository page.

2. Click `set up a workflow yourself` which is highlighted in this figure.![set-up link](./readme_pics/set_up_link.JPG)  

3. Copy the [example usage](#pencil-example-usage) into the editor.

4. If you already have several commits which you want to timing in your repository, you can use [`Initialization`](#initialization) for a start. Or, you can use [`Normal`](#normal) directly.

5. Replace `<Github_username>` with your Github username, for example, LooDaHu. And also, replace `<number of commits>` with the number of existed commits you want to timing.

6. ![Commit_button](./readme_pics/commit_button.JPG), once you done.

7. Don't forget change you workflow to [`Normal`](#normal) at `root_dir/.github/workflows` if you choose [`Initialization`](#initialization) as a start.

### `Get the result`
The result dataset should be at `root_dir/Rpeform_Data`.
[Here](https://github.com/LooDaHu/PeakSegDisk/blob/master/Rperform_Data/PeakSegDisk_Result.csv) is a example result dataset for [`Initialization`](#initialization). 
|"test_num"|"test_name"|"metric_name"|"status"|"metric_val"|"commit_message"|"commit_SHA"|"commit_date"|"benchmark_date"|"benchmark_most_recent_SHA"|
|---|---|---|---|---|---|---|---|---|---|
1|"fread.last works with bad path"|"runtime (in seconds)"|"Pass"|0.0104406|"docs link break"|"13ecc3c46463515a4cfd33119bc797b7e462ade8"|2019-12-09 16:58:50|2020-05-07 21:47:35|"5434856e85618471ae22ceb1bb0a4ea5a7f9a234"

## :pencil: Example usage
### Initialization:
```yaml
name: R-benchmark # The name of this workflow

# The condition of toggling this workflow. For this workflow, it will be toggled when push or pull request happens at master branch.
on:  
  push:
    branches: [ master ] 
  pull_request:
    branches: [ master ]

jobs:
  benchmark:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2 # Checkout@v2 is a Github official workflow that can checkout your repo on VM.
      with:
        fetch-depth: 0 # will fetch all commits in history in the repo.
    - name: r-benchmark
      uses: LooDaHu/R-benchmark@v1
      with:
        username: <GitHub_username>(Required) # Replace it with your Github username.
        commit: <number of commits>(Optional) # Replace it with the number of existing commits from the head you want to timing.
# A timing result dataset will be produced once this workflow is committed.
```

### Normal:
```yaml
name: R-benchmark

# The condition of toggling this workflow. For this workflow, it will be toggled when push or pull request happens at master branch.
on:
  push:
    branches: [ master ]
    paths-ignore: # the ignored path for toggling.
      - '.github/workflows/**' # Changes in workflow files will not toggle this action
      - 'Rperform_Data/**' # Changes in result data will not toggle this action
  pull_request:
    branches: [ master ]
    paths-ignore: 
      - '.github/workflows/**'
      - 'Rperform_Data/**'

jobs:
  benchmark:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2 # Checkout@v2 is a Github official workflow that can checkout your repo on VM.
    - name: r-benchmark
      uses: LooDaHu/R-benchmark@v1
      with:
        username: <GitHub_username>(Requried) # Replace it with your Github username.
# A timing result of current pushed commit will be added into the result dataset once changes happen at non-ignored directories.    
```
