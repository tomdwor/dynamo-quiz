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
        - [ ] mark correct / incorrect answers
        - [ ] display review after last answered question
        - [ ] quiz header (quiz title, category, current question info, etc.)


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


## Step 4: Quiz summary

Once a quiz is completed, display quiz summary.

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

- [ ] multi languages (one file with labels per language)
- [ ] limit of questions (e.g. show 20 random questions of all 65)
- [ ] quizzes list with folders
- [ ] start random quiz (from current folder)
- [ ] answer explanation
- [ ] keyboard controls


## Other

- [ ] Dynamo Quiz Editor (another Vue.js project)
    - [ ] Create new quiz
    - [ ] Import JSON and edit quiz
    - [ ] Export quiz as a JSON file
