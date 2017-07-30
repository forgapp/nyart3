import { auth } from './firebase';

function getToday() {
  const today = new Date();
  const month = ("0" + (today.getMonth() + 1)).slice(-2)
  const day = ("0" + (today.getMonth() + 1)).slice(-2)

  return `${today.getFullYear()}-${month}-${day}`;
}

const companyInput = {
  Name: '',
  Type: 'Target',
  RegistrationDate: getToday(),
  Recruiter: {
    id: auth.currentUser.uid,
    Name: auth.currentUser.displayName
  }
};

const candidateInput = {
  Firstname: '',
  Lastname: '',
  FirstnameKanji: '',
  LastnameKanji: '',
  JobTitle: '',
  Company: {
    id: '',
    Name: ''
  },
  Level: 'Staff',
  RegistrationDate: getToday(),
  Source: '',
  Recruiter: {
    id: auth.currentUser.uid,
    Name: auth.currentUser.displayName
  }
};

const clientContactInput = {
  Firstname: '',
  Lastname: '',
  FirstnameKanji: '',
  LastnameKanji: '',
  JobTitle: '',
  Company: {
    id: '',
    Name: ''
  },
  Level: 'Staff',
  RegistrationDate: getToday(),
  Source: '',
  Recruiter: {
    id: auth.currentUser.uid,
    Name: auth.currentUser.displayName
  }
};

const jobInput = {
  JobTitle: '',
  Headcount: 1,
  Company: {
    id: '',
    Name: ''
  },
  ClientContact: {
    id: '',
    Name: ''
  },
  SalaryMinimun: 0,
  SalaryMaximun: 0,
  RegistrationDate: getToday(),
  Source: '',
  Recruiter: {
    id: auth.currentUser.uid,
    Name: auth.currentUser.displayName
  }
};

export default function getRecordDefaultValue(type) {
  switch (type) {
    case 'Company':
      return companyInput;
    case 'Candidate':
      return candidateInput;
    case 'Client Contact':
      return clientContactInput;
    case 'Job':
      return jobInput;
    default:
      return {};
  }
}