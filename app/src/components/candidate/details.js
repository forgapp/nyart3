import { h, Component } from 'preact';
import databaseStream from '../../lib/databaseStream';
import { Tabs, Pane } from '../tabs';
import { Information } from './display';
import { levelTitle } from './style.css';
import Spinner from '../spinner';
import { Link } from 'preact-router';
import Notes from '../notes';
import { ResumesDisplay } from '../resume';
import { DisplayLanguages } from '../languages';
import { calculateAge } from '../../lib/date';
import Ats from '../ats';

export default class CandidateDetails extends Component {
  state = {
    record: null,
    ats: null
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { id } = this.props;

    this.createSubscriptions(id);
  }

  componentWillReceiveProps(nextProps, _) {
    if(nextProps.id !== this.props.id) {
      this.removeSubscriptions();
      this.createSubscriptions(nextProps.id);
    }
  }

  componentWillUnmount() {
    this.removeSubscriptions();
  }

  createSubscriptions(id) {
    this.candidateSub = new databaseStream('Candidate', 'value')
      .child(id)
      .subscribe({
        next: snapshot => this.setState({ record: snapshot.val() }),
        error: err => console.log(err)
      });

    this.processesSub = new databaseStream('Process', 'value')
      .orderByChild("Candidate/id")
      .equalTo(id)
      .subscribe({
        next: snapshot => this.setState({ ats: snapshot.val() }),
        error: err => console.log(err)
      });
  }

  removeSubscriptions() {
    this.candidateSub.unsubscribe();
    this.processesSub.unsubscribe();
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
              <h3 class={ `title is-3 ${levelTitle}` }>{ record.Firstname } { record.Lastname }</h3>
              <h4 class="subtitle is-5">{ record.FirstnameKanji } { record.LastnameKanji }</h4>
            </div>
          </div>

          <div class="level-item">
            <span>{ record.Nationality }</span>
            <span>
              <i class="fa fa-birthday-cake" aria-hidden="true"></i>
              { record.DateOfBirth } { record.DateOfBirth && record.DateOfBirth !== '' && <small>({ calculateAge(record.DateOfBirth) } yrs)</small> }
            </span>
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
                  <Link class="dropdown-item" href={ `/process/new?candidate=${id}` }>
                    Apply to a job
                  </Link>
                  <Link class="dropdown-item" href={ `/edit-info/Candidate/${id}` }>
                    Edit Information
                  </Link>
                  <Link class="dropdown-item" href={ `/edit-resumes/${id}` }>
                    Edit resumes
                  </Link>
                  <Link class="dropdown-item" href={ `/edit/InterviewNotes/Candidate/${id}` }>
                    Edit Interview Notes
                  </Link>
                  <a class="dropdown-item is-hidden">
                    Set Off-Limit
                  </a>
                  <a class="dropdown-item is-hidden">
                    Lock Prefered Recruiter
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <DisplayLanguages languages={ record.Languages } />
      <ResumesDisplay id={ id }/>

      <Tabs>
        <Pane label="Information">

          <Information
            Nationality={ record.Nationality }
            Birthdate={ record.DateOfBirth }
            Status={ record.Status }
            Title={ record.JobTitle }
            Company={ record.Company }
            Salary={ record.Salary }
            RegistrationDate={ record.RegistrationDate }
            RecruiterName={ record.Recruiter.Name }
            RecruiterId={ record.RecruiterId }
            Source={ record.Source }
            Phones={ record.Phones }
            Emails={ record.Emails }
            Addresses={ record.Addresses }
            Industry={ record.Industry }
            JobFunction={ record.JobFunction }
          />
          <Notes label="Interview Notes"  markdown={ record.InterviewNotes } />
        </Pane>
        <Pane label="ATS">
          { ats && Object.keys(ats).map(key => {
              const process = ats[key];
              return (<Ats id={ key } process={ process } type="Job" />)
            })
          }
        </Pane>
      </Tabs>





      </div>);
  }
}
