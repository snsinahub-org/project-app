# project-app

> A GitHub App built with [Probot](https://github.com/probot/probot) that App that listens to project events 
This app listens to project events and will change issue lable based on project item status.

## Prerequisites
- A server/computer which can be accessed via a URL. 
  - For development/local test you can use your personal computer and use [smee.io](https://smee.io/) to let github app reaches to your computer
- To run the app as a nodejs application: node v16+
- To run this as a docker container: `docker` or `docker desktop` must be installed

## Build and run
To run this app successfully, you need to complete below steps:
- Create a GitHub App
- Install app in your organization
- `Customize your configurations` and `deploy app`
- - Build app
- Run app
  - The app must be reached via `webhook URL` defined in the `GitHub App settings`



## APP Creation/Registrations
- Go to Organization settings -> Developer settings -> GitHub Apps
- Click on `New GitHub App` button
- Register APP with
  - Github App name
  - Homepage URL: GitHub Repo URL
  - Webhool URL: The APP can be reached via this URL, e.g `http://yourdomain/app`
  - Webhook secret: generate a random secret. For instance `openssl rand -base64 32`
- Permissions: set peemissions as below
  - Repository 
    - Issues: Read and Write
    - Projects: Read and Write
  - Organization
    - Projects: Read and Write
- Subscribe to events
  - Projects v2 item
  - Project
- Generate a private Key

### Install APP in your organization
- Got to App settings -> Install App
- Select the organization you'd like to install the APP
- Click on `Install` button

## Deploy App
You can go to your APP settings and obtain followings
- App ID
- Client ID
- Webhook URL

### Config files
#### App env file
The config file name is `.env` and the location is 

```bash
APP_ID=<your app id>
WEBHOOK_SECRET=<your app secret>
PRIVATE_KEY=<one line private key>
NODE_ENV=production
```

#### Custom projet item status/issue labels
This file is located at `config/default.json`. You can add/remove/modify lables in the config file to match with your `Project items statuses`

## Build and run

### Node js
```sh
# Install dependencies
npm install
npm run build

# Run the bot
cd lib
npm start
```

### Docker

```sh
# 1. Build container
docker build -t project-app .

# 2. Start container
docker run -d -p 0.0.0.0:3000 project-app
```
## External reference
- [Probot](https://probot.github.io/)
- [smee.io](https://smee.io)
