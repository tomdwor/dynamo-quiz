# TODO

## Current

- [ ] mobile UX fixes
  - [x] Quiz review: Show answers - loader
  - [x] Text answer: if mobile on blur scroll page down to the bottom
- [ ] proper data in example quizzes
- [ ] language labels in separate files + language config


## Step 1: Basic app

Basic version of application.

- [x] setup Vue/Vuetify app
- [x] common template and vue components
- [x] quiz template
- [x] quiz list template
- [x] configuration
- [x] quiz list - basic version
- [x] quiz - basic version (only single answer)
- [x] real content in quiz examples


## Step 2: Markdown and AsciiMath

Allow using Markdown and AsciiMath content.

- [x] quiz description
- [x] question
- [x] answer option
- [x] note


## Step 3: Answer types

Another answer types:

- [x] text
- [x] multi


## Step 4: Quiz review

Once a quiz is completed, display quiz review.

- [x] list of questions with statuses (correct/incorrect)
- [x] show correct answer
- [x] show user answer
- [x] filter: all / correct / incorrect
- [x] show explanation (if defined)
- [x] "Scroll to top" button


## Step 5: Story option

- [ ] Story option in quiz config
    - [ ] constant questions order
    - [ ] content pages allowed (between quiz questions)


## Step 6: Quiz modes

- [ ] User at start of the quiz can choose mode
    
    Modes:
    - practice mode - checking answers during quiz (current behavior)
    - exam mode - without checking answers during quiz

    Exam mode is not allowed if story option is enabled.



## Step 7: App adjustment

Any additional details, fixes, adjustments.

- [x] random order of answers
- [x] text input autofocus
- [x] keyboard controls
- [x] embedding optional images (in: description, question, answer option, note)
- [x] separate data and config from repo + examples + README
- [ ] multi languages (one file with labels per language)
- [ ] run random quiz
- [ ] about page content
- [ ] other question types
    - [ ] text-two-ways
    - [ ] display-confirm
- [ ] valid quiz config - check if quiz JSON is correct


## Step 8: App configurations

- [ ] configurations
    - [ ] single quiz
    - [ ] list of quizzes
    - [ ] quiz base (multiple lists of quizzes)
- [ ] tutorial / example files with config


## Step 9: Quiz list filters

- [ ] filter quizzes
- [ ] play random quizzes from filtered list (one after another)


## Other

- [ ] Dynamo Quiz Editor (another Vue.js project)
    - [ ] Create new quiz
    - [ ] Import JSON and edit quiz
    - [ ] Export quiz as a JSON file
