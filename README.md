# LP dashboard

## Objective
Create a web application that helps manage stores panel codes, camera data, R&M requests
## Features

- **User Registration and Authentication:**
  - Allow users to create accounts and log in with secure authentication. Use login in with Microsoft

- **Add panel code:**
  - Users can add, update, and delete panel codes for ZM, DSM, SM, ASM

- **R&M:**
  - Users can R&M request, tracks the life cycle (requested, ready, approved, shipped)
  - automatically group fedex tracking to stores

- **Camera info:**
  - add camera system details

- **Panel:**
  - add a new panel to a store, and track panel type (old, current, offsite, ...) 

- **Data Export:**
  - Allow users to export their data in CSV to get current spreadsheet layout.

## Technologies

- **Backend:**
  - **Framework:** Spring Boot (Java)
  - **Persistence:** MySQL db
  - **Security:** login in with Microsoft

- **Frontend:**
  - **Framework/Library:** React for dynamic and interactive user interfaces.
  - **State Management:** Use React state or context for managing application state.
  - **Routing:** Implement client-side routing using libraries like React Router.
  - **HTTP Requests:** Use Axios for handling HTTP requests to interact with the backend.

- **Reporting and Charts:**
  - **Libraries:** Use JavaScript libraries for charts and reports, such as Chart.js or D3.js.

- **Data Export:**
  - **Export Format:** Apache POI or OpenCSV for generating CSV files.

- **Automation:**
  - **panel code:** have cops automated to be synced and smarttech panel codes match too
  

## Architecture

- **Backend (Spring Boot):**
  - **Controllers:** Handle HTTP requests and responses.
  - **Services:** Business logic for transactions, categories, budgeting, etc.
  - **Repositories:** Data access using Spring Boot’s built-in database.
  - **Security Configuration:** Setup for user authentication and authorization.

- **Frontend (React):**
  - **Components:** Develop reusable UI components for managing transactions, viewing reports, and setting budgets.
  - **State Management:** Manage application state using React's state or context API.
  - **Routing:** Implement client-side routing for navigating between different views.
  - **Forms:** Create forms for user input to add transactions and set budgets.
  - **HTTP Requests with Axios:**
    - **Setup Axios:** Install and configure Axios for making HTTP requests.
    - **Making Requests:** Use Axios to send GET, POST, PUT, and DELETE requests to the backend.
    - **Handling Responses:** Process and handle responses from the backend, including success and error cases.
    - **Error Handling:** Implement error handling to manage HTTP errors and display appropriate messages to users.
    - **Request Interceptors:** Optionally set up request interceptors to add authentication tokens or other headers.

- **Database:**
  - **Schema:** Design tables for users, transactions, categories, and budgets.
  - **Relationships:** Define relationships between users and their transactions or budgets.

- **Reporting and Export:**
  - **Reports:** Generate financial reports based on user data.
  - **Export:** Allow users to download their financial data as CSV files.

---
