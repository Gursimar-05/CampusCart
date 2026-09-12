# CampusCart 🛒

CampusCart is a student-focused campus marketplace that makes it easier for students to buy, sell, rent, and discover useful items within their campus community.

## 🚀 Features

- 🔎 Search campus listings
- 🏷️ Filter listings by type and category
- 🛒 Buy or rent items
- ❤️ Add listings to favourites
- 📸 Upload an image when creating a listing
- 📢 Show interest in a listing
- 🔔 Receive interest notifications
- 💬 Contact sellers through in-app messaging
- 👤 Create a user account
- 🔐 Secure login with password hashing
- 🗄️ Store user accounts using MongoDB

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- CORS

## 📁 Project Structure

```text
Campus_Cart/
│
├── backend/
│   ├── models/
│   │   └── User.cjs
│   └── server.cjs
│
├── public/
│
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── SearchBar.jsx
│   ├── ListingCard.jsx
│   ├── ListingType.jsx
│   ├── Categories.jsx
│   └── listings.js
│
├── package.json
├── package-lock.json
└── README.md