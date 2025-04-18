# Postman Clone

## Documentation

<details><summary>About developers and Teamwork:</summary>

## 💁 Team Member Contributions
 
   - **Tatsiana Verkhova**  / [lionna](https://github.com/lionna)
       - Responsible for solving technical issues, ensuring that complex problems were addressed promptly and effectively.
  
   - **David Gogua** / [crociatofaf](https://github.com/crociatofaf)
       - Focused on fostering a positive team atmosphere, designing the application, and leading the testing efforts to ensure quality and usability.
  
   - **Elina Melkonian**  / [von-wrigley](https://github.com/von-wrigley)
       - Managed the interaction between various system components and handled state management using Redux.

## 📒 Team Working Process

1. **Task Management**  
We tracked tasks, assigned priorities, delegated team members, and estimated timelines using a shared Google Sheets document.

2. **Discussions**  
Quick communication and all discussions took place in the Discord channel.

3. **Meetings**  
Regular Google Meet sessions were scheduled every few days to review progress, resolve challenges, and plan future tasks.

4. **Code Collaboration**  
All code changes were submitted via GitHub pull requests, followed by detailed reviews to ensure quality and maintain consistency in the project.

</details>

<details><summary>Postman Clone</summary>

# Postman Clone

This project is a group final assignment for the React 2025 course at app.rs.school.

## ✨ Project Overview

Postman is a comprehensive API development ecosystem that empowers users to consume, design, test, and manage APIs efficiently. More than just a testing tool, it provides end-to-end solutions for the entire API lifecycle.

- The platform provides tools to  construct and dispatch API requests
- Generate client code in 30+ languages (Python, JavaScript, cURL, etc.).
- Dynamic values stored as environment variables (e.g., {{base_url}}) can be reused throughout requests
- Auto-saves recent requests (filterable by date/method).
- Re-run past calls with one click.

## ✨ Technical Specifications

 1. Frontend Framework: React 19 and NextJS
 2. Design: SASS
 3. Multilingual Support: User interface available in Russian, English, Georgian, German and Polish. 
 4. Responsive Design: Optimized for various device sizes

## ✨ Technical Details

- Libraries and Frameworks
   In addition to React, the following libraries and frameworks were used:
   - Next: Make calls to the endpoint through the server.
   - Redux: For state management, ensuring a predictable and consistent state throughout the application.
   - HTTP Snippet: Snippet generator for languages (cURL, Javascript, Node, Java, Python, C#, Go)
   - Internationalization for Next.js: Offer content in multiple languages(Russian, English, Georgian, German and Polish)

- State Management
  The application uses Redux for managing the global state, making use of reducers, actions, and selectors to handle complex state transitions in a predictable manner.

- Testing Methods
The application was tested using both manual testing and automated tests:
   - Manual Testing: Conducted by the team to verify the user interface, interactions, and overall functionality of the application.
   - Automated Tests: Created using Jest to ensure the correct functionality of individual components and services. These tests cover unit testing for functions, components, and services to verify their behavior under different scenarios.

## ✨ Description of function blocks

### 💻 Main page
- **For unauthorized users**, the page includes a link to the authentication page (`Sign In / Sign Up`).  
- **For authorized users**, the page provides navigation to the **RESTful client** and **History** routes.  

### 🔐 Sign In / Sign Up
- **After Successful Login**: The user is automatically redirected to the **Main page**.    
- **Already Logged In**: Any attempts to access auth routes (`/login`, `/signup`) the user is redirected to the **Main page**.

### 🌐 RESTful client
- Provides an easy way to construct and make different requests
- Produces ready-to-use code snippets for requests 
- Displays the HTTP response code and its associated status message.

### 📓 Variables
- Supports variable substitution in URLs, bodies, and headers.

### 📜 History
- Section restores complete request configurations for reuse, including HTTP method, URL, body content and header values.
- The History section displays requests in chronological order based on execution time.

## ✨ Core Tools

+ [httpsnippet](https://github.com/readmeio/httpsnippet)
   - A tool that automatically creates ready-to-use code snippets for making HTTP calls in various programming languages

+ [reduxjs/toolkit](https://redux-toolkit.js.org/)
   - Redux Toolkit is the package for efficient Redux development. It simplifies Redux setup, reduces boilerplate, and provides utilities to streamline state management

+ [next](https://nextjs.org/)
   - Next.js is a framework built on top of React that makes it easier to create fast, modern websites and apps, extending its capabilities by adding server-side rendering (SSR) and static site generation (SSG) support.

+ [next-intl](https://next-intl.dev/)
   - Next-intl is a library for internationalization (i18n) in Next.js apps. It simplifies translating your app into multiple languages by providing: type-safe translations, SSR/SSG support, automatic route localization.

+ [react-redux](https://redux.js.org/)
   - Redux is a state management librar. It helps manage global application state in a centralized store, making state changes transparent and controllable. 

+ [sass](https://sass-lang.com/)
   - Runs configured linters and code formatters only on Git-staged files (i.e., files you’ve modified and are about to commit). 

+ [supabase](https://supabase.com/)
   - Supabase was implemented as the authentication solution, providing secure user management with email/password login, social OAuth providers, and JWT-based session handling.


## ✨ Development Tools

+ [eslint](https://eslint.org/docs/latest/use/configure/), [eslint-config-next](https://nextjs.org/docs/app/api-reference/config/eslint), [eslint-config-prettier](https://prettier.io/docs/integrating-with-linters)
   - A set of tools for linting and sorting imports, as well as checking code for compliance with standards and formatting.
 
+ [testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) 
   - React Testing Library is a minimalistic yet powerful tool for testing React components. Built as a thin layer over react-dom and react-dom/test-utils, it delivers essential utilities designed to promote effective testing methodologies. 
 
+ [testing-library/user-event](https://www.npmjs.com/package/@testing-library/user-event)
   - Simulate the real events that would happen in the browser as the user interacts with it

+ [types/node](https://nodejs.org/en), [types/react](https://react.dev/), [types/react-dom](https://react.dev/)
   - These packages contain type definitions for node, react and react-dom.

+ [lint-staged](https://github.com/lint-staged/lint-staged)
   - Runs configured linters and code formatters only on Git-staged files (i.e., files you’ve modified and are about to commit). 

+ [types/jest](https://www.npmjs.com/package/@types/jest)
    - TypeScript type definitions for the Jest testing framework. Provides type support when writing Jest tests in TypeScript projects.
 
+ [jest](https://jestjs.io/ru/), [jest-environment-jsdom](https://jestjs.io/ru/), [testing-library/jest-dom](https://jestjs.io/ru/)
    - Simplifies and enhances JavaScript testing with powerful features that make writing, running, and maintaining tests easier.
 
+ [ts-jest](https://www.npmjs.com/package/@types/jest)
    - A transformer for Jest that includes source map support, allowing TypeScript code to be tested."

+ [husky](https://typicode.github.io/husky/)
    - Automatically validate commit messages, analyze code quality, and execute test suites during commit/push operations.

+ [typescript](https://www.typescriptlang.org/)
    - A JavaScript superset that introduces static type checking and enhanced tooling for professional development. Strengthens codebase stability through rigorous type validation.
    
+ [prettier](https://prettier.io/)
    - Prettier is an opinionated code formatter that automatically standardizes your code style for consistent readability.
  
## ✨ Conclusion

  - Key Takeaways and Skills Acquired

    Working together on this project was a highly rewarding experience that brought out the best in our team's collaboration and technical abilities. Through building the application with React, Next.js and Redux, we gained valuable hands-on experience with modern frontend development while learning to work together effectively. Our use of GitHub for version control and Discord for daily communication created an efficient workflow that allowed us to share knowledge and solve problems quickly. The project helped us grow in multiple ways - from mastering complex technical concepts like server-side rendering and state management to developing softer skills like giving constructive feedback and explaining technical decisions. We learned how to integrate different components smoothly, debug challenging issues together, and maintain good code quality standards.

  - Questions and Answers
      We encourage any questions or feedback on the project! Please feel free to open an issue or reach out to any team member through GitHub.
</details>
