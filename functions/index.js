const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fetch = require('node-fetch');

admin.initializeApp(functions.config().firebase);
/* Cannot Send to External Service on Free Plan */

exports.onCompanyCreatedIndex = functions.database
    .ref('Company/{companyId}')
    .onCreate(event => {
        const original = event.data.val();
        const id = event.params.companyId;

        fetch(`https://fc385d12916b5aba21876096cc99cd3b.ap-northeast-1.aws.found.io:9243/record/Company/${id}`, {
            method: 'PUT', 
            body: JSON.stringify(original), 
            headers: { 'Authorization': 'Basic bnlhcnRVc2VyOlczbGNvbWUh' }
        }).then(response => response.json())
        .then(response => console.log(response))
        .catch(error => console.log(error))
    });

exports.onCompanyupdatedIndex = functions.database.ref('Company/{companyId}')
    .onUpdate(event => {
        const original = event.data.val();
        console.log('Index', event.params.companyId, original);
    });

exports.onCompanyDeletedIndex = functions.database.ref('Company/{companyId}')
    .onDelete(event => {
        const original = event.data.val();
        console.log('Index', event.params.companyId, original);
    });