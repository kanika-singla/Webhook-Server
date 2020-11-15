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
            this.response.message = "Request body is invalid.";
            return this.response;
        }
        if(this.checkIfWebhookExists(reqWebhook)) {
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

    checkIfWebhookExists(reqWebhook) {
        return webhooks.some(webhook => webhook.url === reqWebhook.url);
    }

}

module.exports = WebhookController;