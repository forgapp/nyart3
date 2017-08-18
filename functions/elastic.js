const fetch = require('node-fetch');

export function indexRecord(record, config) {
  const elasticUrl = config.url;
  const elasticKey = config.key;

  return fetch(`${elasticUrl}/record/${config.type}/${config.id}`, {
    method: 'PUT',
    body: JSON.stringify(record),
    headers: { 'Authorization': `Basic ${elasticKey}` }
  }).then(response => response.json())
  .then(response => console.log(response))
  .catch(error => console.log(error));
}

export function deleteIndex(config) {
  const elasticUrl = config.url;
  const elasticKey = config.key;

  return fetch(`${elasticUrl}/record/${config.type}/${config.id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Basic ${elasticKey}` }
  }).then(response => response.json())
  .then(response => console.log(response))
  .catch(error => console.log(error));
}

module.exports = {
  index: indexRecord,
  delete: deleteIndex
};
