# Role-Based Access Control (RBAC) UI

## Project Description

This project is a **Role-Based Access Control (RBAC) User Interface** designed to manage and enforce permissions within an application.### Key Features:

- User authentication and role assignment.
- Dynamic rendering of UI components based on user roles.
- Support for custom roles and permissions.
- Integration with backend APIs for role and permission management.
  -Responsive design

## Technologies Used

- **Frontend**: React.js, HTML, CSS, JavaScript, Bootstrap
- **Backend**: JSON Server (mock API)
- **Version Control**: Git
- **Others**: Axios (API calls)

## Installation and Setup

Follow these steps to set up and run the project locally:

1. Clone the repository:

   git clone <repository_url>
   cd <repository_name>

   ```

   ```

2. Install dependencies:

   ````bash
   npm install   ```

   ````

3. Start the JSON server (on port 3002):

   ```bash
   npx json-server --watch db.json --port 3002
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open the application in your browser at [http://localhost:5173/](http://localhost:5173/).

## How to Use

1. **Login**: Use the username as admin and password as 1234.
2. **Assign Roles**: Navigate to the role management section to assign roles to users.
3. **UserManagement**: Navigate to the user management section to manage users.

## Features in Detail

- **Role Management**:
  - Add, edit,read or delete roles.
  - Assign permissions to roles.
- **User Management**:
  - Add, edit,read or delete user.
