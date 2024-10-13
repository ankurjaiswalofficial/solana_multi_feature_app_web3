Solana Multi-Feature Web App
============================

This is a decentralized application (dApp) built on Solana using Next.js, providing multiple features such as wallet setup, token management, airdrops on the Devnet, and account monitoring.

Getting Started
---------------

This project is bootstrapped with `create-next-app`.

### Installation

Clone the repository and navigate to the project directory:

`git clone https://github.com/ankurjaiswalofficial/solana_multi_feature_app_web3`

Install the dependencies:

`npm install`

### Running the Development Server

To run the development server, use one of the following commands:

`npm run dev # or yarn dev # or pnpm dev # or bun dev`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application in action.

Adding Dependencies (Solana Web3)
---------------------------------

To set up the basic Solana wallet adapter and enable features like airdrops, token monitoring, and sending tokens, run the following command:

```bash
npm install \
@solana/wallet-adapter-base \
@solana/wallet-adapter-react \
@solana/wallet-adapter-react-ui \
@solana/wallet-adapter-wallets \
@solana/web3.js
```

These dependencies allow you to:

*   Set up and manage Solana wallets.
*   Airdrop tokens in the Devnet environment.
*   Monitor and verify account balances.
*   Send tokens to other accounts seamlessly.

Features
--------

*   **Wallet Integration**: Easily set up and manage Solana wallets using `@solana/wallet-adapter`.
*   **Devnet Airdrops**: Get free tokens on Solana Devnet for testing and development.
*   **Token Management**: Monitor token balances and transfer tokens between accounts.
*   **Account Verification**: Verify the status and balances of accounts on the Solana blockchain.

Scripts
-------

*   `npm run dev`: Starts the development server.
*   `npm run build`: Builds the application for production.
*   `npm run start`: Starts the production server.
*   `npm run lint`: Runs ESLint to check for code quality issues.
*   `npm run format`: Formats the codebase using Prettier.

Tech Stack
----------

*   **Next.js** - A React framework for building fast, scalable applications.
*   **React** - For building interactive UIs.
*   **Solana Web3** - For blockchain interactions and wallet management.
*   **TypeScript** - Adds type safety and improved developer experience.

License
-------

This project is licensed under the MIT License.
