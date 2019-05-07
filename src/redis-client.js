import redis from "redis";
import { promisify } from "util";
let client;
try {
  client = redis.createClient(6379, process.env.REDIS_HOST);
  client.on("error", function (err) {
    console.log("Error " + err);
 });
} catch (err) {
  console.log(error);
}

export default {
  ...client,
  getAsync: promisify(client.get).bind(client),
  setAsync: promisify(client.set).bind(client)
};
