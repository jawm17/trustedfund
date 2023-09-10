# TrustedFund

TrustedFund is a decentralized application that aims to provide a secure and transparent platform for funding projects.

## Features
- **User Authentication and Account Management**: Securely manage user accounts and profiles.
- **Create and View Projects**: Users can create new projects and view existing ones.
- **Secure and Transparent Fund Handling**: Utilizes Ethereum smart contracts to ensure transparency and security.
- **Intuitive Navigation and User Interface**: Designed for ease of use and seamless navigation.

## Tech Stack
- **React.js**: Used for building the frontend of the application.
- **Ethereum Smart Contracts**: Provides backend logic and ensures secure transactions.
- **Web3.js**: Enables interaction with the Ethereum blockchain.

## Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/jawm17/trustedfund.git
   ```

2. **Navigate to the client directory**
   ```bash
   cd trustedfund/client
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Run the Application**
   ```bash
   npm start
   ```

## Directory Structure

- `client`: Contains the frontend code of the application.
  - `src`: Main source directory.
    - `components`: Reusable UI components like Header, Nav, and UploadHandler.
    - `context`: Contains the authentication context for user management.
    - `contracts`: Ethereum contract ABIs.
    - `hocs`: Higher-order components for route management.
    - `pages`: Different pages of the application like Home, Account, Create, and ProjectPage.
    - `services`: Services like AuthService for authentication.
- `contracts`: Contains the Ethereum smart contract ABIs.

## Contributing

Feel free to fork the repository, create a feature branch, and submit a pull request.
