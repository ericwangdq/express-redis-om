// import redblade from '../om/redblabe'
// import client from '../om/client.js'
// import redblade from "redblade";
import "dotenv/config";
import express, { json } from "express";
import { createClient } from "redis";
import { Router } from "express";

console.log(`REDIS_URL is ${process.env.REDIS_URL}`);

const client = createClient({
  url: process.env.REDIS_URL, // 'redis://alice:foobared@awesome.redis.server:6380'
});

await client.connect();
// await client.hSet('key', 'field', 'value');
// await client.set('key', 'value');

// const anotherValue = await client.get("another-key");
// console.log(`get value from redis ${anotherValue}`);

client.on("error", (err) => {
  console.log("Redis Client Error", err);
});

//schema is optional
// redblade.init({ client: client }, function (err) {
//   console.log(`redblade error is ${err}`);
// });

/* create an express app and use JSON */
const app = new express();
app.use(express.json());

const playRouter = Router();
app.use("/echo", (req, res) => {
  console.log(`API echo req ${req}`);
  res.send({
    message: `API echo calling`,
    timestamp: `${new Date()}`,
  });
});
app.use("/redis", playRouter);

playRouter.post("/object/:key", async (req, res) => {
  const key = req.params.key;
  console.log(`body is ${req.body}`);
  const value =
    (typeof req.body).toLowerCase() === "object"
      ? JSON.stringify(req.body)
      : req.body;
  console.log(`Set object key req: ${key}`);
  console.log(`Set object value: ${value}`);
  let result = null;
  let message = "";
  try {
    result = await client.set(key, value);
    message = `Set object key ${key}, value is ${value}, timestamp is ${new Date()}`;
    console.log(message);
  } catch (err) {
    message = `Set object key ${key} - ${err} , value is ${value}, timestamp is ${new Date()}`;
    console.error(message);
    res.send({ message });
  }

  res.send({ key: key, value: value });
});

playRouter.get("/object/:key", async (req, res) => {
  const key = req.params.key;
  console.log(`Get object key req: ${key}`);
  let value = null;
  let message = "";
  try {
    value = await client.get(key);
    message = `Get object key ${key} successfully, value is ${value}, timestamp is ${new Date()}`;
    console.log(message);
  } catch (err) {
    message = `Get object key ${key} - ${err}, timestamp is ${new Date()}`;
    console.error(message);
    res.send({ message });
  }

  res.send({ key, value });
});

playRouter.get("/open", async (req, res) => {
  let result = null;
  let message = "";
  try {
    result = await client.connect();
    message = `Redis client open successfully, result is ${result}, timestamp is ${new Date()}`;
    console.log(message);
  } catch (err) {
    message = `Redis client open - ${err} , result is ${result}, timestamp is ${new Date()}`;
    console.error(message);
  }

  res.send({ message: message });
});

playRouter.get("/close", async (req, res) => {
  let result = null;
  let message = "";
  try {
    result = await client.disconnect();
    message = `Redis client close successfully, result is ${result}, timestamp is ${new Date()}`;
    console.log(message);
  } catch (err) {
    message = `Redis client close - ${err} , result is ${result}, timestamp is ${new Date()}`;
    console.error(message);
  }

  res.send({ message: message });
});

/* start the server */
app.listen(3001);
