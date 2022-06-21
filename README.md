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
```bash
127.0.0.1   localhost.posts.speakyourownideas.com localhost.auth.speakyourownideas.com localhost.speakyourownideas.com
```

2. Install node modules. Please make sure that you are on the right node version and use [pnpm](https://pnpm.io/)
```bash
// if pnpm is not installed run npm install -g pnpm

nvm use
pnpm i
```

### Run pipeline locally

The repository runs on Github Actions which you can learn more [here](https://docs.github.com/en/actions) 
You can also use [nektos/act](https://github.com/nektos/act) to run your pipeline locally.

```bash
act -j [jobName] pull_request
act -j [jobName] push
```

### Dynamically generate .env.production files
1. Export below environment variables
```bash
export ENV_CONFIG=production
export FIREBASE_API_KEY=[value]
export FIREBASE_AUTH_DOMAIN=[value]
export FIREBASE_PROJECT_ID=[value]
export FIREBASE_STORAGE_BUCKET=[value]
export FIREBASE_MESSAGING_SENDER_ID=[value]
export FIREBASE_APP_ID=[value]
export FIREBASE_ADMIN_CLIENT_EMAIL=[value]
export FIREBASE_ADMIN_PRIVATE_KEY=[value]
export POSTS_WEB_APP_BASE_URL=https://posts.speakyourownideas.com
export AUTH_WEB_APP_BASE_URL=https://auth.speakyourownideas.com
export SHELL_APPLICATION_BASE_URL=https://speakyourownideas.com
```

2. Run script to generate files

```bash
./ci/scripts/create-env-files.sh
```

### Build Infrastructure - Deploy to AWS

1. Register a domain and create a certificate using the `Certificate Manager` service from AWS 

2. Initiate terraform configuration within the `infrastructure` directory
```bash
terraform init
```

3. Populate `terraform.tfvars` file
```terraform
env                    = "prod"
domain_certificate_arn = [arn of the HTTPS certificate you created]
```

3. Build infrastructure

```
pnpm infra:apply
```

4. Generate `.env.production` files and upload them to s3 bucket. 
```bash
# Check section 'Dynamically generate .env.production files'
./ci/scripts/create-env-files.sh

pnpm infra:upload:env
```

5. Update the hosted zone you created in Route53 so that the A records point to your load balancer

6. Run master pipeline to deploy the apps