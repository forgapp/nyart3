import { h, Component } from 'preact';
import { database } from '../../lib/firebase';
import { formatdateForInput } from '../../lib/date';

class RejectButton extends Component {
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

    database.ref('Process')
      .child(id)
      .update({
        IsRejected: true,
        RejectedDate: formatdateForInput(new Date())
      })
      .then(() => this.setState({ isOpen: false }));
  }

  render({ label }, { isOpen }) {
    const modalClass = isOpen ? 'modal is-active' : 'modal';

    return (<div>
      <a class="button is-danger" onClick={ this.toggleModal }>
        <i class="fa fa-ban" aria-hidden="true"></i>
      </a>
      <div class={ modalClass }>
        <div class="modal-background"></div>
        <div class="modal-content">
          <div class="box">
            <p class="is-size-4">Are you sure you want to reject { label }?</p>
            <div class="field is-grouped">
              <p class="control">
                <button class="button is-primary" onClick={ this.reject }>Reject</button>
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

export default RejectButton;
