# Webhook-Server

Webhook Server allows API clients to register a URL that will receive an HTTP request in response to certain events. Webhooks is a feature offered
by some web APIs such as Github, Facebook, Stripe and many others.

### Technologies Used:
  * Javascript, NodeJS (Runtime environment)
  * Express framework
  * NodeJS libraries:
      * dotenv
      
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

  * Trigger a Webhook:
  
    Clients should be able to trigger all registered webhooks by making a POST request to `/api/webhooks/test` with a request body such as the following:
    
      `{
        "payload": ["any", { "valid": "JSON" }]
       }`
