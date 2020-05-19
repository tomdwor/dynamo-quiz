# TODO

## Current

- [ ] refactor
    - [x] return only currentQuestion from handler - not each property separately
        - [x] getType()
        - [x] getQuestion()
        - [x] getAnswers()
        - [x] getCorrectTextAnswer()
        - [x] getQuestionNote()
    - [x] one method with textAnswerCheckResult = correct|incorrect|identical
    - [x] return only quizStatistics from handler - not each value separately
        - [x] getQuestionsNumber()
        - [x] getAnswersNumber()
        - [x] getCurrentQuestionNumber()
        - [x] getCorrectAnswersNumber()
        - [x] getQuestionsNumberInfo()
    - [ ] update names
        - [x] answers -> options
        - [ ] selectedSingleAnswer -> userSingleChoice
        - [ ] typedTextAnswer -> userTextAnswer
        - [ ] (not made yet) -> userMultiChoice
- [ ] (DUPLICATE) random order of answers (hint: use checksums for answers)
- [ ] (DUPLICATE) multi choice answer
- [ ] (DUPLICATE) text input autofocus
- [ ] (DUPLICATE) proper quiz content with math formulas


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


## Step 2: MathJax content

Allow using MathJax content.

- [x] quiz description
- [x] question
- [x] answer option
- [x] note
- [ ] proper quiz content with math formulas


## Step 3: Answer types

Another answer types:

- [x] text
- [ ] multi


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

- [ ] random order of answers (hint: use checksums for answers)
- [ ] embedding optional images (in: description, question, answer option, note)
- [ ] keyboard controls
- [ ] text input autofocus
- [ ] Markdown content with MathJax
- [ ] separate data and config from repo + examples + README
- [ ] multi languages (one file with labels per language)
- [ ] run random quiz
- [ ] about page content


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
