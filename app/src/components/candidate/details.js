import { h, Component } from 'preact';
import { database } from '../../lib/firebase';
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

    this.recordRef = database.ref('Candidate')
      .child(id);

    this.recordRef.on('value', snapshot => {
      this.setState({ record: snapshot.val() });
    });

    this.processesRef = database.ref("Process")
      .orderByChild("Candidate/id")
      .equalTo(id);

    this.processesRef.on('value', snapshot => {
      this.setState({ ats: snapshot.val() });
    });
  }

  componentWillReceiveProps(nextProps, _) {
    if(nextProps.id !== this.props.id) {
      this.recordRef.off();
      this.recordRef = database.ref('Candidate/' + nextProps.id);
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
              <h3 class={ `title is-3 ${levelTitle}` }>{ record.Firstname } { record.Lastname } <small>({calculateAge(record.DateOfBirth)})</small></h3>
              <h4 class="subtitle is-5">{ record.FirstnameKanji } { record.LastnameKanji }</h4>
            </div>
          </div>

          <div class="level-item">
            <span>{ record.Nationality }</span>
            <span>
              <i class="fa fa-birthday-cake" aria-hidden="true"></i>
              { record.DateOfBirth }
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

{/* <Resume id={ id } /> */}

      /*<div class="tile is-ancestor">
        <div class="tile is-child">
          <h3 class="title is-4">{ record.Firstname } { record.Lastname } <small>(30)</small></h3>
          <h4 class="subtitle is-6">{ record.FirstnameKanji } { record.LastnameKanji }</h4>
        </div>
        <div class="tile is-hidden-mobile">Desktop Only</div>
      </div>*/