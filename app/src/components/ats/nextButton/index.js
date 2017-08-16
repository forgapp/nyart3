import { h, Component } from 'preact';
import { database } from '../../../lib/firebase';
import { formatdateForInput } from '../../../lib/date';
import Submittal from './submittal';
import CCM from './ccm';
import Offer from './offer';
import Placement from './placement';

class NextButton extends Component {
  state = {
    isOpen: false,
    stage: null
  }

  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (this.props.nextStage === 'CCM') {
      this.setState({ stage: {
        StageDate: formatdateForInput(new Date()),
        InterviewDate: formatdateForInput(new Date()),
        InterviewTime: ''
      }});
    } else {
      this.setState({ stage: {
        StageDate: formatdateForInput(new Date())
      }});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.nextStage === 'CCM') {
      this.setState({ stage: {
        StageDate: formatdateForInput(new Date()),
        InterviewDate: formatdateForInput(new Date()),
        InterviewTime: ''
      }});
    } else {
      this.setState({ stage: {
        StageDate: formatdateForInput(new Date())
      }});
    }
  }

  toggleModal(event) {
    event.preventDefault();

    this.setState({ isOpen: !this.state.isOpen });
  }

  handleChange(event) {
    const { id, value } = event.target;
    const stage = Object.assign({}, this.state.stage, {
      [id]: value
    });

    this.setState({ stage });
  }

  handleSubmit(event) {
    event.preventDefault();
    const stageRef = database.ref('Process')
      .child(this.props.id)
      .child(this.props.nextStage);

    if(this.props.nextStage === 'CCM') {
      stageRef.push()
        .set({
          ...this.state.stage,
          'Number': this.props.ccmNumber || 1
        })
        .then(() => this.setState({ isOpen: false }));
    } else {
      stageRef
        .set(this.state.stage)
        .then(() => this.setState({ isOpen: false }));
    }
  }


  getStageForm() {
    switch(this.props.nextStage) {
      case 'Placement':
        return Placement;
      case 'Offer':
        return Offer;
      case 'CCM':
        return CCM;
      case 'Submittal':
        return Submittal;
      default:
        return null;
    }
  }

  render({ children }, { isOpen, stage }) {
    const modalClass = isOpen ? 'modal is-active' : 'modal';
    const StageForm = this.getStageForm();

    return (<div>
      <a class="button is-primary" onClick={ this.toggleModal }>
        { children }
      </a>
      <form class={ modalClass } onSubmit={ this.handleSubmit }>
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">{ this.props.nextStage }</p>
            <button class="delete" aria-label="close" onClick={ this.toggleModal }></button>
          </header>
          <section class="modal-card-body">
            <StageForm stage={ stage } handleChange={ this.handleChange } />
          </section>
          <footer class="modal-card-foot">
            <button class="button is-primary" type="submit">Save</button>
            <button class="button" onClick={ this.toggleModal }>Cancel</button>
          </footer>
        </div>
      </form>
    </div>);
  }
}

export default NextButton;
