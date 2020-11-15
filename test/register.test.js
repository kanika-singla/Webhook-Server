const WebhookController = require("../controllers/WebhookController");
const WebhookControllerObj = new WebhookController();

describe("Registering Webhooks", () => {
    
    test("Testing with wrong request parameters", () => {
        // request should fail as the parameter is mispelled
        let params = {
            ulr: "http://wrongurl.com",
            token: "1fz4"
        };
        let response = WebhookControllerObj.registerWebhooks(params);
        expect(response.error).toEqual(1);

        // request should fail as the parameter is missing token
        params = {
            url: "http://wrongurl.com"
        };
        response = WebhookControllerObj.registerWebhooks(params);
        expect(response.error).toEqual(1);
    });

    test("Testing with valid webhook request", () => {
        let params = {
            url: "http://wrongurl.com",
            token: "1dmsk8"
        };
        let response = WebhookControllerObj.registerWebhooks(params);
        expect(response.error).toEqual(0);
        let webhooks = WebhookControllerObj.getWebhooks();
        expect(webhooks.length).toBe(1);
    });

    test("Testing with second valid webhook request", () => {
        let params = {
            url: "http://secondurl.com",
            token: "1dmskaa8"
        };
        let response = WebhookControllerObj.registerWebhooks(params);
        expect(response.error).toEqual(0);
        let webhooks = WebhookControllerObj.getWebhooks();
        expect(webhooks.length).toBe(2);
    });

    test("Testing with same webhook url", () => {
        let params = {
            url: "http://secondurl.com",
            token: "1dmskaa8"
        };
        let response = WebhookControllerObj.registerWebhooks(params);
        expect(response.error).toEqual(1);
        let webhooks = WebhookControllerObj.getWebhooks();
        expect(webhooks.length).toBe(2);
    });

});