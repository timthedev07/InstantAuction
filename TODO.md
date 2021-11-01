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

- Item Entity

  - Name ✅
  - Owner ✅
  - Picture url (hosted on imgur) ✅

- Bid Entity

  - The associated Auction
  - bidder
  - Item used

- Auction Entity

  - Auto generated id
  - Date started
  - Status(closed, succeeded, open)
  - Seller
  - A list of bids

- Auction Resolvers

  - Get item info
  - Update item details
  - For a particular user:
    - Show a list of auctions owned
    - Show a list of auctions participated in

## Client-side

- Write graphqls
- Generate hooks

## Client-side.web

- Pages(do these in order)
  - Login Page
  - Items Page(no algorithm needed, just display a list of items for now)
  - Account Page
  - User Profile Page
  - Landing Page
- Components
  - Alert at the top level of the app(with a trigger function passed down to the children)
  - Item component
  - Logout button
  - New Item Form(using Formik)

**Note: Finish building the web interface before moving on to native.**

## Client-side.mobile

- Add navigation
- Pages(do these in order)
  - Register Page
  - Login Page
  - Home Page(list of items)
  - Account page
  - User profile page
