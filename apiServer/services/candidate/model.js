const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Phones = new Schema({
  Type: { type: String, required: true },
  'Number': { type: String, required: true }
});

const Emails = new Schema({
  Type: { type: String, required: true },
  address: { type: String, required: true }
});

const Industries = new Schema({
  Category: { type: String, required: true },
  Label: { type: String, required: true }
});

const JobFunctions = new Schema({
  Category: { type: String, required: true },
  Label: { type: String, required: true }
});

const Skills = new Schema({
  Category: { type: String, required: true },
  Label: { type: String, required: true }
});

const candidateModel = new Schema({
  Firstname: { type: String, required: true },
  FirstnameKanji: { type: String },
  Lastname: { type: String, required: true },
  LastnameKanji: { type: String },
  RegistrationDate: { type: Date },
  RoleLevel: { type: String, default: 'Staff' },
  Phones: [Phones],
  Emails: [Emails],
  Industries: [Industries],
  JobFunctions: [JobFunctions],
  Skills: [Skills],
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  createdBy: { type: Date, default: Date.now },
  updatedBy: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Candidate', candidateModel);
