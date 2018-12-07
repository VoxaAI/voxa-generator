import * as Raven from "raven"; // Official `raven` module
import * as RavenLambdaWrapper from "serverless-sentry-lib";
import * as voxa from "voxa";
import * as alexaStates from "./states/alexa.states";
import * as dialogflowStates from "./states/dialogflow.states";
import * as variables from "./variables";
import * as views from "./views";
import * as main from "./main";

const app = new voxa.VoxaApp({ variables, views });

main.register(app);

// alexa
export const alexaSkill = new voxa.AlexaPlatform(app);
alexaStates.register(alexaSkill);
export const alexa = RavenLambdaWrapper.handler(Raven, alexaSkill.lambda());

// dialogFlow
export const dialogflowAction = new voxa.DialogFlowPlatform(app);
dialogflowStates.register(dialogflowAction);
export const dialogflow = RavenLambdaWrapper.handler(
  Raven,
  dialogflowAction.lambdaHTTP()
);
