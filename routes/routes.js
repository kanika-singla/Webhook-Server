const WebhookController = require("../controllers/WebhookController");
const WebhookControllerObj = new WebhookController();
const bodyParser = require('body-parser');

module.exports = function(app) {
    // To handle POST request data
    app.use(bodyParser.json()) // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


    app.get("/", function(request, response) {
        let res = WebhookControllerObj.getWebhooks();
        response.send(res);
    });

    //POST request to register webhook 
    app.post("/api/webhooks", async function(request, response) {
        let res = WebhookControllerObj.registerWebhooks(request.body);
        response.send(res);
    });

    //POST request to trigger webhooks
    app.post("/api/webhooks/test", async function(request, response) {
        let res = WebhookControllerObj.triggerWebhooks(request.body);
        response.send({
            msg: "Webhook triggered!"
        });
    });

};