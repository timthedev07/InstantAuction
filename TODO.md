# TO-DO List for this project

## Non-Coding Tasks

- Design Logo
- Color palette (black and white?)
- README
- Marketing(further details are going to be discussed)

## Setup tasks

- Install and configure tailwind ✅
- Configure Typeorm to connect to the database ✅
- Set up Apollo GraphQL on Next.js frontend ✅
- Configure React Native
- Set up Apollo Graphql on React Native
- Configure scripts

## Server side

- Express session(I would use session for auth this time)
- Setup redis if needed.
- User Resolvers
  - Register resolver
  - Login resolver
  - Logout resolver
  - Delete account resolver
  - Update credentials resolver
  - Get Profile Resolver
    - Show avatar
    - Show username
    - Show transaction count
    - Show reputation
    - Show a list of transactions
- Transaction Entity
  - Auto generated id 
  - Date started
  - Status(closed, succeeded, open)
  - Seller
  - Current highest bidder
  - Current highest bid

- Transaction Resolvers
  - Create transaction
  - Delete transaction
  - Get transaction info
  - Update transaction details
- OAuth
  - For each in ["Google OAuth", "Discord OAuth"]
    - Create a project in google cloud console
    - Grab credentials
    - See [this](https://medium.com/authpack/easy-google-auth-with-node-js-99ac40b97f4c) article for more instructions on google oauth.
    - Create sign in button component(probably not, there is already an existing button in one of my previous projects)



