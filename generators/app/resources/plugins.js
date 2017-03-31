'use strict';
module.exports = [
  {
    name: 'autoload',
    dependencies: [
      {
        name: 'aws-sdk',
        version: '^2.7.23'
      },
      {
        name: 'dynamodb-doc',
        version: '^1.0.0'
      }
    ],
    files: [
      'services/UserStorage.js'
    ],
    env: [
      {
        'dynamoDB' : {
          'tables' : {
            'users' : ''
          }
        }
      },
      {
        'aws' : {
          'region' : 'us-east-1'
        }
      }
    ],
    usage: `const UserStorage = require('../services/userStorage');
const adapter = new UserStorage();
Voxa.plugins.autoLoad(skill, { adapter });`
  },
  {
    name: 'state-flow',
    usage: 'Voxa.plugins.stateFlow(skill);'
  },
  {
    name: 'cloud-watch',
    dependencies: [
      {
        name: 'aws-sdk',
        version: '^2.7.23'
      }
    ],
    env: [
      {
        'aws' : {
          'region' : 'us-east-1'
        }
      }
    ],
    usage: `const AWS = require("aws-sdk");
const cloudWatch = new AWS.CloudWatch({});
const eventMetric = {
  MetricName: 'Caught Error', // Name of your metric
  Namespace: 'SkillName' // Name of your skill
};

Voxa.plugins.cloudWatch(skill, cloudWatch, eventMetric);`
  }
];
