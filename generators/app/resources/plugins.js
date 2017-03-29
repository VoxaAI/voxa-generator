'use strict';
let plugins = [
  {
    name: 'autoload',
    usage: 'Voxa.plugins.autoLoad(skill, { adapter });'
  },
  {
    name: 'state-flow',
    usage: 'alexa.plugins.stateFlow.register(skill)'
  },
  {
    name: 'cloud-watch',
    dependencies: 'const AWS = require("aws-sdk");',
    usage: `const cloudWatch = new AWS.CloudWatch({});
    const eventMetric = {
      MetricName: 'Caught Error', // Name of your metric
      Namespace: 'SkillName' // Name of your skill
    };
    
    Voxa.plugins.cloudwatch(skill, cloudWatch, eventMetric);`
  }
];

module.exports = {};
