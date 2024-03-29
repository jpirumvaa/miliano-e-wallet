# Welcome

Welcome to to Milian eWallet. It contains two parts. The first part explains the steps to take to run this project, and the second part contains general steps that have to be taken to complete a software product

# Part I: The Project

## How to run the project

### Hosted Version

To run the hosted version of the project, use the following documentation: `https://documenter.getpostman.com/view/12401788/2sA35G3MtT`

### Local Version

To run the project follow the following steps

1. Clone the project: `git clone https://github.com/jpirumvaa/miliano-e-wallet.git`
2. Checkout the develop branch `git checkout develop`
3. Setup all environment variables specified in `.env.example`
4. Install all dependencies `npm i` or `yarn`
5. Run `npm run migrate` to run all migrations.
6. Run `npm run seed` to run all seeders
7. Run `npm run test` to test the application
8. Run `npm run dev` to run development server

After everything is setup, you can follow instructions in this documentation to test the API: `https://documenter.getpostman.com/view/12401788/2sA35G3MtT`

You can run `npm run undo:migrations` command to undo all migrations

# Part II: Steps for building a software product

This section contains general steps that I can take to get a product to production from day 1.

## Step 1: Initial Planning and Requirements Gathering

This is the major step whose purpose is to understand the requirements of the product. User stories and usecase analysis should be conducted to understand the persona and how the system will fulfil their needs. Here are a few of the activities that can be included in this step:

- Conduct stakeholder meetings with the tech team, product owner, Scrum Master, and business team to understand current pain points and gather requirements.
- Define clear objectives and goals for the new back-end solution.
- Create a project timeline with milestones, deliverables, and deadlines.
- Identify key features and prioritize them based on business value and technical complexity.
- Analyze existing infrastructure and technology stack to determine areas for improvement.
- Research and select appropriate technologies and frameworks for the new back-end stack.
- Establish communication channels and protocols within the tech team and with other departments.
- Set up a version control system (e.g., Git) and project management tools (e.g., Jira) for collaboration and tracking progress.

## Step 2: Architecture and Design

This is the step that involves the archtecture of the system. The usecases can be developed further with usecase diagrams, sequence diagrams, class diagrams, etc. In this class Object Oriented Analysis and Design should be carried out. Archtecture Haiku can be developed to simplify the general archtecture of the system. The Unified Model Language(UML) can be very helpful in this process. Here are a few activities that can be included in this this step:

- Design the overall architecture of the new back-end solution, considering scalability, performance, and maintainability.
- Define data models for customers, wallets, and transactions, ensuring normalization and efficiency.
- Choose an appropriate database management system (e.g., PostgreSQL) and design the database schema.
- Implement RESTful API endpoints for customer registration, wallet management, and transaction handling.
- Design API contracts and documentation using tools like Swagger/OpenAPI to ensure clarity and ease of integration.
- Plan for authentication and authorization mechanisms to secure the APIs and protect sensitive customer data.
- Create mockups or prototypes of API responses to share with the front-end team for early feedback.

## Step 3: Development and Testing

This is a step that involves the actual development of the API and testing them. Here are a few activites that can be carried out:

- Development of the back-end solution using chosen frameworks (e.g., NestJS or Spring Boot). In my case, I chose NodeJS and Express.
- Follow coding standards and best practices for modularity, readability, and maintainability.
- Write unit tests for critical components to ensure code quality and prevent regressions.
- Implement logging and monitoring solutions to track system performance and detect errors.
- Conduct code reviews and pair programming sessions to foster collaboration and knowledge sharing within the team.
- Perform integration tests to verify the interaction between different modules and components.
- Continuously deploy and test the application in a staging environment to identify and fix issues early.

## Step 4: Optimization and Performance Tuning

This step involves optimizing the system to server 1M+ users, ensuring that everything is ready to fulfill users' needs. Here are a few activities that can be carried out:

- Optimize database queries and indexing strategies to improve query performance.
- Implement caching mechanisms (e.g., Redis) to reduce latency and enhance scalability.
- Fine-tune server configurations and resource allocation to handle high traffic loads.
- Monitor system metrics and analyze bottlenecks to identify areas for further optimization.
- Conduct load testing and performance profiling to simulate real-world scenarios and validate system scalability.
- Benchmark the application against performance goals and make necessary adjustments.

## Step 5: Deployment and Pilot Testing

After a long time of development. A system should be tested to ensure that every remaining bug is fixed. Usability testing, stress testing, user acceptance testing, and other possible ways of testing should be put in place. Here are a few of the activities that can be carried out.

- Prepare for deployment to the production environment by configuring servers, setting up monitoring tools, and ensuring high availability.
- Deploy the back-end solution to a limited number of users for pilot testing and feedback collection.
- Monitor system stability and performance during the pilot phase, addressing any issues or bugs that arise.
- Gather feedback from users, stakeholders, and the QA team to identify areas for improvement.
- Iterate on the design and implementation based on feedback, making necessary adjustments and enhancements.
- Prepare documentation and training materials for operational support and future development.

## Step 6: Go-live: Full Deployment and Support

At the end, the system will go live, and people will start using it. However, necessary maintainance activities have to be carried out to ensure that the system stays relevant and useful. Here are a few of the activities that can be done in this step.

- Roll out the new back-end solution to all users and regions, following a phased approach to minimize disruption.
- Monitor system performance and user feedback closely during the initial rollout phase, providing immediate support for any issues.
- Conduct post-deployment reviews and retrospectives to evaluate the project's success and identify lessons learned.
- Establish ongoing maintenance and support processes to ensure the long-term stability and scalability of the system.
- Continuously monitor and optimize the back-end solution based on user feedback, changing business requirements, and emerging technologies.
