# cv-project-manager
This is an open source project for a task management system. It allows teams to focus on the most important tasks though a dashboard that shows the active, in-progress and completed items. It also allows team members to drop daily status that is broadcasted to slack channel as group notification. 

## Configurations
After you clone the repo, copy following two files and rename them to .js

```
/src/config.js.bak
/src/db/mysqlconfig.js.bak
```

Enter the valid values in these files in order to run the app

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### Publish
Increment version in package.json, commit and push your changes.

```
yarn gh-publish
```

Note - On a new machine, make sure you set environment variable GH_TOKEN as given in electron-auto-updater docs -
link - https://github.com/iffy/electron-updater-example (Point 4)

```
Generate a GitHub access token by going to https://github.com/settings/tokens/new. The access token should have the repo scope/permission. Once you have the token, assign it to an environment variable

On macOS/linux:

 export GH_TOKEN="<YOUR_TOKEN_HERE>"
On Windows, run in powershell:

 [Environment]::SetEnvironmentVariable("GH_TOKEN","<YOUR_TOKEN_HERE>","User")
Make sure to restart IDE/Terminal to inherit latest env variable.

```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
