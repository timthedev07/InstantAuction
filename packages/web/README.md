# React client side application integrating apollo-client

- Built with React.
- Uses apollo client to make requests to our graphql api.
- Predefined graphql code, but feel free to modify it according to your preferences.
- No styles for the sake of flexibility.
- Ready for production(hosted on netlify)

## Development Setup

**Requirements**

- Make sure you have node and yarn installed.

**Instructions**

Open up a terminal in the current directory:

```bash
yarn # install dependencies
yarn dev# start the development server
```

It should automatically pop a tab up in your browser, and if not visit [here](http://localhost:3000).

## Hosting

For hosing frontend applications I choose netlify, because it's free and easy to use.

**Instructions**

First we need to modify our production backend URL in [apollo.ts](./src/constants/apollo.ts) if you have hosted your backend already, if not, you can do that later on.

Then, create a new repository on github, and let's assume it is identified as `me/auth-project` where me is your username and auth-project represents just whatever the name you gave to your repository.

**_In the root directory of the project:_**

```bash
git init
git remote add origin https://github.com/me/auth-project.git
git add .
git commit -am "init"
git push --set-upstream origin main; git push --set-upstream origin master
```

Then...

- Go to [netlify](https://www.netlify.com/) and create an account if not already.
- Create a new site from git.
- Follow the instructions and connect to the repo just created.

And your build settings should look something like this:
![build settings](https://raw.githubusercontent.com/timthedev07/Your-Doge/staging/assets/netlifyBuild.png)

That's it for the frontend!
