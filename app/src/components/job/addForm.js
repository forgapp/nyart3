import { h, Component } from 'preact';
import { Selectbox } from '../selectbox';
import Lookup from '../lookup';
import CompanyContactLookup from './companyContactLookup';

const JobAddForm = ({ record, handleChange, handleSubmit, handleCancel, handleRecruiterSelect, handleCompanySelect, handleClientContactSelect }) => {
  return (<form onSubmit={ handleSubmit }>
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">Position</label>
      </div>
      <div className="field-body">
        <div className="field is-grouped">
          <p className="control is-expanded">
            <input id="JobTitle" className="input" type="text" placeholder="Job Title" value={ record.JobTitle } onChange={ handleChange } />
          </p>
        </div>
        <div className="field">
          <p className="control is-expanded">
            <input id="Headcount" className="input" type="number" placeholder="Headcount" value={ record.Headcount } onChange={ handleChange } />
          </p>
        </div>
      </div>
    </div>

    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">Employer</label>
      </div>
      <CompanyContactLookup
        company={ record.Company }
        contact={ record.ClientContact }
        handleCompanySelect={ handleCompanySelect }
        handleContactSelect={ handleClientContactSelect }
      />
    </div>

    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">Salary</label>
      </div>
      <div className="field-body">
        <div className="field is-grouped">
          <p className="control is-expanded">
            <input id="SalaryMinimun" className="input" type="number" placeholder="Minimum" value={ record.SalaryMinimun } onChange={ handleChange } />
          </p>
        </div>
        <div className="field">
          <p className="control is-expanded">
            <input id="SalaryMaximun" className="input" type="number" placeholder="Maximum" value={ record.SalaryMaximun } onChange={ handleChange } />
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
            <input id="RegistrationDate" className="input" type="date" placeholder="Date" value={ record.RegistrationDate } onChange={ handleChange } />
          </p>
        </div>
        <Selectbox id="Source" type='JobSource' value={ record.Source } handleChange={ handleChange } />
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

export default JobAddForm;
