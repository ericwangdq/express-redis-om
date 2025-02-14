## Redis Cloud:

https://app.redislabs.com/#/profile

https://redis.io/docs/stack/get-started/tutorials/stack-node/

## Redis and Redis OM for Node.js:

https://github.com/redis/node-redis https://www.npmjs.com/package/redis

https://github.com/redis-developer/express-redis-om-workshop

https://github.com/redis/redis-om-node

## Redis Connection Strings

When you open a Redis client, you hand it a URL. The basic format for this URL is:
redis://username:password@host:port

## Connect to Redis with a Client

You connect to Redis using a client. The Client class has methods to open, close, and execute raw commands against Redis.

<code>
import { Client } from 'redis-om'

const client = new Client()
await client.open('redis://localhost:6379')

const aString = await client.execute(['PING'])
// 'PONG'

const aNumber = await client.execute(['HSET', 'foo', 'bar', 'baz', 'qux', 42])
// 2

const anArray = await client.execute(['HGETALL', 'foo'])
// [ 'bar', 'baz', 'qux', '42' ]

await client.close()
</code>

## Redblade ORM

http://redblade.ourjs.com/

<pre>yarn add redblade</pre>

https://github.com/newghost/redblade

https://github.com/newghost/ourjs
