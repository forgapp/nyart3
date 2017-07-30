import { h, Component } from 'preact';
import { Selectbox } from '../selectbox';
import Lookup from '../lookup';

const CompanyAddForm = ({ record, handleChange, handleRecruiterSelect, handleSubmit, handleCancel }) => {
  return (<form onSubmit={ handleSubmit }>
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">Company</label>
      </div>
      <div className="field-body">
        <div className="field is-grouped">
          <p className="control is-expanded">
            <input id="Name" className="input" type="text" placeholder="Name" value={ record.Name } onChange={ handleChange } />
          </p>
        </div>
        <Selectbox id="Type" type='CompanyType' value={ record.Type } handleChange={ handleChange } />
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
        <Selectbox id="Source" placeholder="Source" type='CompanySource' value={ record.Source } handleChange={ handleChange } />
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

export default CompanyAddForm;