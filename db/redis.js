const redis = require("redis");

const client = redis.createClient(
    {   
        legacyMode : true
    }
);

client.on('error', (err) => console.log('Redis Client Error', err));
client.on('ready', () => console.log("Redis Ready"));

client.connect();

module.exports = client;

