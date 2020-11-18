# Webhook-Server

Webhook Server allows API clients to register a URL that will receive an HTTP request in response to certain events. Webhooks is a feature offered
by some web APIs such as Github, Facebook, Stripe and many others.

### Technologies Used:
  * Javascript, NodeJS (Runtime environment)
  * Express framework
  * NodeJS libraries:
      * dotenv
      * body-parser
      * axios
  * JEST (Testing framework)
      
### Pre-requisites
  * NodeJS installed (^12.18.3)
  * Basic understanding of running npm/node commands.

### Setup:
  1. Clone the GitHub repository to your system.
  2. Run `npm install` from command-line.
  3. Run `npm start`
  
### Tests:
  * To run tests written for the below endpoints, run `npm test`.
  * Postman collection (for testing the endpoints): https://www.getpostman.com/collections/e6bbb4cf2318de5f510a 
  
### Endpoints:
  * Register a Webhook:
  
    Clients should be able to register webhooks by making a POST request to `/api/webhooks` with a request body such as the following:
    
      `{
      "url": "https://requestbin.fullcontact.com/rf385urf",
      "token": "foo"
      }`

  * Trigger Webhooks:
  
    Clients should be able to trigger all registered webhooks by making a POST request to `/api/webhooks/test` with a request body such as the following:
    
      `{
        "payload": ["any", { "valid": "JSON" }]
       }`
       
### Intentional Limitations:
 * Authentication is not done on the API layer.
 * URL validation is not taken care of.
 * Deployment is not done and din't use `ngrok` nodejs module for dynamic URL.
 * List of webhooks displayed when performing GET request on "http://localhost:9876". This is just for my understanding if the server works as expected, it can be removed if needed.
 * Returning `error: 0` if same webhook url is trying to register or when we trigger with 0 webhooks.

### Assumptions:
 * Two webhooks with the same URL will not be registered.
 * Response will consist of `error` boolean key/value to indicate any error in response.
 * Only 2 endpoints are required for the task: Register and Triggering/Test Webhooks.
 * The tests are also around the two endpoints only. 
 
