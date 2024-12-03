# To-Do List Application

A full-stack to-do list application with user authentication and MongoDB integration.

## Features

- User registration and authentication
- Create, read, update, and delete tasks
- Filter tasks by status (All, Active, Completed)
- Persistent data storage with MongoDB Atlas
- Modern and responsive UI

## Technologies Used

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB Atlas
- Authentication: bcryptjs

## Setup

1. Clone the repository
```bash
git clone [your-repo-url]
cd [your-repo-name]
```

2. Install dependencies
```bash
npm install
```

3. Create a `config.env` file in the root directory with the following content:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

4. Start the server
```bash
node server.js
```

5. Open `signup.html` in your browser to start using the application

## Usage

1. Register a new account
2. Add tasks using the input field
3. Mark tasks as complete by checking the checkbox
4. Delete tasks using the delete button
5. Filter tasks using the All/Active/Completed buttons
6. Logout when finished

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
