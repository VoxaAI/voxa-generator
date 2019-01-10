"use strict";

const { alexaSkill } = require("../src/app");
const expect = require("chai").expect;

describe("App", () => {
  it("should reply with Intent.Launch", () => {
    const event = {
      session: {
        application: {
          applicationId: ""
        }
      },
      request: {
        type: "LaunchRequest"
      }
    };

    return alexaSkill.execute(event).then(reply => {
      expect(reply.response.outputSpeech.ssml).to.equal(
        "<speak>Welcome!</speak>"
      );
    });
  });
});
