import { h, Component } from 'preact';
import { database } from '../../lib/firebase';
import { Tabs, Pane } from '../tabs';
import { Information } from './display';
import { levelTitle } from './style.css';
import Spinner from '../spinner';
import { Link } from 'preact-router';

export default class CandidateDetails extends Component {
  state = { record: null }

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

  render({ id }, { record }) {
    console.log('RENDER', record);
    if(!record) {
      return (<Spinner />);
    }

    return (<div class="box">
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <div>
              <h3 class={ `title is-3 ${levelTitle}` }>{ record.Firstname } { record.Lastname } <small>(30)</small></h3>
              <h4 class="subtitle is-5">{ record.FirstnameKanji } { record.LastnameKanji }</h4>
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
                  <Link class="dropdown-item" href={ `/edit/Candidate/info/${id}` }>
                    Edit Information
                  </Link>
                  <a class="dropdown-item">
                    Add resume
                  </a>
                  <a class="dropdown-item">
                    Edit Interview Notes
                  </a>
                  <a class="dropdown-item">
                    Set Off-Limit
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Tabs>
        <Pane label="Information">

          <Information
            Nationality={ record.Nationality }
            Birthdate={ record.Birthdate }
            Status={ record.Status }
            Title={ record.Title }
            Company={ record.Company }
            Salary={ record.Salary }
            RegistrationDate={ record.RegistrationDate }
            RecruiterName={ record.RecruiterName }
            RecruiterId={ record.RecruiterId }
            Source={ record.Source }
            Phones={ record.Phones }
          />
        </Pane>
        <Pane label="Notes">
         My notes
        </Pane>
      </Tabs>





      </div>);
  }
}

      /*<div class="tile is-ancestor">
        <div class="tile is-child">
          <h3 class="title is-4">{ record.Firstname } { record.Lastname } <small>(30)</small></h3>
          <h4 class="subtitle is-6">{ record.FirstnameKanji } { record.LastnameKanji }</h4>
        </div>
        <div class="tile is-hidden-mobile">Desktop Only</div>
      </div>*/