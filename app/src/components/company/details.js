import { h, Component } from 'preact';
import { database } from '../../lib/firebase';
import { Tabs, Pane } from '../tabs';
import { levelTitle } from './style.css';
import Spinner from '../spinner';
import { Link } from 'preact-router';
import { fullwidthTable } from './style.css';
import { PhonesDisplay } from '../phone';
import { EmailsDisplay } from '../emails';
import { AddressesDisplay } from '../addresses';
import { DisplayCodes } from '../codes';
import Notes from '../notes';

import CandidateCard from '../candidate/card';
import ContactCard from '../clientContact/card';
import JobCard from '../job/card';

class CompanyDetails extends Component {
  state = {
    record: null,
    candidates: null,
    contacts: null,
    jobs: null
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { id } = this.props;
    this.recordRef = database.ref('Company/' + id);

    this.candidateRef = database.ref("Candidate")
      .orderByChild("Company/id")
      .equalTo(id);

    this.contactsRef = database.ref("ClientContact")
      .orderByChild("Company/id")
      .equalTo(id);

    this.jobsRef = database.ref("Job")
      .orderByChild("Company/id")
      .equalTo(id);

    this.candidateRef.on("value", (snapshot) => {
      const candidates = snapshot.val() || {};

      this.setState({ candidates });
    });

    this.contactsRef.on("value", (snapshot) => {
      const contacts = snapshot.val() || {};

      this.setState({ contacts });
    });

    this.jobsRef.on("value", (snapshot) => {
      const jobs = snapshot.val() || {};

      this.setState({ jobs });
    });

    this.recordRef.on('value', snapshot => {
      this.setState({ record: snapshot.val() });
    });
  }

  componentWillReceiveProps(nextProps, _) {
    if(nextProps.id !== this.props.id) {
      this.recordRef.off();
      this.recordRef = database.ref('Company/' + nextProps.id);
      this.recordRef.on('value', snapshot => {
        this.setState({ record: snapshot.val() });
      });
    }
  }

  componentWillUnmount() {
    this.recordRef.off();
    this.recordRef = null;
  }

  render({ id }, { record, candidates, contacts, jobs }) {
    if(!record) {
      return (<Spinner />);
    }

    return (<div class="box">
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <div>
              <h3 class={ `title is-3 ${levelTitle}` }>{ record.Name }</h3>
              <h4 class="subtitle is-5">{ record.Type }</h4>
            </div>
          </div>
        </div>

        <div class="level-right">
          <div class="level-item">
            <div class="dropdown is-right is-hoverable">
              <div class="dropdown-trigger">
                <a class="button">
                  <span>Actions</span>
                  <span class="icon is-small">
                    <i class="fa fa-ellipsis-v"></i>
                  </span>
                </a>
              </div>
              <div class="dropdown-menu">
                <div class="dropdown-content">
                  <Link class="dropdown-item" href={ `/edit-info/Company/${id}` }>
                    Edit Information
                  </Link>
                  <Link class="dropdown-item" href={ `/edit/Profile/Company/${id}` }>
                    Edit Company Profile
                  </Link>
                  <a class="dropdown-item is-hidden">
                    Add Candidate
                  </a>
                  <a class="dropdown-item is-hidden">
                    Add Client Contact
                  </a>
                  <a class="dropdown-item is-hidden">
                    Add Job
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Tabs>
        <Pane label="Information">
          <div id="information" class="columns">
            <div class="column">
              <table  class={ fullwidthTable }>
                <tr>
                  <td>RegistrationDate</td>
                  <td>{ record.RegistrationDate }</td>
                </tr>
                <tr>
                  <td>RecruiterName</td>
                  <td>{ record.Recruiter.Name }</td>
                </tr>
                <tr>
                  <td>Source</td>
                  <td>{ record.Source }</td>
                </tr>
              </table>
            </div>
            <div class="column">
              <h1 class="title is-5">Industries</h1>
              <DisplayCodes codes={ record.Industry } />
            </div>
            <div class="column is-3">
              <PhonesDisplay phones={ record.Phones } />
              <EmailsDisplay emails={ record.Emails } />
              <AddressesDisplay addresses={ record.Addresses } />
            </div>
          </div>
          <Notes label="Profile"  markdown={ record.Profile } />
        </Pane>

        <Pane label="Client Contacts">
         { contacts && Object.keys(contacts).map(key => (<div class="column is-3">
              <ContactCard id={ key } record={ contacts[key] } />
            </div>)) }
        </Pane>

        <Pane label="Candidates">
          <div class="columns is-multiline">
            { candidates && Object.keys(candidates).map(key => (<div class="column is-3">
              <CandidateCard id={ key } record={ candidates[key] } />
            </div>)) }
          </div>
        </Pane>

        <Pane label="Jobs">
         { jobs && Object.keys(jobs).map(key => (<div class="column is-3">
              <JobCard id={ key } record={ jobs[key] } />
            </div>)) }
        </Pane>
      </Tabs>
      </div>);
  }
}

export default CompanyDetails;

/*

<Information
            Name={ record.Name }
            Type={ record.Type }
            isSaving={ isSaving }
            updateEntityField={ updateEntityField }
            onSave={ onSave }
            onCancel={ onCancel }
          />
        </div>
        <div className={ classNames('col-xs-6 col-md-12', style.card) }>
          <RegistrationInformation
            RegistrationDate={ record.RegistrationDate }
            RecruiterName={ record.RecruiterName }
            RecruiterId={ record.RecruiterId }
            Source={ record.Source }
            SourceList={ Picklists.CompanySource }
            updateEntityField={ updateEntityField }
            Users={ Users }
            onCancel={ onCancel }
            onSave={ onSave }
          />
        </div>
      </div>
    </div>
    <div className="col-xs-12 col-md-9 mdl-card mdl-shadow--4dp">
      <Tabs selected={ 0 }>
        <Pane label="Information">
          <div className="row">
            <div className="col-xs-6 col-md-6">
              <Codes
                Label="Industries"
                Codes={ record.Industries }
                CodeList={ CodeList.Industry }
                onChange={ handleIndustryChange }
                onCancel={ onCancel }
                onSave={ onSave }
              />
            </div>
            <div className="col-xs-6 col-md-6">
              <Phones phones={ record.Phones } onSave={ savePhones } />
              <Emails emails={ record.Emails } onSave={ saveEmails } />
              <Addresses addresses={ record.Addresses } onSave={ saveAddresses } />
            </div>
          </div>
        </Pane>
        <Pane label="Profile">
          <TextEditor placeholder="Company Profile" onSave={ saveProfile } value={ record.Profile } />
        </Pane>
        <Pane label={ `Candidates (${related.getIn(['Candidate', 'hits', 'total']) || 0})` }>
          <RelatedEntity label="Candidates" entities={ related.get('Candidate') } />
        </Pane>
        <Pane label={ `Contacts (${related.getIn(['ClientContact', 'hits', 'total']) || 0})` }>
          <RelatedEntity label="Client Contacts" entities={ related.get('ClientContact') } />
        </Pane>
        <Pane label={ `Jobs (${related.getIn(['Job', 'hits', 'total']) || 0})` }>
          <RelatedEntity label="Jobs" entities={ related.get('Job') } />
        </Pane>
      </Tabs>
    </div>
  </div>);




*/