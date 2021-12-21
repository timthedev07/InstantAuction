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
- Configure React Native ✅
- Set up Apollo Graphql on React Native ✅
- Set up tailwind css on Next.js frontend ✅
- Configure scripts ✅

## Auth

- OAuth ✅
  - Google Auth ✅
    - Create a project in google cloud console ✅
    - Grab credentials ✅
    - See [this](https://medium.com/authpack/easy-google-auth-with-node-js-99ac40b97f4c) article for more instructions ✅
    - Create sign in button component(probably not, there is already an existing button in one of my previous projects) ✅
  - Discord Auth ✅
    - Create a project in discord developers site ✅
    - Grab credentials ✅
    - Complete token handling logic ✅
    - Create or get a sign in button ✅

## Server side

- Express session(I would use session for auth this time) ✅
- Setup redis if needed. ✅

- User Resolvers

  - Login resolver ✅
  - Logout resolver ✅
  - Delete account resolver ✅
  - Update credentials resolver ✅
    - Update username ✅
  - Get Profile Resolver
    - Show avatar ✅
    - Show username ✅
    - Show transaction count ✅
    - Show reputation ✅
    - Show a list of items

- Item

  - Entity
    - Name ✅
    - Owner ✅
    - Picture url (hosted on imgur) ✅
  - Resolvers
    - Create Item ✅
    - Get Items belonged to a particular user ✅
    - Delete Item ✅
    - Modify Item ✅
    - Gets deleted when sold ✅

- Bid Resolvers

  - Bid an auction for an item(reject multiple bids from one user on the same auction) ✅
  - Delete bid ✅

- Auction
  - Resolvers
    - Get all actions ✅
    - Close auction ✅
    - Delete auction ✅
    - End auction and declare winner ✅
    - Update auction details(the owner) ✅
    - For a particular user:
      - Show a list of auctions owned ✅
      - Show a list of auctions participated in

## Client-side.web

- Pages(do these in order)
  - Login Page ✅
  - Auctions Page(no algorithm needed, just display a list of auctions for now)
  - Account Page
  - User Profile Page
  - Landing Page
- Components

  - Alert at the top level of the app(with a trigger function passed down to the children)
  - Auctions ✅
    - Auction component ✅
    - Auctions List ✅
    - New Auction Form(using Formik) ✅
  - Items
    - Item component ✅
    - My Items List ✅
    - New Item Form(using Formik) ✅
  - Auth/User
    - Profile
      - Reputation
      - Avatar ✅
      - Username ✅
      - Email ✅
    - Logout button ✅

**Note: Finish building the web interface before moving on to native.**

## Client-side.mobile

- Add navigation
- Pages(do these in order)
  - Register Page
  - Login Page
  - Home Page(list of items)
  - Account page
  - User profile page
