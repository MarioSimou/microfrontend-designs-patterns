# Microfrontends using tailor-js

## Description

Goal of this this exercise is to implement a microfrontend architecture using tailor-js, which allows to compose a website pulling resources from multiple services (server-side composition). This exercise uses a vertical split approach, which means page has a one-to-one relationship with with a microfrontend, preventing multiple microfrontend rendered at the same time.

## Observations

- Since we have a service sitting at the front of all applications, client-side routing is hard to implement because a request needs to go through the top level service in order to reach the microfrontend application.
- tailor-js has difficulties setting resources between different environments. e.g the definition of a fragment hardcodes the value of src  
- In terms of building a deployable artifact of each application, it makes sense to have a `base` docker image that is used as a template from the rest of the apps. This will make sure that you are not repeating work building the application image, as well as ensures that each app has all the necessary dependencies within it, which means that you can parallelise the builds. 
- The idea of server-side composition is that a shell application will handle the global navigation and forward traffic to the necessary lower level applications. This means that the shell application owns the top level domain (e.g speakyourownideas.com) and each child applications will has its own subdomain (e.g posts.speakyourownideas.com & auth.speakyourownideas.com). This structure can easily modeled with a load-balancer sending traffic to the shell app, which in turn routes traffic to the rest of the apps(subdomains).
- There are cases where you need to add the `depends_on` meta-argument in your terraform file to indicate that item B needs to wait until item A is created. One such case is the `aws_ecs_service` instruction which needs to wait the `aws_alb_listener`.
- If the application load balancer returns an Internet Gateway Error (502), it may be because  a target groups that is configured on HTTPS(443) rather than HTTP(80) protocol.  

### Resources

[tailor-js](https://github.com/zalando/tailor)

### Setup

1. Update your hosts file (/etc/hosts) so it can resolve `localhost.posts.speakyourownideas.com`, `localhost.auth.speakyourownideas.com` and `localhost.speakyourownideas.com` domains
````
127.0.0.1   localhost.posts.speakyourownideas.com localhost.auth.speakyourownideas.com localhost.speakyourownideas.com
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