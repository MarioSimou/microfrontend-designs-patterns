# Microfrontends using tailor-js

## Description

Goal of this this exercise is to implement a microfrontend architecture using tailor-js, which allows to compose a website pulling resources from multiple services (server-side composition). This exercise uses a vertical split approach, which means page has a one-to-one relationship with with a microfrontend, preventing multiple microfrontend rendered at the same time.

## Observations

- Since we have a service sitting at the front of all applications, client-side routing is hard to implement because a request needs to go through the top level service in order to reach the microfrontend application.
- tailor-js has difficulties setting resources between different environments. e.g the definition of a fragment hardcodes the value of src  
- Its more convenient each app to have its own `deployments` directory that includes a `dockerfile` and `.dockerignore` file. Those files can be used in the pipeline to build an optimized image and push it on a target registry.

### Resources

[tailor-js](https://github.com/zalando/tailor)

### Setup

1. Update your hosts file (/etc/hosts) so it can resolve `posts.com.cy` and `auth.posts.com.cy` domains
````
127.0.0.1   posts.com.cy auth.posts.com.cy
```

2. Install node modules. Please make sure that you are on the right node version and use [pnpm](https://pnpm.io/)
```
// if pnpm is not installed run npm install -g pnpm

nvm use
pnpm i
```

### CI/CD

The repository runs on Github Actions which you can learn more [here](https://docs.github.com/en/actions) 
You can also use [nektos/act](https://github.com/nektos/act) to run your pipeline locally.

```
act -j [jobName] pull_request
act -j [jobName] push
```