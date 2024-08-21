# CramIt

CramIt is a web application that allows users to create, study, and manage flashcards. It utilizes Stripe for payment processing, enabling users to purchase premium features and access additional functionality.

## Live Demo
The live demo of the application is available at: [https://flashcard-stripe-86qqzwjum-ddannyyls-projects.vercel.app/](https://flashcard-stripe-86qqzwjum-ddannyyls-projects.vercel.app/)

## Features

- **Flashcard Creation**: Users can create their own flashcards, including the question and answer.
- **Flashcard Management**: Users can organize their flashcards into decks, view their progress, and delete cards they no longer need.
- **Premium Features**: Users can purchase a premium subscription to access additional features, such as custom branding, advanced study modes, and more.
- **Stripe Integration**: The application integrates with Stripe to handle secure payment processing for premium subscriptions.

## Technologies Used

- React.js
- Next.js
- Stripe API
- Clerk 
- Gemini API
- Firebase
- Vercel (for deployment)


## Installation and Setup

To run the application locally, follow these steps:

1. Clone the repository: 
```bash
git clone https://github.com/ddannyyl/flashcard-stripe.git
```
2. Navigate to the project directory:
```bash
cd flashcard-stripe
```

3. Install the dependencies:
```bash
npm install
```

4. Create a `.env.local` file in the root directory and add the necessary environment variables.
```bash
GEMINI_API_KEY =
NEXT_PUBLIC_STRIPE_PUBLIC_KEY =
STRIPE_SECRET_KEY =
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY =
CLERK_SECRET_KEY=
```

5. Start the development server:
```bash
npm run dev
```
