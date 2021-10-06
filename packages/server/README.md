# Authentication backend graphql api for your project

- Uses apollo-server-express to connect to the corresponding Apollo client and runs on top of NodeJS.
- Uses Typeorm as the orm library.
- Uses JWT
- Ready for production(hosted on heroku)

## Development Setup

You can remove the `Procfile` in the current directory if you don't plan o hosting on heroku.

**Requirements**

- Make sure you have node and yarn installed.
- Make sure you have [postgresql](https://www.postgresql.org/download/) installed on you machine, and create an empty database named `auth-api-template` if not already.
  Although you can use databases with other names, but don't forget to update your [orm config](./ormconfig.js) as well.
- Make sure you have [redis](https://redis.io/download) installed on your machine.

**Instructions**

**_Important Part: Complete `.env` file with your own credentials_**

Fill the following environment variables out:

- ACCESS_TOKEN_SECRET
- REFRESH_TOKEN_SECRET
- POSTGRES_USERNAME
- POSTGRES_PASSWORD
- MAIL_USERNAME
- MAIL_PASSWORD

Open up a terminal in the current directory:

```bash
yarn # install dependencies
yarn dev
```

## Hosting

It's a bit more complex and we need to tweak a few things.

### **0. Create and connect to a new heroku app**

Register an account if not already, and create an app.
We assume that the app has a name of `auth-api`.

Login to the heroku CLI if not already:

```bash
heroku login
```

Before the next step, modify [this shell script](./herokuDeploy.sh) file to apply the automation to your heroku git remote.

And in the [root](../) directory of this project:

```bash
git remote add heroku https://git.heroku.com/auth-api.git # add the remote to our repo for logging purposes
cd server
sh herokuDeploy.sh
```

**_From now on, all the environment variables mentioned should be filled directly in your heroku app's Config Vars section._**

Add the following variables in there:

- ACCESS_TOKEN_SECRET
- REFRESH_TOKEN_SECRET
- MAIL_USERNAME
- MAIL_PASSWORD

You might need to refer to this stackoverflow [answer](https://stackoverflow.com/questions/44957790/nodemailer-heroku-gmail-invalid-login-works-locally) later on in production if something goes wrong with nodemailer's authentication and you are using gmail.

### **1.Heroku postgres**

Install the [addon](https://elements.heroku.com/addons/heroku-postgresql).

### **2.Connect to redis labs**

Sign in/up for an account at [RedisLabs](https://app.redislabs.com/) and create a subscription if not already. Then follow the instructions and create a database.
At this point, you should be able to see your database credentials, we are going to need the endpoint and the password.

Now, the password is straightforward, but we also need the host and the port.
For example, this is how the endpoint URL might look like:

```
redis-10000.a000.us-east-0-0.ec2.cloud.redislabs.com:11653
```

Where everything before the _colon_ is the host, and the number after it is the PORT.

If you did everything correctly, your heroku config vars should contain something like this.
![redis config](https://raw.githubusercontent.com/timthedev07/Your-Doge/staging/assets/redisconfig.png)

### **3.Update frontend URL to allow for cors**

In [the global.ts file](./src/constants/global.ts), update the `FRONTEND` variable according to your frontend app URL. Although you can also do this later if you have not yet hosted your app.

### **4.Restart your app!**

```bash
heroku restart
```

  <h1 align="center">Voila, we are done!</h1>
