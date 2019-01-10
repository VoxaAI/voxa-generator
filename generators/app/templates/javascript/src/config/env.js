"use strict";

function getEnv() {
  if (process.env.NODE_ENV) {
    return process.env.NODE_ENV;
  }

  // Environment base on lambda function name
  // TODO: put your own lambda function name(s) here
  const AWS_LAMBDA_PRODUCTION_ENV = ['']; // production
  const AWS_LAMBDA_FUNCTION_NAME = process.env.AWS_LAMBDA_FUNCTION_NAME;
  if (AWS_LAMBDA_FUNCTION_NAME) {
    return AWS_LAMBDA_PRODUCTION_ENV.includes(AWS_LAMBDA_FUNCTION_NAME) ? "production" : "staging";
  }

  return "local";
}

module.exports = getEnv();
