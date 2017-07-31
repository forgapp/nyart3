import { h, Component } from 'preact';
import { Selectbox } from '../selectbox';
import Lookup from '../lookup';
import { EditLanguages } from '../languages'
import { PhonesEdit } from '../phone'
import { EmailsEdit } from '../emails'

const CandidateInformationEdit = ({ record, handleChange, handleSubmit, handleCancel, handleRecruiterSelect, handleCompanySelect }) => (<form onSubmit={ handleSubmit }>
  <div class="columns">
  <div class="column is-8">

  <h1 class="title">Personal Information</h1>
  <div className="field is-horizontal">
    <div className="field-label is-normal">
      <label className="label">Name</label>
    </div>
    <div className="field-body">
      <div className="field is-grouped">
        <p className="control is-expanded">
          <input id="Firstname" className="input" type="text" placeholder="First name" value={ record.Firstname } onChange={ handleChange } />
        </p>
      </div>
      <div className="field">
        <p className="control is-expanded">
          <input id="Lastname" className="input" type="text" placeholder="Last name" value={ record.Lastname } onChange={ handleChange } />
        </p>
      </div>
    </div>
  </div>

  <div className="field is-horizontal">
    <div className="field-label is-normal">
      <label className="label">Name (Kanji)</label>
    </div>
    <div className="field-body">
      <div className="field is-grouped">
        <p className="control is-expanded">
          <input id="FirstnameKanji" className="input" type="text" placeholder="First name" value={ record.FirstnameKanji } onChange={ handleChange } />
        </p>
      </div>
      <div className="field">
        <p className="control is-expanded">
          <input id="LastnameKanji" className="input" type="text" placeholder="Last name" value={ record.LastnameKanji } onChange={ handleChange } />
        </p>
      </div>
    </div>
  </div>

  <div className="field is-horizontal">
    <div className="field-label is-normal">
      <label className="label">Employment</label>
    </div>
    <div className="field-body">
      <div className="field is-grouped">
        <p className="control is-expanded">
          <input id="JobTitle" className="input" type="text" placeholder="Job Title" value={ record.JobTitle } onChange={ handleChange } />
        </p>
      </div>

      <Lookup
        index="record"
        type="Company"
        placeholder="Company Name"
        formatValue={ (item) => `${item.Name}` }
        handleClick={ handleCompanySelect }
        value={ record.Company.Name }
      />

      <Selectbox id="Level" type='CandidateLevel' value={ record.Level } handleChange={ handleChange } />
    </div>
  </div>

  <div className="field is-horizontal">
    <div className="field-label is-normal">
      <label className="label">Salary</label>
    </div>
    <div className="field-body">
      <div className="field is-grouped">
        <p className="control is-expanded">
          <input id="Salary" className="input" type="number" placeholder="Salary" value={ record.Salary } onChange={ handleChange } />
        </p>
      </div>
    </div>
  </div>

  <div className="field is-horizontal">
    <div className="field-label is-normal">
      <label className="label">Registration</label>
    </div>
    <div className="field-body">
      <Lookup
        index="config"
        type="user"
        placeholder="Recruiter"
        formatValue={ (item) => `${item.Firstname} ${item.Lastname}` }
        handleClick={ handleRecruiterSelect }
        value={ record.Recruiter.Name }
      />
      <div className="field">
        <p className="control is-expanded">
          <input id="RegistrationDate" className="input" type="date" placeholder="Registration Date" value={ record.RegistrationDate } onChange={ handleChange } />
        </p>
      </div>
      <Selectbox id="Source" type='CandidateSource' value={ record.Source } handleChange={ handleChange } />
    </div>
  </div>
    </div>


    <div class="column is-4">
     <h1 class="title">Languages</h1>
      <EditLanguages languages={ record.Languages } handleChange={ handleChange } />
    </div>
  </div>

  <div class="columns">
    <div class="column is-4">
     <h1 class="title">Industries</h1>
    </div>
    <div class="column is-4">
     <h1 class="title">Job Functions</h1>
    </div>
    <div class="column is-4">
     <h1 class="title">Skills</h1>
    </div>
  </div>

  <div class="columns">
    <div class="column is-4">
     <h1 class="title">Phones</h1>
     <PhonesEdit phones={ record.Phones } handleChange={ handleChange } />
    </div>
    <div class="column is-4">
     <h1 class="title">Emails</h1>
     <EmailsEdit emails={ record.Emails } handleChange={ handleChange } />
    </div>
    <div class="column is-4">
     <h1 class="title">Addresses</h1>
    </div>
  </div>

  <div className="field is-horizontal">
    <div className="field-label"></div>
    <div className="field-body">
      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="button is-primary">
            Save
          </button>
        </div>
        <div className="control">
          <button className="button" onClick={ handleCancel }>Cancel</button>
        </div>
      </div>
    </div>
  </div>
</form>);

export default CandidateInformationEdit;
