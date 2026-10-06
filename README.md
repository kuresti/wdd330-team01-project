# Sleep Outside
Sleep Outside is a team-developed e-commerce web application for browsing and purchasing outdoor prodcuts. The application was built as an academic team project for the ByU-Idaho WDD 330 Web Frontend Development course.

The project demonstrates modern JavaScript development, modular application architecture, REST API integration, shopping-cart management, checkout processing, responsive user-interface development, and collaborative Git/GitHub workflows.

## Features

## Product Browsing
- Browse outdoor products by category.
- Display product information retrieved from an external data source.
- View detailed information for individual products.
- Use URL parameters to dynamically identify and load selected products.

## Shopping Cart
- Add products to a shopping cart.
- Remove products from the cart.
- Increase or decrease product quantities.
- Dynamically calculate cart totals.
- Persist cart information using browser localStorage.
- Update cart information as quantities and products change.
- Provide visual feedback when products are added to the cart.

## Checkout
- Navigate from the shopping cart to a checkout workflow.
- Collect customer and order information.
- Validate checkout information.
- Calculate order-related totals.
- Package shopping-cart data for order submission.
- Submit order information through the application's checkout service.
- Redirect customers to a confirmation/thank-you experience following checkout.

## Forms & User Interaction
- Client-side form validation.
- Newsletter signup functionality.
- Giveaway/registration functionality.
- Custom application alerts and feedback messages.
- Interactive cart controls and animations.

## Application & Deployment
- Modular JavaScript architecture using ES modules.
- Development and production builds using Vite.
- Code quality and formatting using ESLint and Prettier.
- Production deployment and configuration troubleshooting.
- Resolution of URL, routing, image, and browser mixed-content issues.

## Technologies
- JavaScript / ES6+
- HTML5
- CSS3
- REST APis
- JSON
- Browser Local Storage
- Vite
- Prettier
- Git
- GitHub

## Application Architecture
The application uses modular JavaScript to separate user-interface logic, application functionality, data access, shopping-cart behavior, and checkout processing.

Major areas of the application include:
- Product listing and product-detail functionality
- External data/service interaction
- Shopping-cart management
- Checkout processing
- Shared utility functions
- Dynamic DOM rendering
- Local storage management
- Form validation and user feedback

This separation allowed the team to develop individual features on separate Git branches and integrate them into the shared application.

## Team Contributions

Sleep Outside was developed collaboratively by a three-person development team located on three different continents. Team members implemented features using individual Git branches and integrated completed work through pull requests and merges.

Because features evolved throughout development, some areas of the application include work from multiple team members. The summaries below describe each developer's primary areas of contribution rather than implying exclusive ownership of every final feature.

## Kimberly Uresti -- kuresti

Kimberly focused primarily on shopping-cart functionality, checkout development, application navigation, deployment troubleshooting, and feature integration.

## Key contributions:
- Developed shopping-cart functionality including dynamic cart totals and quantity controls.
- Implemented increment and decrement controls and associated JavaScript event handling for product quantities.
- Updated cart calculations so totals responded correctly as cart contents changed.
- Added checkout navigation and developed major portions of the checkout workflow and interface.
- Worked with URLSearchParams and reusable parameter-handling functionality to support dynamic application navigation.
- Resolved cart image, product image, link, and layout issues.
- Added cart-icon animation and related user-interface enhancements.
- Troubleshot Vite/ECMAScript build configuraton and production deployment issues.
- Diagnosed and corrected an HTTP/HTTPS mixed-content issue affecting the deployed application.
- Participated in Git/GitHub integration through feature branches, pull requests, merges, and code integration.
- Updated project documentation to better represent the completed applicaiton.

## Technologies demonstrated: 
JavaScript, HTML, CSS, DOM manipulation, event handling, URLSearchParams, Vite, Git/GitHub, debugging, deployment troubleshooting, and e-commerce application logic.

## Lisa Mandarin

Lisa focused primarily on application alerts, form processing and validation, shopping-cart persistence, request functionality, and user-interface behavior.

## Key contributions:
- Developed and refined custom application alert functionality used across multiple pages.
- Implemented alerts for product and cart interactions, including duplicate-item handling.
- Added and refined product-quantity behavior within the shopping cart.
- Synchronized cart quantity values with localStorage to persist changes.
- Implemented and corrected increment/decrement quantity persistence.
- Worked on form creation, formatting, and client-side validation.
- Developed functionality for sending form/request data and handling successful requests.
- Refactored checkout-related JavaScript and data-conversion functionality.
- Modified Vite configuration and application links to support application functionality.
- Improved styling and interactive behavior for application alerts.
- Corrected cart image-display and other user-interface issues.
- Performed linting, formatting, branch synchronization, and code cleanup.

## Technologies demonstrated:
JavaScript, HTML, CSS, DOM manipulation, event handling, form validation, localStorage, JSON/data processing, Vite, Git/GitHub, debugging, and application state management.

## Cabryn Bray

Cabryn focused primarily on shopping-cart management, newsletter and giveaway functionality, application configuration, user-interface features, and feature integration.

## Key contributions:
- Developed shopping-cart remove-item functionality.
- Built newsletter banner and newsletter signup functionality.
- Developed registration giveaway-entry functionality.
- Added and refined the post-checkout thank-you page.
- Worked on application links and Vite configuration required to support application pages and features.
- Corrected application configuration and integration issues.
- Participated in weekly team feature development and integration.
- Performed linting and formatting to maintain project code quality.
- Worked with Git branches, pull requests, merges, and synchronization with the team's main development branch.

## Technologies demonstrated:
JavaScript, HTML, CSS, shopping-cart functionality, forms, user-interface development, Vite, Git/GitHub, debugging, and collaborative development.

## Collaborative Development Workflow

The team used Git and GitHub throughout development to coordinate changes and integrate features.

The workflow included:

- Individual feature branches
- Pull requests
- Code integration and merging
- Branch synchronization
- Collaborative troubleshooting
- ESLint for code-quality checks
- Prettier for consistent formatting
- Vite development and production builds
- Testing and debugging in local and depoloyed environments

This workflow provided practical experience developing withing a shared codebase where changes from multiple developers had to work together in the final application.

## Running the Project Locally  

### Prerequisites

Install a current version of Node.js and npm.

### Installation

Clone the respository:

```bash
git clone http://github.com/kuresti/wdd330-team01-project.git
```

Navigate to the project directory:

```bash
cd wdd33-=team01-project
```

Install project dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run start
```

## Building for Production

Create a production build using:

```bash
npm run build
```

## Setup

- `npm install`
- `npm run start` starts up a local server and updates on any JS or CSS/SCSS changes.

## Other commands

- `npm run build` to build final files when you are ready to turn in.
- `npm run lint` to run ESLint against your code to find errors.
- `npm run format` to run Prettier to automatically format your code.

## Randomized URL from netlify
- https://main--mellifluous-pudding-2377fa.netlify.app/
