"use strict";

const app = require("../app");
const expect = require("chai").expect;

describe("App", () => {
  it("should reply with Intent.Launch", () => {
    const event = {
      session: {
        application: {
          applicationId: "",
        },
      },
      request: {
        type: "LaunchRequest",
      },
    };

    return app.execute(event)
      .then((reply) => {
        expect(reply.toJSON().response.outputSpeech.ssml).to.equal("<speak>Welcome!</speak>");
      });
  });
});
