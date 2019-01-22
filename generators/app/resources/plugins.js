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
