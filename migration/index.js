const fs = require('fs');
const { resolve } = require('path');
const csv = require('csvtojson');
const format = require('date-fns/format');
const firebaseAdmin = require("firebase-admin");
const serviceAccount = require(resolve(__dirname, 'key.json'));

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://nyart-dev-fd843.firebaseio.com/"
});

const Users = require('./lookups/users.json');
const database = firebaseAdmin.database();

console.log('Start Migration');

let companyLookup = {};
let candidateLookup = {};
let jobLookup = {};
let ClientContactLookup = {};
const companyRef = database.ref('Company');
const candidateRef = database.ref('Candidate');
const jobRef = database.ref('Job');
const clientContactRef = database.ref('ClientContact');

csv()
  .fromFile(resolve(__dirname, 'records/company.csv'))
  .on('json', jsonObject => {
    const company = deleteField(['id', 'kind', 'LegacyId', 'CreatedDate', 'UpdatedDate', 'RecruiterId', 'RecruiterName'], jsonObject);

    const companyToMigrate = Object.assign({}, company, {
      RegistrationDate: format(jsonObject.RegistrationDate, 'YYYY-MM-DD'),
      Emails: parseArray('Emails', jsonObject),
      Industry: parseArray('Industry', jsonObject),
      Phones:  parseArray('Phones', jsonObject),
      Addresses: parseArray('Addresses', jsonObject),
      Websites: parseArray('Websites', jsonObject),
      Recruiter: Users[jsonObject.RecruiterId]
    });

    const snapshot = companyRef.push(companyToMigrate);

    companyLookup[jsonObject.id] = {
      id: snapshot.key,
      Name: companyToMigrate.Name
    };
  })
  .on('done', error =>{
    const companyLookupStream = fs.createWriteStream(resolve(__dirname, 'lookups/companies.json'));
    companyLookupStream.write(JSON.stringify(companyLookup, null, 2));
    companyLookupStream.close();
  });





function deleteField(keys, object) {
  const result = Object.assign({}, object);

  if (Array.isArray(keys)) {
    keys.forEach(key => {
      delete result[key];
    });
  } else if (typeof keys === 'string') {
    delete result[keys];
  } else {
    throw new Error('keys should be of type Array or String');
  }

  return result;
}

function parseArray(field, jsonObject) {
  return (jsonObject[field] && jsonObject[field] !== '')
    ? JSON.parse(jsonObject[field])
    : [];
}