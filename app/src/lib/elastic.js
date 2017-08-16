import { auth, database } from './firebase';

let key = null;

function getKey() {
  if (key) {
    return Promise.resolve(key);
  }

  return database.ref('Users')
  .child(auth.currentUser.uid)
  .child('Permissions')
  .child('elasticKey')
  .once('value')
  .then(snapshot => {
    key = snapshot.val();

    return key;
  });
}

class Elastic {
  constructor() {
    this.baseUrl = process.env.ELASTIC_URL || '';
  }

  setIndex(index) {
    this.index = index;
    return this;
  }

  setType(type) {
    this.type = type;
    return this;
  }

  query(queryString) {
    this.queryString = queryString;
    return this;
  }

  size(sizeLimit) {
    this.sizeLimit = sizeLimit;
    return this;
  }

  search() {
    const { index, type, sizeLimit, queryString } = this;
    const saneIndex = index ? index + '/' : '';
    const saneType = type ? type + '/' : '';
    const sizeClause = sizeLimit ? `&size=${sizeLimit}` : ''

    return fetch(`${this.baseUrl}/${saneIndex}${saneType}_search?q=${queryString}${sizeClause}`, {
      headers: {
        'Authorization': `Basic ${key}`
      }
    }).then(res => res.json());
  }

  async searchWithBody() {
    const elasticKey = await getKey();
    const { index, type } = this;
    const saneIndex = index ? index + '/' : '';
    const saneType = type ? type + '/' : '';
    const results = fetch(`${this.baseUrl}/${saneIndex}${saneType}_search`, {
      method: 'POST',
      body: JSON.stringify(this.queryString),
      headers: {
        'Authorization': `Basic ${elasticKey}`,
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());

    return results;
  }
}

export default Elastic;
