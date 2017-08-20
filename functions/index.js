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
  const elasticUrl = functions.config().elastic.url;
  const elasticKey = functions.config().elastic.key;

  return fetch(`${elasticUrl}/record/${type}/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Basic ${elasticKey}` }
  }).then(response => response.json())
  .then(response => console.log(response))
  .catch(error => console.log(error));
}

function indexProcess(type, id, record, parentId) {
  const elasticUrl = functions.config().elastic.url;
  const elasticKey = functions.config().elastic.key;
  const parentClause = parentId ? `?parent=${parentId}` : ''

  return fetch(`${elasticUrl}/process/${type}/${id}${parentClause}`, {
    method: 'PUT',
    body: JSON.stringify(record),
    headers: { 'Authorization': `Basic ${elasticKey}` }
  }).then(response => response.json())
  .then(response => console.log(response))
  .catch(error => console.log(error));
}

function deleteProcess(type, id) {
  const elasticUrl = functions.config().elastic.url;
  const elasticKey = functions.config().elastic.key;

  return fetch(`${elasticUrl}/process/${type}/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Basic ${elasticKey}` }
  }).then(response => response.json())
  .then(response => console.log(response))
  .catch(error => console.log(error));
}

function getCurrentStage(process) {
  if(process.Placement) {
    return 'Placement';
  } else if (process.Offer) {
    return 'Offer';
  } else if (process.CCM) {
    return 'CCM';
  } else if (process.Submittal) {
    return 'Submittal';
  } else if (process.Application) {
    return 'Application';
  }
}

exports.onCompanyCreatedIndex = functions.database
  .ref('Company/{companyId}')
  .onCreate(event => {
    const original = event.data.val();
    const id = event.params.companyId;

    indexRecord('Company', id, original);
  });

exports.onCompanyupdatedIndex = functions.database.ref('Company/{companyId}')
    .onUpdate(event => {
        const original = event.data.val();
        const id = event.params.companyId;

        indexRecord('Company', id, original);
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


exports.onProcessRejected = functions.database
  .ref('Process/{processId}/IsRejected')
  .onWrite(event => {
    const processId = event.params.processId;
    const processRef = event.data.ref.parent;

    return processRef.once('value').then(snapshot => {
      let process = snapshot.val();
      const currentStage = getCurrentStage(process);
      const currentStageDate = process[currentStage].StageDate;
      delete process.Application;
      delete process.Submittal;
      delete process.CCM;
      delete process.Offer;
      delete process.Placement;

      const processToIndex = Object.assign({
        CurrentStage: currentStage,
        CurrentStageDate: currentStageDate
      }, process)

      return indexProcess('metadata', processId, processToIndex, null)
        .then(() => { console.log('Done')});
    });
  });

exports.onApplicationCreated = functions.database
  .ref('Process/{processId}/Application')
  .onCreate(event => {
    const processId = event.params.processId;
    const application = event.data.val();
    const processRef = event.data.ref.parent;

    return processRef.once('value').then(snapshot => {
      let process = snapshot.val();
      delete process.Application;

      const processToIndex = Object.assign({
        CurrentStage: 'Application',
        CurrentStageDate: application.StageDate
      }, process);

      return indexProcess('metadata', processId, processToIndex)
        .then(() => {
          return indexProcess('application', `app${processId}`, application, processId)
          .then(() => { console.log('Done') });
        });
    });
  });

exports.onSubmittalCreated = functions.database
  .ref('Process/{processId}/Submittal')
  .onCreate(event => {
    const processId = event.params.processId;
    const submittal = event.data.val();
    const processRef = event.data.ref.parent;

    return processRef.once('value').then(snapshot => {
      let process = snapshot.val();
      delete process.Application;
      delete process.Submittal;

      const processToIndex = Object.assign({
        CurrentStage: 'Submittal',
        CurrentStageDate: submittal.StageDate
      }, process);

      return Promise.all([
        indexProcess('metadata', processId, processToIndex),
        indexProcess('submittal', `sub${processId}`, submittal, processId)
      ]).then(() => { console.log('Done') });
    });
  });

exports.onCCMCreated = functions.database
  .ref('Process/{processId}/CCM/{ccmId}')
  .onCreate(event => {
    const processId = event.params.processId;
    const ccmId = event.params.ccmId;
    const ccm = event.data.val();
    const processRef = event.data.ref.parent.ref.parent;

    return processRef.once('value').then(snapshot => {
      let process = snapshot.val();
      delete process.Application;
      delete process.Submittal;
      delete process.CCM;

      const processToIndex = Object.assign({
        CurrentStage: ccm.Number === 1 ? 'CCM1' : 'CCM2+',
        CurrentStageDate: ccm.StageDate
      }, process);

      return Promise.all([
        indexProcess('metadata', processId, processToIndex),
        indexProcess(ccm.Number === 1 ? 'ccm1' : 'ccm', `ccm${ccmId}`, ccm, processId)
      ]).then(() => { console.log('Done') });
    });
  });

exports.onOfferCreated = functions.database
  .ref('Process/{processId}/Offer')
  .onCreate(event => {
    const processId = event.params.processId;
    const offer = event.data.val();
    const processRef = event.data.ref.parent;

    return processRef.once('value').then(snapshot => {
      let process = snapshot.val();
      delete process.Application;
      delete process.Submittal;
      delete process.CCM;
      delete process.Offer;

      const processToIndex = Object.assign({
        CurrentStage: 'Offer',
        CurrentStageDate: offer.StageDate
      }, process);

      return Promise.all([
        indexProcess('metadata', processId, processToIndex),
        indexProcess('offer', `off${processId}`, offer, processId)
      ]).then(() => { console.log('Done') });
    });
  });

exports.onPlacementCreated = functions.database
  .ref('Process/{processId}/Placement')
  .onCreate(event => {
    const processId = event.params.processId;
    const placement = event.data.val();
    const processRef = event.data.ref.parent;

    return processRef.once('value').then(snapshot => {
      let process = snapshot.val();
      delete process.Application;
      delete process.Submittal;
      delete process.CCM;
      delete process.Offer;
      delete process.Placement;

      const processToIndex = Object.assign({
        CurrentStage: 'Placement',
        CurrentStageDate: placement.StageDate
      }, process);

      return Promise.all([
        indexProcess('metadata', processId, processToIndex),
        indexProcess('placement', `off${processId}`, placement, processId)
      ]).then(() => { console.log('Done') });
    });
  });

exports.onUserChanged = functions.database
  .ref('Users/{userId}/Profile')
  .onWrite(event => {
    const userId = event.params.userId;
    const elasticUrl = functions.config().elastic.url;
    const elasticKey = functions.config().elastic.key;
    const profile = event.data.val();
    const updateAuthUser = () => admin.auth().updateUser(userId, {
      displayName: `${profile.Firstname} ${profile.Lastname}`,
    });
    const indexUser = () => fetch(`${elasticUrl}/config/user/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(profile),
      headers: { 'Authorization': `Basic ${elasticKey}` }
    });

    return Promise.all([
      updateAuthUser(),
      indexUser()
    ]).then(function(userRecord) {
      console.log("Successfully updated user");
    })
    .catch(function(error) {
      console.log("Error updating user:", error);
    });
  })

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
          return Promise.all([
            fetch(`${elasticUrl}/_xpack/security/user/${user.Profile.Username}`, {
              method: 'POST',
              body: JSON.stringify(elaticUser),
              headers: { 'Authorization': `Basic ${elasticKey}` }
            }),
            fetch(`${elasticUrl}/config/user/${userId}`, {
              method: 'PUT',
              body: JSON.stringify(user.Profile),
              headers: { 'Authorization': `Basic ${elasticKey}` }
            })
          ]).then(response => {
            userPermissionsRef
              .child('elasticKey')
              .set(Buffer.from(`${user.Profile.Username}:${pwd}`).toString('base64'));
          })
          .catch(error => console.log(error));
        } else {
          return Promise.all([
            fetch(`${elasticUrl}/_xpack/security/user/${user.Profile.Username}`, {
              method: 'DELETE',
              headers: { 'Authorization': `Basic ${elasticKey}` }
            }),
            fetch(`${elasticUrl}/config/user/${userId}`, {
              method: 'DELETE',
              headers: { 'Authorization': `Basic ${elasticKey}` }
            })
          ]).then(response => {
            userPermissionsRef
              .child('elasticKey')
              .remove();
          })
          .catch(error => console.log(error));
        }
      });
  });
