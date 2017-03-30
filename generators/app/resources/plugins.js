'use strict';
module.exports = [
  {
    name: 'autoload',
    usage: `const adapter = {};
Voxa.plugins.autoLoad(skill, { adapter });`
  },
  {
    name: 'state-flow',
    usage: 'Voxa.plugins.stateFlow.register(skill);'
  },
  {
    name: 'cloud-watch',
    usage: `const AWS = require("aws-sdk");
const cloudWatch = new AWS.CloudWatch({});
const eventMetric = {
  MetricName: 'Caught Error', // Name of your metric
  Namespace: 'SkillName' // Name of your skill
};

Voxa.plugins.cloudwatch(skill, cloudWatch, eventMetric);`
  }
];
