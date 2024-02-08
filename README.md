# Josef coding challenge

Hello 👋 & welcome to the Josef coding challenge. We appreciate you taking the time to complete the assignment, and we're excited about the prospect of you joining the team!

The goal of this assignment is to get a sense of how you think and solve problems. If you're having build issues 🔧 with the project, please don't hesitate to contact us.

The challenge is to build upon a simple Vue.js application.

You may want to install [Vue Dev Tools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en) to enrich your Vue dev experience.

## How it works

- Fork this repo into your account
- Make a new branch
- When you are finished, make a PR on your fork, and invite the person specified in the email to your fork
- We will take a look at your solution, and we might ask you several questions after

## Coding task

### Frontend

In `src/views/Layout.vue`, you'll find a component loading data from an API.

1. Render the list of files from the API.

2. Create a reusable component to render the items, using a combination of [props](https://vuejs.org/v2/api/#props) and [slots](https://vuejs.org/v2/api/#v-slot).

3. The design / UI is open for you to decide 🎨. Try to use some of the scss variables in `src/styles/resources/_variables.scss` to give it a Josef feel.

4. Create a [computed property](https://vuejs.org/v2/guide/computed.html) that takes the file's data and filters it for tags that include `kitten` then sorts it by date.

### Backend

In `src/views/Rules.vue` you'll find a Vue.js view with detailed instructions about the problem.

1. Modify the `checkGroup` function in the file so it returns `true` if all rules and groups apply, otherwise `false`.

2. Try your best to implement the task in an efficient and elegant way.

#### Extra credit

1. The data is currently being managed locally in `src/views/Layout.vue` and `src/views/Rules.vue`, migrate it to a [vuex module](https://vuex.vuejs.org/guide/modules.html) in `src/store`. _See example in `src/store/user`._
2. Write some unit tests for your challenge in `/tests/unit`.

### QA

In `src/views/QA.vue` you'll find a Vue.js view that we want you to test 🧐.

1. **API testing:** Using [Postman](https://www.postman.com/)(or a tool of your preference), test functionality of the REST API for the `entity` object. Validate listing, creating, editing and deleting objects.
Additionally, test a uniqueness requirement for `entity.id` property. Objects can be accessed and modified using requests:

```
  GET    http://localhost:3000/entities
  GET    http://localhost:3000/entities/[id]
  POST   http://localhost:3000/entities
  PUT    http://localhost:3000/entities/[id]
  DELETE http://localhost:3000/entities/[id]
```

2. **e2e frontend testing:** Using [Cypress](https://www.cypress.io/)(or a tool of your preference) test form submission on the QA page.
3. **Extra credit:** Using [Lighthouse](https://developers.google.com/web/tools/lighthouse) run an audit of the QA page and document your performance and accessibility findings.

When done, save required files in the `tests/` folder and add instructions to the `README.md` 📝.
 - Be sure and include as much information as you can about how you are testing and what future tools improvements you might add going forward.

## Getting the project running

```bash

# Fork this project, then clone your fork
git clone https://github.com/...

cd dev-test.joseflegal.com

# Install dependencies
nvm install
npm install

# Start development server
npm run dev

# Visit http://localhost:9001
```

## Scripts

| Script              | Description                                                                     |
| ------------------- | ------------------------------------------------------------------------------- |
| `npm run dev`       | Starts json server on 3000 and Compiles and hot-reloads for development on 9001 |
| `npm run test:unit` | Run your unit tests                                                             |
| `npm run test:e2e`  | Run your end-to-end tests                                                       |
| `npm run lint`      | Lints and fixes files                                                           |
| `npm run build`     | Compiles and minifies for production                                            |

## Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).


## Submission Notes

### 1. Project Overview:
Josef Coding Challenge as attempted by Dylan Pee, timeboxed to 7 1/2 days, starting from Thursday 1/2/2024 to midday Wednesday 8/2/2024.

### 2. Approach:
The overarching theme of the approach was understand the problem, identify key requirements and then breaking them down to smaller steps prior to tackling them.

When writing code, both simplicity and readability were prioritized in order to ensure long term maintainability amd understandability.

Throughout the challenge itself, I aimed to strike a balance between efficiency and elegance, with the goal of having clear cut solutions.

Ticket creation in Trello (link below) and note-taking (PDF provided) were also crucial steps taken in order to help progress this challenge.

Special Mention: I also used Gitmojis in my git commit messages, I outlined a legend below for ease of reference (link also provided in the Extra Links section for the full table).
- ✨: New Feature
- 🔥: Removed Code
- 🔨: Refactor Code
- 🚧: Work In Progress
- 💥: Breaking Changes
- 🐛: Bugfix
- ✅: Added Tests
- ✔️: Tests Passed
- 🎨: Improved Format/Structure
- 👕: Linter
- 📚: Documentation

### 3. Assumptions:
1. Performance Expectations:

Assumed that the challenge desired for an efficient solution, and so the aim for me was to write code that prioritized completeness of a solution over completing as much as the challenge as possible.

2. Additional Features:

Assumed that the core functionality should take precedence over everything else, since having an app without its core functionality is to have no app at all. Building on what was mentioned in point 1, focus was on delivering a complete solution, even if it meant unable to attempt certain aspects of the challenge.

3. Input Validation:

Assumed that inputs are valid (eg. Front End files inputs and Back End answers inputs) and within the expected constraints unless specified otherwise. Given enough time, would have liked to implement type checking as well to make sure that valid input types are passed by the user to the app.

4. Open to Change:

Assumed that what I know may not be the best solution or even if it is, it may well change in future. Maintaining an open mindset and focus on leaving room for future improvement. This is especially true, since an extra challenge that I had to tackle was to learn a new framework within the limited time, and therefore the solution is far from perfect.

### 4. Technologies Used:
- JavaScript
- Vue.js
- SCSS
- Jest
- Trello
- Obsidian

### 5. Setup Instructions:
No extra setup steps required. Please refer to [Getting the project running](https://github.com/Aigito/dev-test.joseflegal.com/tree/dylan-attempt?tab=readme-ov-file#getting-the-project-running) section for setup instructions.

### 6. Functionality:
Throughout this project, the following functionality have been implemented:

#### Front End
1. Render list of files from based on API response given.
2. Filter button that will filter files with `kitten` tag and sort by date created.

#### Back End
1. Finished implementing the `checkGroup()` method.
2. Implemented unit tests under `tests/unit/views/Rules.spec.js` that make sure rule / rule group checker works.

#### QA
1. API Testing
- Able to test functionaity of REST API for the `entity` object. Please see Postman Workspace via link below.
- [Postman link](https://www.postman.com/payload-cosmonaut-53927522/workspace/josef-coding-challenge/collection/32601695-d202e5e8-6a54-4a25-8b6d-b5f6b4ea7836?action=share&creator=32601695)

2. Cypress e2e (not attempted)

3. Lighthouse QA (not attempted)

### 7. Testing:
Testing was performed using the Jest framework, and tested two methods specifically `checkGroup()` and `checkRule()`

#### checkGroup()
1. **Test case 1**: Test that `true` result is returned as expected when given the correct combination of answers as set out in the criteria above
- Note: Test Case 1 also tests and make sure that Question B is skipped whenever the answer to Question A is `true`

2. **Test case 2**: Test that `false` result is returned as expected when given a specific combination of answers as set out in the criteria above

#### checkRule()
1. **Test case 1**: Test that `true` result is returned when the correct answers are provided based on each rule criterion as set out above
2. **Test case 2**: Test that `false` result is returned when the incorrect answers are provided based on each rule criterion as set out above

### 8. Challenges Faced:
Throughout the challenge I ran into a number of challenges, some bigger than others. I will briefly outline them below:
1. Vue:
- The first biggest hurdle was that this project is a Vue app, and having very litte experience with frontend frameworks, found myself quickly roadblocked and unable to progress with the challenge until I have learnt more.
- Hence, the first day and a half was mostly spent researching and learning the Vue.js framework and how it worked, the problems it solved, the syntax, the various API Options, etc.
- Luckily, the resources that I used were easy to follow and soon found myself able to progress forward with the challenges.

2. JavaScript:
- The second hurdle was writting JavaScript, with most of my experience being in Ruby on Rails, the challenge became slightly more difficult as I had to navigate around the syntactical differences between the two.
- Again, with the help of documentation and research, I was able to get around most of it and progressed the challenges smoothly.

3. Jest:
- Yet another framework that I have not dealt with previously. I am familiar with RSpec and so testing in general is not the issue, more so getting to know syntactical differences and figuring out how to get things that I know work in RSpec to work in Jest.

### 9. Possible Improvements:
1. The Front End card components could have been a much better job. Even though the functionalities work, the styling leaves much to be desired.
2. The Back End rule engine works as expected though would have liked to be able to refactor it more to reduce the lines of code, particularly the `collectRuleIds()` and `checkGroup()` methods. Understand that the notes said the `checkGroup()` to be ~10 - 15 lines of code, I went to for what I perceived to be a more complete solution rather than trying to adhere to the 10 - 15 lines of code rule.

### 10. Conclusion:
The coding challenge was challenging but very rewarding. I was able to pick up and learn a lot of new things thanks to this challenge that will no doubt propel me even further on my journey to become a better developer.

It was definitely a shame that I was not able to attempt all of the challenges components but I am glad that I was able to achieve all that I could in the time that
was given to me.

There are definitely more things for me to learn and this challenge has done me the favor of showing me the knowledge gaps that I need to fill.

### 11. Additional Notes:
Initially, I was only supposed to have 1 week to finish the challenge. However, I was granted an extra half-day extension due to personal circumstances. I'd like to take the opportunity to thank Marc Lee for his generosity.

### 12. Extra Links:
- [Trello link](https://trello.com/b/0pDCNtRC/josef-coding-challenge)
- [Postman link](https://www.postman.com/payload-cosmonaut-53927522/workspace/josef-coding-challenge/collection/32601695-d202e5e8-6a54-4a25-8b6d-b5f6b4ea7836?action=share&creator=32601695)
- [Gitmoji Legend Table](https://gist.github.com/parmentf/035de27d6ed1dce0b36a)
- [LinkedIn](https://www.linkedin.com/in/dylanpee/)
