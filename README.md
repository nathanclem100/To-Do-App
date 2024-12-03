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
git clone https://github.com/nathanclem100/To-Do-App.git
cd To-Do-App
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables:
   - Copy `config.env.example` to `config.env`
   - Update the environment variables in `config.env` with your values:
     ```
     MONGODB_URI=your_mongodb_connection_string
     PORT=5000
     ```

   For production deployment:
   - Use environment variables provided by your hosting platform
   - Never commit sensitive credentials to version control
   - Use secrets management for sensitive data

4. Start the server
```bash
node server.js
```

5. Open `signup.html` in your browser to start using the application

## Environment Variables

The application uses the following environment variables:

- `MONGODB_URI`: Your MongoDB connection string
- `PORT`: The port number for the server (default: 5000)

For security:
- Never commit the actual `config.env` file to version control
- Use environment variables in production
- Use secrets management in your deployment platform
- Keep your MongoDB credentials private

## Usage

1. Register a new account
2. Add tasks using the input field
3. Mark tasks as complete by checking the checkbox
4. Delete tasks using the delete button
5. Filter tasks using the All/Active/Completed buttons
6. Logout when finished

## Deployment

When deploying to production:

1. Set up environment variables in your hosting platform
2. Never expose sensitive credentials in your code
3. Use HTTPS for all connections
4. Enable MongoDB Atlas network security settings

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
