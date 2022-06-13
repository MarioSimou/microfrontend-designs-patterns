# Microfrontends using tailor-js

## Description

Goal of this this exercise is to implement a microfrontend architecture using tailor-js, which allows to compose a website pulling resources from multiple services (server-side composition). This exercise uses a vertical split approach, which means page has a one-to-one relationship with with a microfrontend, preventing multiple microfrontend rendered at the same time.

## Observations

- Since we have a service sitting at the front of all applications, client-side routing is hard to implement because a request needs to go through the top level service in order to reach the microfrontend application.
- tailor-js has difficulties setting resources between different environments. e.g the definition of a fragment hardcodes the value of src  

### Resources

[tailor-js](https://github.com/zalando/tailor)