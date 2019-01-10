/* tslint:disable:object-literal-sort-keys */

import { RequestEnvelope } from "ask-sdk-model";
import { expect } from "chai";
import { alexaSkill } from "../src/app";

describe("App", () => {
  it("should reply with Intent.Launch", () => {
    const event: RequestEnvelope = {
      version: "",
      context: {
        System: {
          application: {
            applicationId: "amzn1.ask.skill.APP_ID"
          },
          user: {
            userId: "amzn1.ask.account.USER_ID"
          },
          device: {
            deviceId: "amzn1.ask.device.DEVICE_ID",
            supportedInterfaces: {}
          },
          apiEndpoint: "https://api.amazonalexa.com",
          apiAccessToken: ""
        }
      },
      session: {
        new: true,
        sessionId: "",
        user: {
          userId: ""
        },
        application: {
          applicationId: ""
        }
      },
      request: {
        type: "LaunchRequest",
        requestId: "amzn1.echo-api.request.REQUEST_ID",
		    timestamp: "2019-01-10T23:11:46Z",
		    locale: "en-US"
      }
    };

    return alexaSkill.execute(event).then(reply => {
      expect(reply.response.outputSpeech.ssml).to.equal(
        "<speak>Welcome!</speak>"
      );
    });
  });
});
