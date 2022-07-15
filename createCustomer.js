"use strict";
const AWS = require("aws-sdk");

module.exports.createCustomer = async (event) => {
  // eventデータの読み取り
  const body = JSON.parse(Buffer.from(event.body, "base64").toString());
  // dynamoDBへの接続のセットアップ
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  // テーブルに入れたいデータを設定
  const putParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE, // 環境変数を利用してテーブル名を指定
    Item: {
      primary_key: body.name,
      email: body.email,
    },
  };
  // dynamoDbのオブジェクトを使用してデータを保存
  await dynamoDb.put(putParams).promise();

  // 成功ステータスを返す
  return {
    statusCode: 201,
  };
};
