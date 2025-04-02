# Blogger's Nook

Blogger's Nook is a **full-stack blogging platform** built using the **MERN (MongoDB, Express.js, React.js, Node.js) stack**. It allows users to **write, publish, edit, and delete blogs**, manage their accounts, and interact with the community in a secure and user-friendly environment.

## Features

- **User Authentication & Authorization**: Secure **JWT-based authentication** with role-based access control.
- **Blog Management**: Users can **create, edit, delete, and publish** their blogs securely.
- **Profile Management**: Users can **register, log in, update their profile, and log out**.
- **Authorization Control**: Users can edit or delete **only their own posts**.
- **SEO & Performance Optimization**: Implemented **lazy loading, caching, and SSR (Next.js integration optional)**.
- **Fully Responsive UI**: Built with **React.js** to ensure a seamless experience on all devices.
- **Additional Sections**: Includes **Contact Us** and **About Us** pages for better engagement.

## Tech Stack

- **Frontend**: React.js, CSS3 , HTML5
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ORM
- **Authentication**: JWT, bcrypt

## Installation & Setup

### 1. Clone the Repository
```sh
git clone https://github.com/yourusername/bloggers-nook.git
cd bloggers-nook
```

### 2. Install Dependencies
#### Backend
```sh
cd api
npm install
```
#### Frontend
```sh
cd client
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the **server** directory and add:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### 4. Run the Application
#### Start Backend
```sh
cd api
npm start
```
#### Start Frontend
```sh
cd client
npm start
```

## API Endpoints

| Method | Endpoint         | Description                |
|--------|-----------------|----------------------------|
| POST   | /api/auth/register | Register a new user       |
| POST   | /api/auth/login    | User login & JWT token    |
| GET    | /api/posts         | Get all blogs             |
| POST   | /api/posts         | Create a new blog         |
| PUT    | /api/posts/:id     | Edit user’s own blog      |
| DELETE | /api/posts/:id     | Delete user’s own blog    |

## Contributing
Feel free to fork this repository and contribute! Follow these steps:
1. Fork the repo
2. Create a new branch (`feature-name`)
3. Commit your changes
4. Push and create a pull request
