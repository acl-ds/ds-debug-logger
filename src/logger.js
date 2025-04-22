var { status_code } = require('./status_code.json')
 
async function log( payload, es_client, index="ds_internal"){
  
 
  try {
   await es_client.index({
      index,
      type: "_doc",
      body: payload
    })
  } catch (error) {
    console.log(error)
  }
}
 
module.exports = { log } 