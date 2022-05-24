# Ekanek Assignment

File Upload Platform

## Local Development Setup

Clone this repo by running `git clone https://github.com/jaybhoyar/ekanek.git`.

To Setup the application in your local machine ensure that you have `rbenv`, `nvm`, `yarn`, `node`, `redis` and `postgresql` is working properly.

Use the following commands to set up and start the application.

```
./bin/setup

foreman start -f Procfile.dev
```
For ruby versions not supporting foreman:

```bash
bundle exec rails server
```

Visit http://localhost:3000 and login with email `steve@example.com` and password `welcome`.

