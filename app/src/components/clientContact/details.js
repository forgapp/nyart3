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

import JobCard from '../job/card';

export default class ClientContactDetails extends Component {
  state = {
    record: null,
    jobs: null
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { id } = this.props;

    this.recordRef = database.ref('ClientContact')
      .child(id);

    this.jobsRef = database.ref("Job")
      .orderByChild("ClientContact/id")
      .equalTo(id);

    this.recordRef.on('value', snapshot => {
      this.setState({ record: snapshot.val() });
    });

    this.jobsRef.on("value", (snapshot) => {
      const jobs = snapshot.val();

      this.setState({ jobs });
    });
  }

  componentWillReceiveProps(nextProps, _) {
    if(nextProps.id !== this.props.id) {
      this.recordRef.off();
      this.recordRef = database.ref('ClientContact/' + nextProps.id);
      this.recordRef.on('value', snapshot => {
        this.setState({ record: snapshot.val() });
      });
    }
  }

  componentWillUnmount() {
    this.recordRef.off();
    this.recordRef = null;
  }

  render({ id }, { record, jobs }) {
    if(!record) {
      return (<Spinner />);
    }

    return (<div class="box">
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <div>
              <h3 class={ `title is-3 ${levelTitle}` }>{ record.Firstname } { record.Lastname }</h3>
              <h4 class="subtitle is-5">{ record.FirstnameKanji } { record.LastnameKanji }</h4>
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
                  <Link class="dropdown-item" href={ `/edit-info/ClientContact/${id}` }>
                    Edit Information
                  </Link>
                  <Link class="dropdown-item" href={ `/edit/Notes/ClientContact/${id}` }>
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
  <div class="column is-6">
    <table class={ `${fullwidthTable} is-hidden-desktop` }>
      <tr>
        <td>Nationality</td>
        <td>{ record.Nationality }</td>
      </tr>

      <tr>
        <td>Status</td>
        <td>{ record.Status }</td>
      </tr>
    </table>
    <table class={ fullwidthTable }>
      <tr>
        <td>Title</td>
        <td>{ record.JobTitle }</td>
      </tr>
      <tr>
        <td>Company</td>
        <td><Link href={ `/details/company/${record.Company.id}` }>{ record.Company.Name }</Link></td>
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
  <div class="column is-3">
    <PhonesDisplay phones={ record.Phones } />
    <EmailsDisplay emails={ record.Emails } />
    <AddressesDisplay addresses={ record.Addresses } />
  </div>
</div>

          <Notes label="Notes"  markdown={ record.Notes } />
        </Pane>
        <Pane label={ `Jobs (${jobs ? Object.keys(jobs).length : 0})` }>
          { jobs &&  Object.keys(jobs).map(key => (<div class="column is-3">
              <JobCard id={ key } record={ jobs[key] } />
            </div>)) }

        </Pane>
      </Tabs>





      </div>);
  }
}