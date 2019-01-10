function getEnv() {
  if (process.env.NODE_ENV) {
    return process.env.NODE_ENV;
  }

  // Environment base on lambda function name
  // TODO: put your own lambda function name(s) here
  const AWS_LAMBDA_PRODUCTION_ENV: Array<string> = [""]; // production
  const AWS_LAMBDA_FUNCTION_NAME = process.env.AWS_LAMBDA_FUNCTION_NAME;
  if (AWS_LAMBDA_FUNCTION_NAME) {
    return AWS_LAMBDA_PRODUCTION_ENV.indexOf(AWS_LAMBDA_FUNCTION_NAME) !== -1
      ? "production"
      : "staging";
  }

  return "local";
}

export default getEnv();
