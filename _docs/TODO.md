# TODO


## Step 1: Basic app

Basic version of application.

- [x] setup Vue/Vuetify app
- [x] common template and vue components
- [x] quiz template
- [x] quiz list template
- [x] configuration
    - [x] quizzes-list-data-url
    - [x] quiz-data-url-prefix
- [ ] quiz - basic version (only single answer)
    - [ ] prepare Vuex store
    - [ ] axios: get quiz data from JSON file, use loader
    - [ ] working quiz
- [ ] quiz list - basic version


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
