# Job Application Tracker

A modern job application tracking app built with React, MUI, and Cloudflare Workers. This application allows users to manage their job applications, with features like adding, editing, deleting applications, and viewing job application summaries. The backend is powered by Cloudflare Workers with JWT authentication.

## Features

- **User Authentication**: Login and registration using JWT.
- **Job Application Management**: Add, edit, and delete job applications.
- **Quick Add**: Quickly add job applications from LinkedIn URLs.
- **Responsive UI**: Modern UI/UX with dark/light mode support.
- **Summary Toolbar**: Brief summary of job applications.
- **Profile Management**: Edit user details and settings.
- **Real-time Updates**: Immediate updates to the application grid on changes.

## Tech Stack

- **Frontend**: React, MUI (Material-UI)
- **Backend**: Cloudflare Workers, Node.js
- **Authentication**: JWT (JSON Web Tokens)

## Access Online

### Prerequisites

- Need to register

### Step
1. go to [Dev Deploy Site](https://jatreact-worker.pages.dev)

## Installation on local

### Prerequisites

- Node.js (18.17.1) since CloudFlare Workers only support up to 18.17.1
- CloudFlare account
- CloudFlare's Wrangler (cli)

### Setup

1. **Clone the repository**:

    ```bash
    git clone https://github.com/andygqw/JATReact-Worker.git
    cd JAT-REACT
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up Cloudflare Workers**:

    - Install Cloudflare Wrangler:

    ```bash
    cd jwt-auth-worker
    npm install
    npm install -g wrangler
    ```

    - Login to Cloudflare:

    ```bash
    wrangler login
    ```

    - Configure Wrangler (inside the project directory):

    ```bash
    wrangler init
    ```

    - Update `wrangler.toml` with your Cloudflare account details:

    ```toml
    name = "job-application-tracker"
    type = "javascript"
    account_id = "your-cloudflare-account-id"
    workers_dev = true
    compatibility_date = "2023-01-01"

    [[kv_namespaces]]
    binding = "DB"
    id = "your-kv-namespace-id"

    [vars]
    JWT_SECRET = "your-secret-key"
    ```

4. **Deploy Cloudflare Workers**:

    ```bash
    wrangler publish
    ```

5. **Run the React app**:

    ```bash
    cd ..
    npm start
    ```

## Usage

### Login

- Navigate to the login page.
- Enter your username and password.
- Click on the "Login" button.

### Register

- Click on "Register" on the login page.
- Fill out the registration form.
- Click on the "Register" button.

### Dashboard

- View the list of job applications.
- Add a new job application by clicking "Add Job".
- Quick add a job application by clicking "Quick Add" and providing a LinkedIn URL.
- Edit an existing job application by clicking on a row.
- Delete a job application by clicking the trash can icon.
- View and edit profile details by hovering over the avatar and selecting "Profile".

## API Endpoints

### Cloudflare Worker Endpoints

- **Login**: `/login` (POST)
- **Register**: `/register` (POST)
- **Get Applications**: `/applications` (GET)
- **Add Application**: `/applications/add` (POST)
- **Quick Add Application**: `/applications/quickadd` (POST)
- **Edit Application**: `/applications/edit` (POST)
- **Delete Application**: `/applications/delete` (POST)
- **Get User Details**: `/user/details` (GET)
- **Update User Details**: `/user/update` (POST)

## Code Structure

### Frontend (React)

- `src/components/Dashboard.js`: Main dashboard component.
- `src/components/Summary.js`: Summary component for toolbar.
- `src/utils/api.js`: Axios instance configuration.
- `src/utils/Helper.js`: Helper functions.
- `src/index.js`: Entry point for the React app.
- `public/index.html`: Main HTML file.
- `src/App.js`: Main App component.

### Backend (Cloudflare Workers)

- `src/index.js`: Main worker script.
- `src/utils/jwt.js`: JWT utility functions.
- `src/utils/db.js`: Database interaction functions.

## Contribution

Feel free to fork this repository and contribute by submitting a pull request. Please make sure to follow the standard coding guidelines and include relevant tests for your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.