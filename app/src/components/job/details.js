import { h, Component } from 'preact';
import { database } from '../../lib/firebase';
import { Tabs, Pane } from '../tabs';
import { levelTitle } from './style.css';
import Spinner from '../spinner';
import { Link } from 'preact-router';
import Notes from '../notes';
import { DisplayLanguages } from '../languages';
import { fullwidthTable } from './style.css';
import { PhonesDisplay } from '../phone';
import { EmailsDisplay } from '../emails';
import { AddressesDisplay } from '../addresses';
import { DisplayCodes } from '../codes';
import Ats from '../ats';

export default class JobDetails extends Component {
  state = {
    record: null,
    ats: null
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { id } = this.props;

    this.recordRef = database.ref('Job')
      .child(id);

    this.recordRef.on('value', snapshot => {
      this.setState({ record: snapshot.val() });
    });

    this.processesRef = database.ref("Process")
      .orderByChild("Job/id")
      .equalTo(id);

    this.processesRef.on('value', snapshot => {
      this.setState({ ats: snapshot.val() });
    });
  }

  componentWillReceiveProps(nextProps, _) {
    if(nextProps.id !== this.props.id) {
      this.recordRef.off();
      this.recordRef = database.ref('Job/' + nextProps.id);
      this.recordRef.on('value', snapshot => {
        this.setState({ record: snapshot.val() });
      });
    }
  }

  componentWillUnmount() {
    this.recordRef.off();
    this.recordRef = null;
  }

  render({ id }, { record, ats }) {
    if(!record) {
      return (<Spinner />);
    }

    return (<div class="box">
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <div>
              <h3 class={ `title is-3 ${levelTitle}` }>{ record.JobTitle }</h3>
              <h4 class="subtitle is-5"><Link href={ `/details/company/${record.Company.id}` }>{ record.Company.Name }</Link> <Link href={ `/details/clientcontact/${record.ClientContact.id}` }>{ record.ClientContact.Name }</Link></h4>
            </div>
          </div>

          <div class="level-item">
            <span>{ record.Nationality }</span>
            <span>{ record.Status }</span>
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
                  <Link class="dropdown-item" href={ `/process/new?job=${id}` }>
                    Apply a candidate
                  </Link>
                  <Link class="dropdown-item" href={ `/edit-info/Job/${id}` }>
                    Edit Information
                  </Link>
                  <Link class="dropdown-item" href={ `/edit/Notes/Job/${id}` }>
                    Edit Notes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <DisplayLanguages languages={ record.Languages } />

      <Tabs>
        <Pane label="Information">

          <div id="information" class="columns">
  <div class="column is-3">
    <table class={ `${fullwidthTable} is-hidden-desktop` }>
      <tr>
        <td>Company</td>
        <td><Link href={ `/details/company/${record.Company.id}` }>{ record.Company.Name }</Link></td>
      </tr>

      <tr>
        <td>Contact</td>
        <td><Link href={ `/details/clientcontact/${record.ClientContact.id}` }>{ record.ClientContact.Name }</Link></td>
      </tr>

      <tr>
        <td>Status</td>
        <td>{ record.Status }</td>
      </tr>
    </table>
    <table class={ fullwidthTable }>
      <tr>
        <td>Salary Range</td>
        <td>{ record.SalaryMinimun } ~ { record.SalaryMaximun }</td>
      </tr>
      <tr>
        <td>Work Location</td>
        <td>{ record.WorkLocation }</td>
      </tr>
    </table>
    <table  class={ fullwidthTable }>
      <tr>
        <td>Registration Date</td>
        <td>{ record.RegistrationDate }</td>
      </tr>
      <tr>
        <td>Recruiter</td>
        <td>{ record.Recruiter.Name }</td>
      </tr>
      <tr>
        <td>Source</td>
        <td>{ record.Source }</td>
      </tr>
    </table>
  </div>

  <div class="column">
    <div class="columns is-desktop">
      <div class="column">
        <h1 class="title is-5">Industries</h1>
        <DisplayCodes codes={ record.Industry } />
      </div>
      <div class="column">
        <h1 class="title is-5">Job Functions</h1>
        <DisplayCodes codes={ record.JobFunction } />
      </div>
      <div class="column">
        <h1 class="title is-5">Skills</h1>
      </div>
    </div>
  </div>

  <div class="column is-3 is-hidden">
    ClientContact Information
  </div>
</div>



          <Notes label="Notes"  markdown={ record.Notes } />
        </Pane>
        <Pane label="ATS">
          { ats && Object.keys(ats).map(key => {
              const process = ats[key];
              return (<Ats id={ key } process={ process } type="Candidate" />)
            })
          }
        </Pane>
      </Tabs>





      </div>);
  }
}

/*
Title={ Title }
        CompanyId={ CompanyId }
        CompanyName={  }
        ClientContactId={ ClientContactId }
        ClientContactName={ ClientContactName }
*/