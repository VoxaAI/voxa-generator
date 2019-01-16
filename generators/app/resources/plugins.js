"use strict";

module.exports = [
  {
    name: "autoload",
    dependencies: [
      {
        name: "aws-sdk",
        version: "^2.7.23"
      }
    ],
    config: {
      requires: {
        AWS: "aws-sdk",
        https: "https",
        _: "lodash"
      },
      usage: `AWS.config.update(_.merge({
  maxRetries: 8,
  httpOptions: {
    /**
     * See known issue: https://github.com/aws/aws-sdk-js/issues/862
     */
    timeout: 4000,
    agent: new https.Agent({
      keepAlive: false,
      rejectUnauthorized: true,
      secureProtocol: "TLSv1_method",
      ciphers: "ALL",
    }),
  },
}, configFile.aws));`
    },
    files: ["services/userStorage.js"],
    env: [
      {
        dynamoDB: {
          tables: {
            users: ""
          }
        }
      },
      {
        aws: {
          region: "us-east-1"
        }
      }
    ],
    requires: {
      AWS: "aws-sdk",
      voxa: "voxa",
      UserStorage: "../services/userStorage"
    },
    usage: `  const adapter = new UserStorage();
  voxa.plugins.autoLoad(app, { adapter });`
  },
  {
    name: "state-flow",
    usage: "  voxa.plugins.stateFlow(app);"
  },
  {
    name: "cloud-watch",
    dependencies: [
      {
        name: "aws-sdk",
        version: "^2.7.23"
      }
    ],
    env: [
      {
        aws: {
          region: "us-east-1"
        }
      }
    ],
    requires: {
      AWS: "aws-sdk"
    },
    usage: `  const cloudWatch = new AWS.CloudWatch({});
  const eventMetric = {
    MetricName: "Caught Error", // Name of your metric
    Namespace: "appName" // Name of your app
  };

  voxa.plugins.cloudWatch(app, cloudWatch, eventMetric);`
  }
];
