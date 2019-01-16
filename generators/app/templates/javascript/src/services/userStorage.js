'use strict';

const config = require('../config');
const { DynamoDB } = require('aws-sdk');

class UserStorage {
  constructor() {
    this.docClient = new DynamoDB.DocumentClient();
    this.userTable = config.dynamoDB.tables.users;
  }

  get(user) {
    const id = user.userId;

    return new Promise((resolve, reject) => {
      this.docClient.getItem({
        TableName: this.userTable,
        Key: { id },
      }, (err, item) => {
        if (err) return reject(err);
        return resolve(item.Item);
      });
    });
  }

  put(data) {
    return new Promise((resolve, reject) => {
      this.docClient.putItem({
        TableName: this.userTable,
        Item: data,
      }, (err, item) => {
        if (err) return reject(err);
        return resolve(item);
      });
    });
  }
}

module.exports = UserStorage;
