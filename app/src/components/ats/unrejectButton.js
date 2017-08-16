import { h, Component } from 'preact';
import { database } from '../../lib/firebase';

class UnrejectButton extends Component {
  state = { isOpen: false }

  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.reject = this.reject.bind(this);
  }

  toggleModal(event) {
    event.preventDefault();

    this.setState({ isOpen: !this.state.isOpen });
  }

  reject() {
    const { id } = this.props;
    const process = database.ref('Process')
      .child(id);

    Promise.all([
      process.child('IsRejected').remove(),
      process.child('RejectedDate').remove()
    ]).then(() => this.setState({ isOpen: false }));
  }

  render({ label }, { isOpen }) {
    const modalClass = isOpen ? 'modal is-active' : 'modal';

    return (<div>
      <a class="button is-warning" onClick={ this.toggleModal }>
        <i class="fa fa-refresh" aria-hidden="true"></i>
      </a>
      <div class={ modalClass }>
        <div class="modal-background"></div>
        <div class="modal-content">
          <div class="box">
            <p class="is-size-4">Are you sure you want to unreject { label }?</p>
            <div class="field is-grouped">
              <p class="control">
                <button class="button is-primary" onClick={ this.reject }>Unreject</button>
              </p>
              <p class="control">
                <button class="button" onClick={ this.toggleModal }>Cancel</button>
              </p>
            </div>
          </div>
        </div>
        <button class="modal-close is-large" aria-label="close" onClick={ this.toggleModal }></button>
      </div>
    </div>);
  }
}

export default UnrejectButton;
