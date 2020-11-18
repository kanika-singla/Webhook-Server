let webhooks = [];
const axios = require('axios');

class WebhookController {
    response = {
        error: 1,
        message: ""
    };

    /**
     * Function to return current list of webhooks.
     * This is just for me to better understand how the server is working, we can omit this out if not needed.
     */
    getWebhooks() {
        return webhooks;
    }

    /**
     * Function to register webhooks on the webhook server.
     * It accepts an object with 2 values: url and token.
     * @param {Object} reqWebhook : { url: "", token: ""}
     * @returns {Object} response: {error: 0/1, message: ""}
     */
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

    /**
     * Function to trigger webhooks on the webhook server.
     * It accepts an object with 1 value: payload.
     * @param {Object} request : { payload: [] }
     * @returns {Object} response: {error: 0/1, message: ""}
     */
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

    /**
     * Function to check if webhook already exists
     * @param {Object} reqWebhook : {url: "", token: ""}
     * @returns {Boolean} true/false
     */
    checkIfWebhookExists(reqWebhook) {
        return webhooks.some(webhook => webhook.url === reqWebhook.url);
    }

    /**
     * Function to send request to each webhook present in the application.
     * @param {Object} webhook: {url: "", token: ""} 
     * @param {Array} payload: ["any", { "valid": "JSON" }] 
     * @returns {Object} : { url: "", message: "", response: ""}
     */
    async sendRequestToWebhook(webhook, payload) {
        try {
            let params = {
                token: webhook.token,
                payload: payload
            }
            let response = await axios.post(webhook.url, params, {timeout: 1000}, {validateStatus: true});
            return {
                url: webhook.url,
                message: "Success while testing for payload",
                response: response
            }
        } catch(error) {
            return {
                url: webhook.url,
                message: "Error while testing for payload",
                error: error
            }
        }
    }

}

module.exports = WebhookController;