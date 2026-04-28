# 📊 Expense Tracker

A simple yet powerful backend-focused Expense Tracker built with **Node.js**, **Express.js**, **MongoDB**, and **EJS** for minimal frontend views.

This application helps users track expenses — add, view, edit, and delete entries — through a web interface and backend logic.

---

## 🚀 Tech Stack

- **Backend:** Node.js  
- **Framework:** Express.js  
- **Database:** MongoDB  
- **Templating Engine:** EJS  
- **Package Manager:** npm  

---

## 📁 Project Structure

```
Expense-Tracker/
│
├── config/         # Database and environment configuration
├── controllers/    # Business logic and route handlers
├── middleware/     # Custom middleware (validation, auth, etc.)
├── models/         # Mongoose schema definitions
├── routes/         # Express route declarations
├── views/          # EJS templates for frontend UI
├── app.js          # Main application entry point
├── package.json    # Dependencies and npm scripts
├── .env            # Environment variables (not committed)
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Shwet594/Expense-Tracker.git
cd Expense-Tracker
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup environment variables

Create a `.env` file in the root:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your actual MongoDB URI.

---

## ▶️ Run the Application

```bash
npm start
```

The app will run on:

```
http://localhost:3000
```

---

## 📦 Features

- ✔ Add a new expense
- ✔ View all expenses
- ✔ Edit existing expense
- ✔ Delete an expense
- ✔ UI rendered with EJS templates
- ✔ Built using MVC architecture

---

## 🧠 How It Works

This project follows the **MVC (Model-View-Controller)** pattern.

### 📌 Models

`models/` contains Mongoose schemas defining how expense data is stored.

### 📌 Controllers

`controllers/` contains logic for handling requests such as creating, updating, and deleting expenses.

### 📌 Routes

`routes/` defines Express routes that map URLs to controller functions.

### 📌 Views

`views/` contains EJS templates used to display pages like:
- Home (list expenses)
- Add Expense
- Edit Expense

---

## 📡 Example Routes

| Method | Route | Description |
|--------|--------|-------------|
| GET | `/` | View all expenses |
| GET | `/add` | Form to add new expense |
| POST | `/add` | Create a new expense |
| GET | `/edit/:id` | Form to edit expense |
| POST | `/edit/:id` | Update expense |
| POST | `/delete/:id` | Delete expense |

---

## 🔐 Middleware

Custom middleware can be used for:
- Request validation
- Authentication (if implemented)
- Error handling and redirects

---

## 📈 Future Improvements

Here are some ideas to extend this project:

- Add **user authentication** (login/signup)
- Create a **REST API version**
- Pagination and filtering by date
- Expense summary charts and dashboards
- Export expenses as CSV or PDF
- Unit and integration tests

---

## 🤝 Contributing

1. **Fork** the repository  
2. Create your feature branch (`git checkout -b feature/fooBar`)  
3. Commit your changes (`git commit -am 'Add some feature'`)  
4. Push to the branch (`git push origin feature/fooBar`)  
5. Open a **Pull Request**

---

## 📜 License

This project is open-source and available under the **MIT License**.

---

## 👨‍💻 Author

Shweta  
GitHub: https://github.com/Shwet594

---

## ⭐ Support

If you like this project, please **⭐ star** it on GitHub! 🚀
