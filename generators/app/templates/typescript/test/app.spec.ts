/* tslint:disable:object-literal-sort-keys */

import { expect } from "chai";
import { alexaSkill } from "../src/app";

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
