import config from "../config";
import * as AWS from "aws-sdk'";
import * as DOC from "dynamodb-doc";

export class UserStorage {
  private docClient: DOC.DynamoDB.DocumentClient
  private userTable: string

  constructor() {
    const dynamodb = new AWS.DynamoDB({
      apiVersion: '2012-08-10',
    });
    this.docClient = new DOC.DynamoDB(dynamodb);
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

exports = UserStorage;
