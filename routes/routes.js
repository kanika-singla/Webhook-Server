module.exports = function(app) {

    app.get("/", function(request, response) {
        response.send({
            msg: "Welcome!"
        });
    });

    //POST request to register webhook 
    app.post("/api/webhooks", async function(request, response) {
        response.send({
            msg: "Webhook registered!"
        });
    });

    //POST request to trigger webhooks
    app.post("/api/webhooks/test", async function(request, response) {
        response.send({
            msg: "Webhook triggered!"
        });
    });

};