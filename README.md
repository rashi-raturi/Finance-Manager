# Expense Tracker

A web application to manage your personal finances by tracking income and expenses. Users can view their transactions, add new ones, and delete existing ones. The app also calculates the total income and expenses for the current month.

## Features

- **User Authentication**: Sign up, login, and logout functionality with JWT-based authentication.
- **Transaction Management**: Add, view, and delete income and expense transactions.
- **Monthly Summary**: Display total income and expenses for the current month.
- **Responsive Design**: Mobile-friendly UI built with Bootstrap.

## Technologies Used

- **Frontend**:
  - HTML, JavaScript
  - Bootstrap for styling
  - EJS for templating

- **Backend**:
  - Node.js with Express.js
  - MongoDB for database
  - Mongoose for object data modeling (ODM)

- **Other Tools**:
  - JSON Web Tokens (JWT) for authentication
  - MongoDB Atlas for database hosting
  - Postman for API Testing

## Setup and Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/finance-tracker.git
   cd finance-tracker
2. **Install Dependencies**
   ```bash
   npm install
3. **Set up environment variables**
   Create a .env file in the root of the project with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongo_db_connection_string
   JWT_KEY=your_jwt_secret_key
4. **Run the application**
   ```bash
   npm start
  The app should now be running on http://localhost:5000

  ## How to Use

1. **Sign up** for a new account or log in if you already have an account.
2. **View your transactions** on the homepage.
3. **Add new transactions** (income or expense) via the form.
4. **Delete transactions** by clicking the delete button next to each transaction.
5. **Monitor your total income and expenses** for the current month at the top of the homepage.

## Known Issues

- Transactions are not fully categorized.
- No support for recurring transactions.

## Future Enhancements

- Add categories for transactions.
- Implement user settings to customize the app.
- A user dashboard for visualising expenses.

   
