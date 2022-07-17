

import client from './client.js'

//schema is optional
// redblade.init({ schema:'/path/to/your/schema/folder',  client: client }, function(err) {
// })
export const redblade = require('redblade');

//schema is optional
redblade.init({ client: client }, function(err) {
    console.log(`redblade error is ${err}`);
})