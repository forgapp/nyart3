const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fetch = require('node-fetch');

admin.initializeApp(functions.config().firebase);
/* Cannot Send to External Service on Free Plan */


// function indexRecord(type, id, record) {
//   return fetch(`https://fc385d12916b5aba21876096cc99cd3b.ap-northeast-1.aws.found.io:9243/record/${type}/${id}`, {
//     method: 'PUT',
//     body: JSON.stringify(record),
//     headers: { 'Authorization': 'Basic bnlhcnRVc2VyOlczbGNvbWUh' }
//   }).then(response => response.json())
//   .then(response => console.log(response))
//   .catch(error => console.log(error));
// }

// function deleteIndex(type, id) {
//   return fetch(`https://fc385d12916b5aba21876096cc99cd3b.ap-northeast-1.aws.found.io:9243/record/${type}/${id}`, {
//     method: 'DELETE',
//     headers: { 'Authorization': 'Basic bnlhcnRVc2VyOlczbGNvbWUh' }
//   }).then(response => response.json())
//   .then(response => console.log(response))
//   .catch(error => console.log(error));
// }

// exports.onCompanyCreatedIndex = functions.database
//   .ref('Company/{companyId}')
//   .onCreate(event => {
//     const original = event.data.val();
//     const id = event.params.companyId;

//     indexRecord('Company', id, original)
//   });

// exports.onCompanyupdatedIndex = functions.database.ref('Company/{companyId}')
//     .onUpdate(event => {
//         const original = event.data.val();
//         const id = event.params.companyId;

//         fetch(`https://fc385d12916b5aba21876096cc99cd3b.ap-northeast-1.aws.found.io:9243/record/Company/${id}`, {
//             method: 'PUT',
//             body: JSON.stringify(original),
//             headers: { 'Authorization': 'Basic bnlhcnRVc2VyOlczbGNvbWUh' }
//         }).then(response => response.json())
//         .then(response => console.log(response))
//         .catch(error => console.log(error));
//     });

// exports.onCompanyDeletedIndex = functions.database.ref('Company/{companyId}')
//     .onDelete(event => {
//         const id = event.params.companyId;

//         fetch(`https://fc385d12916b5aba21876096cc99cd3b.ap-northeast-1.aws.found.io:9243/record/Company/${id}`, {
//             method: 'DELETE',
//             headers: { 'Authorization': 'Basic bnlhcnRVc2VyOlczbGNvbWUh' }
//         }).then(response => response.json())
//         .then(response => console.log(response))
//         .catch(error => console.log(error));
//     });

// exports.onCandidateCreatedIndex = functions.database
//   .ref('Candidate/{candidateId}')
//   .onCreate(event => {
//     const original = event.data.val();
//     const id = event.params.candidateId;

//     indexRecord('Candidate', id, original);
//   });

// exports.onCandidateUpdatedIndex = functions.database
//   .ref('Candidate/{candidateId}')
//   .onUpdate(event => {
//     const original = event.data.val();
//     const id = event.params.candidateId;

//     indexRecord('Candidate', id, original);
//   });

// exports.onCandidateDeletedIndex = functions.database
//   .ref('Candidate/{candidateId}')
//   .onDelete(event => {
//     const id = event.params.candidateId;

//     deleteIndex('Candidate', id);
//   });


exports.onApplicationCreated = functions.database
  .ref('Process/{processId}/Application')
  .onCreate(event => {
    return event.data.ref
      .parent
      .child('CurrentStage')
      .set('Application');
  });

exports.onSubmittalCreated = functions.database
  .ref('Process/{processId}/Submittal')
  .onCreate(event => {
    return event.data.ref
      .parent
      .child('CurrentStage')
      .set('Submittal');
  });