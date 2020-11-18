const WebhookController = require("../controllers/WebhookController");
const WebhookControllerObj = new WebhookController();
const bodyParser = require('body-parser');

module.exports = function(app) {
    // To handle POST request data
    app.use(bodyParser.json()) // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

    //GET request to list all the webhooks
    app.get("/", function(request, response) {
        let res = WebhookControllerObj.getWebhooks();
        response.send(res);
    });

    //POST request to register webhook 
    app.post("/api/webhooks", function(request, response) {
        let res = WebhookControllerObj.registerWebhooks(request.body);
        response.send(res);
        response.status(200).end();
    });

    //POST request to trigger webhooks
    app.post("/api/webhooks/test", async function(request, response) {
        let res = await WebhookControllerObj.triggerWebhooks(request.body);
        response.send(res);
        response.status(200).end();
    });

};