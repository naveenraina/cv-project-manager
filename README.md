# cv-project-manager

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
yarn gh-publish


note - On a new machine, make sure you set environment variable GH_TOKEN as given in electron-auto-updater docs -
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
