let webhooks = [];
const axios = require('axios');

class WebhookController {
    response = {
        error: 1,
        message: ""
    };

    getWebhooks() {
        return webhooks;
    }

    registerWebhooks(reqWebhook) {
        try {
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

            webhooks.push(reqWebhook);
            this.response.error = 0;
            this.response.message = "Webhook registered";
            return this.response;
        } catch(error) {
            this.response.error = 1;
            this.response.message = error;
            return this.response;
        }
    }

    async triggerWebhooks(request) {
        let responseArray = [];
        if( !request.hasOwnProperty("payload") ) {
            this.response.error = 1;
            this.response.message = "Request body is invalid.";
            return this.response;
        }
        if(webhooks.length == 0) {
            this.response.error = 0;
            this.response.message = "No webhooks found.";
            return this.response;
        }
        try {
            for(var i=0; i<webhooks.length; i++) {
                let responseFromWebhook = await this.sendRequestToWebhook(webhooks[i], request.payload);
                responseArray.push(responseFromWebhook);
            }
            this.response.error = 0;
            this.response.message = responseArray;
            return this.response;
        } catch(error) {
            this.response.error = 1;
            this.response.message = error;
            return this.response;
        }
    }

    checkIfWebhookExists(reqWebhook) {
        return webhooks.some(webhook => webhook.url === reqWebhook.url);
    }

    async sendRequestToWebhook(webhook, payload) {
        try {
            let params = {
                token: webhook.token,
                payload: payload
            }
            let response = await axios.post(webhook.url, params, {timeout: 1000}, {validateStatus: true});
            return {
                url: webhook.url,
                msg: "Success while testing for payload",
                response: response
            }
        } catch(error) {
            return {
                url: webhook.url,
                msg: "Error while testing for payload",
                error: error
            }
        }
    }

}

module.exports = WebhookController;