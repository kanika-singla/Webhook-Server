module.exports = function(app) {

    app.get("/", function(request, response) {
        response.send({ msg: "Welcome!"});
    });

    //POST request to register webhook 
    app.post("/api/webhooks", async function(request, response) {
        response.send({
            msg: "Webhook registered!"
        });
    });

};