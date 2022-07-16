import { Client } from 'redis-om'

/* pulls the Redis URL from .env */
const url = process.env.REDIS_URL

console.log(`REDIS_URL is ${process.env.REDIS_URL}`)

/* create and open the Redis OM Client */
const client = await new Client().open(url)

/* create and open the Redis OM Client */
// const client = new Client()
// await client.open(url)


const aString = await client.execute(['PING'])
// 'PONG'
console.log(`aString is ${aString}`);

const aNumber = await client.execute(['HSET', 'foo', 'bar', 'baz', 'qux', 42])
// 2
console.log(`aNumber is ${aNumber}`);

const anArray = await client.execute(['HGETALL', 'foo'])
// [ 'bar', 'baz', 'qux', '42' ]
console.log(`anArray is ${anArray}`);

// await client.close()

export default client