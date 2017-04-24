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
    config: `const AWS = require('aws-sdk');
const https = require('https');
const _ = require('lodash');

AWS.config.update(_.merge({
  maxRetries: 8,
  httpOptions: {
    /**
     * See known issue: https://github.com/aws/aws-sdk-js/issues/862
     */
    timeout: 4000,
    agent: new https.Agent({
      keepAlive: false,
      rejectUnauthorized: true,
      secureProtocol: 'TLSv1_method',
      ciphers: 'ALL',
    }),
  },
}, configFile.aws));`,
    files: [
      'services/userStorage.js'
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
    usage: `const AWS = require('aws-sdk');

const cloudWatch = new AWS.CloudWatch({});
const eventMetric = {
  MetricName: 'Caught Error', // Name of your metric
  Namespace: 'SkillName', // Name of your skill
};

Voxa.plugins.cloudWatch(skill, cloudWatch, eventMetric);`
  }
];
