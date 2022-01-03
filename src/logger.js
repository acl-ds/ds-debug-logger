var { status_code } = require('./status_code.json')

function log( userSession, params, es_client, index="ds_internal"){
  const { status , message, type, mod="general" } = params

  const insert_obj = {
    '@timestamp': new Date().toISOString(),
    status_code: status_code[status],
    message: message,
    type: type || 'info',
    module: mod,
    userId: userSession.id || 1,
    tenant: userSession.customerId || '00000000-0000-0000-0000-000000000000',
  }

  try {
    es_client.index({
      index,
      type: "_doc",
      body: insert_obj
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = { log }