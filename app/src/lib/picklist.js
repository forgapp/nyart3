import { database } from './firebase';

let cache = {};

export default function getPicklist(type) {
  const cached = cache[type];

  if (cached) {
    return Promise.resolve(cached);
  }

  return database.ref('/Picklists/' + type)
    .once('value')
    .then(snapshot => {
      cache[type] = snapshot.val() || [];
      return cache[type];
    });
}


  /*return auth.authFetch(`/master/picklist?type=${type}`)
    .then(result => {

      return cache.get(result.Type);
    });*/