import config from "../config";
import { DynamoDB } from "aws-sdk'";

export class UserStorage {
  private docClient: DynamoDB.DocumentClient
  private userTable: string

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

exports = UserStorage;
