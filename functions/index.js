const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
/* Cannot Send to External Service on Free Plan */

exports.onCandidateCreatedIndex = functions.database.ref('Company/{companyId}')
    .onCreate(event => {
        const original = event.data.val();
        console.log('Index', event.params.companyId, original);
    });

exports.onCandidateupdatedIndex = functions.database.ref('Company/{companyId}')
    .onUpdate(event => {
        const original = event.data.val();
        console.log('Index', event.params.companyId, original);
    });

exports.onCandidateDeletedIndex = functions.database.ref('Company/{companyId}')
    .onDelete(event => {
        const original = event.data.val();
        console.log('Index', event.params.companyId, original);
    });