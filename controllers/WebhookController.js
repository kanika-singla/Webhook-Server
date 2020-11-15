let webhooks = [];

class WebhookController {
    response = {
        error: 1,
        message: ""
    };

    getWebhooks() {
        return webhooks;
    }

    registerWebhooks(reqWebhook) {
        if( !(reqWebhook.hasOwnProperty("url") && reqWebhook.hasOwnProperty("token")) ) {
            this.response.error = 1;
            this.response.message = "Request body is invalid.";
            return this.response;
        }
        //TODO_check if url format is correct
        
        if(this.checkIfWebhookExists(reqWebhook)) {
            this.response.error = 1;
            this.response.message = "Webhook exists";
            return this.response;
        }

        try {
            webhooks.push(reqWebhook);
            this.response.error = 0;
            this.response.message = "Webhook registered";
            return this.response;
        } catch(error) {
            this.response.message = error;
            return this.response;
        }
    }

    triggerWebhooks(request) {
        if( !request.hasOwnProperty("payload") ) {
            this.response.error = 1;
            this.response.message = "Request body is invalid.";
            return this.response;
        }
        for(var i=0; i<webhooks.length; i++) {
            this.sendRequestToWebhook(webhooks[i], request.payload);
        }
    }

    checkIfWebhookExists(reqWebhook) {
        return webhooks.some(webhook => webhook.url === reqWebhook.url);
    }

    sendRequestToWebhook(webhook, payload) {
        //TODO_Send request to webhook
    }

}

module.exports = WebhookController;