import { h, Component } from 'preact';
import { Selectbox } from '../selectbox';
import Lookup from '../lookup';

const ClientContactAddForm = ({ record, handleChange, handleSubmit, handleCancel, handleRecruiterSelect, handleCompanySelect }) => {
  return (<form onSubmit={ handleSubmit }>
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
        <Selectbox id="Source" type='ClientContactSource' value={ record.Source } handleChange={ handleChange } />
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
};

export default ClientContactAddForm;
