const WebhookController = require("../controllers/WebhookController");
const WebhookControllerObj = new WebhookController();

describe("Triggering Webhooks", () => {
    
    test("Testing with wrong request parameters", async() => {
        // request should fail as the parameter key is wrong
        let paramsPayload = {
            req: ["any", { "valid": "JSON" }]
        };
        let response = await WebhookControllerObj.triggerWebhooks(paramsPayload);
        expect(response.error).toEqual(1);
    });

    test("Testing with no webhooks registered", async() => {
        let webhooks = WebhookControllerObj.getWebhooks();
        expect(webhooks.length).toBe(0);

        let paramsPayload = {
            payload: ["any", { "valid": "JSON" }]
        };
        let response = await WebhookControllerObj.triggerWebhooks(paramsPayload);
        expect(response.error).toEqual(0);
        expect(response.message).toEqual("No webhooks found.");
    });

    test("Testing after registering webhook", async() => {
        let params = {
            url: "http://secondurl.com",
            token: "1dmskaa8"
        };
        let responseRegister = WebhookControllerObj.registerWebhooks(params);
        expect(responseRegister.error).toEqual(0);
        let webhooks = WebhookControllerObj.getWebhooks();
        expect(webhooks.length).toBe(1);

        let paramsPayload = {
            payload: ["any", { "valid": "JSON" }]
        };
        let response = await WebhookControllerObj.triggerWebhooks(paramsPayload);
        expect(response.error).toEqual(0);
        expect(response.message.length).toBe(1);
    });

    test("Testing after registering second webhook", async() => {
        let params = {
            url: "http://thirdurl.com",
            token: "1dmskaa8"
        };
        let responseRegister = WebhookControllerObj.registerWebhooks(params);
        expect(responseRegister.error).toEqual(0);
        let webhooks = WebhookControllerObj.getWebhooks();
        expect(webhooks.length).toBe(2);

        let paramsPayload = {
            payload: ["any", { "valid": "JSON" }]
        };
        let response = await WebhookControllerObj.triggerWebhooks(paramsPayload);
        expect(response.error).toEqual(0);
        expect(response.message.length).toBe(2);
    });

});