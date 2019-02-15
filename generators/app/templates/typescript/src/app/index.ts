import * as Raven from "raven"; // Official `raven` module
import * as RavenLambdaWrapper from "serverless-sentry-lib";
import { VoxaApp, AlexaPlatform, DialogFlowPlatform as DialogflowPlatform } from "voxa";
import * as main from "./main";
import * as alexaStates from "./states/alexa.states";
import * as dialogflowStates from "./states/dialogflow.states";
import * as variables from "./variables";
import views from "./views";

const app = new VoxaApp({ variables, views });

main.register(app);

// alexa
export const alexaSkill = new AlexaPlatform(app);
alexaStates.register(alexaSkill);
export const alexa = RavenLambdaWrapper.handler(Raven, alexaSkill.lambda());

// dialogflow
export const dialogflowAction = new DialogflowPlatform(app);
dialogflowStates.register(dialogflowAction);
export const dialogflow = RavenLambdaWrapper.handler(
  Raven,
  dialogflowAction.lambdaHTTP()
);
