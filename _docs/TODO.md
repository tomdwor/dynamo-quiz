# TODO


## Step 1: Basic app

Basic version of application.

- [x] setup Vue/Vuetify app
- [x] common template and vue components
- [x] quiz template
- [x] quiz list template
- [x] configuration
- [x] quiz list - basic version
- [ ] quiz - basic version (only single answer)
    - [x] prepare Vuex store
    - [x] get data from JSON files using Axios
    - [ ] working quiz
        - [x] init store values at quiz start
        - [x] quiz content components
        - [x] display start content component at quiz start
        - [x] display question content component after start
        - [x] go through the questions
        - [x] mark correct / incorrect answers
        - [x] quiz header (quiz title, category, current question info, etc.)
        - [ ] display simple review after last answered question
        - [ ] answer explanation (if "check" state)
- [ ] real content in quiz examples


## Step 2: Markdown/MathJax

Allow using Markdown and MathJax content.

- [ ] quiz description
- [ ] questions
- [ ] and answer options


## Step 3: Answer types

Another answer types:

- [ ] multiple
- [ ] text
- [ ] text-LaTeX


## Step 4: Quiz review

Once a quiz is completed, display quiz review.

- [ ] list of questions with statuses (correct/incorrect)
- [ ] show correct answer
- [ ] show user answer
- [ ] filter: all / correct / incorrect
- [ ] show explanation (if defined)
- [ ] "Scroll to top" button


## Step 5: Quiz modes

- [ ] practice mode
- [ ] exam mode


## Step 6: App adjustment

Any additional details, fixes, adjustments.

- [ ] random order of answers
- [ ] multi languages (one file with labels per language)
- [ ] run random quiz
- [ ] keyboard controls


## Step 7: Quiz configurations

- [ ] configurations
    - [ ] single quiz
    - [ ] list of quizzes
    - [ ] quiz base (multiple lists of quizzes)
- [ ] tutorial / example files with config


## Other

- [ ] Dynamo Quiz Editor (another Vue.js project)
    - [ ] Create new quiz
    - [ ] Import JSON and edit quiz
    - [ ] Export quiz as a JSON file
