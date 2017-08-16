const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fetch = require('node-fetch');
const uid = require('uid');

admin.initializeApp(functions.config().firebase);

function indexRecord(type, id, record) {
  const elasticUrl = functions.config().elastic.url;
  const elasticKey = functions.config().elastic.key;

  return fetch(`${elasticUrl}/record/${type}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(record),
    headers: { 'Authorization': `Basic ${elasticKey}` }
  }).then(response => response.json())
  .then(response => console.log(response))
  .catch(error => console.log(error));
}

function deleteIndex(type, id) {
  return fetch(`${elasticUrl}/record/${type}/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Basic ${elasticKey}` }
  }).then(response => response.json())
  .then(response => console.log(response))
  .catch(error => console.log(error));
}

exports.onCompanyCreatedIndex = functions.database
  .ref('Company/{companyId}')
  .onCreate(event => {
    const original = event.data.val();
    const id = event.params.companyId;

    indexRecord('Company', id, original)
  });

exports.onCompanyupdatedIndex = functions.database.ref('Company/{companyId}')
    .onUpdate(event => {
        const original = event.data.val();
        const id = event.params.companyId;

        indexRecord('Company', id, original)
    });

exports.onCompanyDeletedIndex = functions.database.ref('Company/{companyId}')
  .onDelete(event => {
      const id = event.params.companyId;

      deleteIndex('Company', id);
  });

exports.onCandidateCreatedIndex = functions.database
  .ref('Candidate/{candidateId}')
  .onCreate(event => {
    const original = event.data.val();
    const id = event.params.candidateId;

    indexRecord('Candidate', id, original);
  });

exports.onCandidateUpdatedIndex = functions.database
  .ref('Candidate/{candidateId}')
  .onUpdate(event => {
    const original = event.data.val();
    const id = event.params.candidateId;

    indexRecord('Candidate', id, original);
  });

exports.onCandidateDeletedIndex = functions.database
  .ref('Candidate/{candidateId}')
  .onDelete(event => {
    const id = event.params.candidateId;

    deleteIndex('Candidate', id);
  });

exports.onClientContactCreatedIndex = functions.database
  .ref('ClientContact/{clientContactId}')
  .onCreate(event => {
    const original = event.data.val();
    const id = event.params.clientContactId;

    indexRecord('ClientContact', id, original);
  });

exports.onClientContactUpdatedIndex = functions.database
  .ref('ClientContact/{clientContactId}')
  .onUpdate(event => {
    const original = event.data.val();
    const id = event.params.clientContactId;

    indexRecord('ClientContact', id, original);
  });

exports.onClientContactDeletedIndex = functions.database
  .ref('ClientContact/{clientContactId}')
  .onDelete(event => {
    const id = event.params.clientContactId;

    deleteIndex('ClientContact', id);
  });

exports.onJobCreatedIndex = functions.database
  .ref('Job/{jobId}')
  .onCreate(event => {
    const original = event.data.val();
    const id = event.params.jobId;

    indexRecord('Job', id, original);
  });

exports.onJobUpdatedIndex = functions.database
  .ref('Job/{jobId}')
  .onUpdate(event => {
    const original = event.data.val();
    const id = event.params.jobId;

    indexRecord('Job', id, original);
  });

exports.onJobDeletedIndex = functions.database
  .ref('Job/{jobId}')
  .onDelete(event => {
    const id = event.params.jobId;

    deleteIndex('Job', id);
  });

exports.onUserCreated = functions.auth.user()
  .onCreate(event => {
    const user = event.data;
    
    return admin.database()
      .ref("/Users")
      .child(user.uid)
      .set({
        Profile: {
          Lastname: '',
          Firstname: ''
        },
        Permissions: {
          Administrator: false,
          Authorized: false
        }
      });
  });

exports.onUserDeleted = functions.auth.user()
  .onDelete(event => {
    const user = event.data;
    
    return admin.database()
      .ref("/Users")
      .child(user.uid)
      .remove();
  });

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

exports.onUserAuthorized = functions.database
  .ref('Users/{userId}/Permissions/Authorized')
  .onWrite(event => {
    const userId = event.params.userId;
    const isAuthorized = event.data.val();
    const userPermissionsRef = event.data.ref.parent;   
    
    return admin.database()
      .ref("Users")
      .child(userId)
      .once('value').then(snapshot => {
        const user = snapshot.val();
        const elasticUrl = functions.config().elastic.url;
        const elasticKey = functions.config().elastic.key;
        const pwd = uid(20);
        const elaticUser = {
          password: pwd,
          roles: ["nyart_user"],
          full_name: `${user.Profile.Firstname} ${user.Profile.Lastname}`
        };
        
        if (isAuthorized) {
          return fetch(`${elasticUrl}/_xpack/security/user/${user.Profile.Username}`, {
            method: 'POST',
            body: JSON.stringify(elaticUser),
            headers: { 'Authorization': `Basic ${elasticKey}` }
          })
          .then(response => {
            userPermissionsRef
              .child('elasticKey')
              .set(Buffer.from(`${user.Profile.Username}:${pwd}`).toString('base64'));
          })
          .catch(error => console.log(error));
        } else {
          return fetch(`${elasticUrl}/_xpack/security/user/${user.Profile.Username}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Basic ${elasticKey}` }
          })
          .then(response => {
            userPermissionsRef
              .child('elasticKey')
              .remove();
          })
          .catch(error => console.log(error));
        }
      })
  });
