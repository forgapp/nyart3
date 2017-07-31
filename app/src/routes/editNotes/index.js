import { h, Component } from 'preact';
import { route } from 'preact-router';
import { database } from '../../lib/firebase';
import Markdown from 'preact-markdown';

class EditRecordNotes extends Component {
  state = {
    notes: ''
  }

  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    const { type, id, fieldName } = this.props;

    this.notesRef = database.ref(type)
      .child(id)
      .child(fieldName);

    this.notesRef.on('value', snapshot => {
      this.setState({ notes: snapshot.val() });
    });
  }

  componentWillUnmount() {
    this.notesRef.off();
    this.notesRef = null;
  }

  handleChange(event) {
    this.setState({ notes: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.notesRef.set(this.state.notes)
      .then(() => {
        route(`/details/${this.props.type.toLowerCase()}/${this.props.id}`);
      });
  }

  handleCancel(event) {
    event.preventDefault();

    route(`/details/${this.props.type.toLowerCase()}/${this.props.id}`);
  }

  render(_, { notes }) {
    return (<div className="container">
      <div class="columns">
        <div class="column">
          <h3 class="title">Editor</h3>
          <textarea value={ notes } onInput={ this.handleChange }></textarea>
        </div>
        <div class="column">
          <h3 class="title">Preview</h3>
          <Markdown markdown={ this.state.notes } />
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label"></div>
        <div className="field-body">
          <div className="field is-grouped">
            <div className="control">
              <button type="button" className="button is-primary" onClick={ this.handleSubmit }>
                Save
              </button>
            </div>
            <div className="control">
              <button type="button" className="button" onClick={ this.handleCancel }>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
}

export default EditRecordNotes;
