# Stripe Subscription Demo

This project demonstrates a full-stack Stripe subscription flow using React for the frontend and Express for the backend. Users can subscribe to a $5/month plan, and the backend dynamically creates Stripe products and prices, manages checkout sessions, and saves user info to product metadata.

## Features
- React frontend with subscription button and success page
- Express backend with endpoints for Stripe Checkout, session details, and metadata updates
- Dynamic product and price creation on each subscription
- User info saved to Stripe product metadata after successful payment

## Getting Started

### Prerequisites
- Node.js and npm/yarn
- Stripe account (for API keys)

### Installation
1. Clone the repo and install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
2. Set your Stripe secret key in `server.js`:
   - Replace the placeholder in this line:
     ```js
     const stripe = Stripe('sk_test_*******same***above***');
     ```
   - **Note:** The previous key `s_t_51RoOooCkCgzukSnC2dgvege2t9q7Znc9zJmV4o7qXAcrqaOlXV8xCI7tARLRB12jJgyezGJ4bgPQ7dGskbnxvLSV00IW0Xjzzq` should be replaced with the correct test secret key: `sk_test_*******same***above***`.

### Running the App
1. Start the backend server:
   ```bash
   npm run server
   # or
   yarn server
   ```
   The backend runs on [http://localhost:4242](http://localhost:4242).
2. Start the React frontend:
   ```bash
   npm start
   # or
   yarn start
   ```
   The frontend runs on [http://localhost:3000](http://localhost:3000).

## API Endpoints
- `POST /create-checkout-session` — Creates a Stripe Checkout session for a subscription. Expects `{ userId }` in the body.
- `GET /session-details?session_id=...` — Retrieves session and customer details after payment.
- `POST /save-user-to-product` — Saves the user's email and session to the product's metadata. Expects `{ session_id }` in the body.

## Project Structure
- `src/` — React frontend
- `server.js` — Express backend
- `public/` — Static assets

## Notes
- This project is for demo/testing purposes. Do not use test keys in production.
- You must use your own Stripe account and keys for real payments.

## License
MIT

## Contributing

Contributions are welcome! If you'd like to improve this project, please open an issue or submit a pull request. Make sure to follow these guidelines:

- Fork the repository and create your branch from `main`.
- Ensure your code follows the existing style and passes linting/tests.
- Add clear commit messages and documentation for any new features or changes.
- For major changes, please open an issue first to discuss what you would like to change.

Thank you for helping make this project better!
