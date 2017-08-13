import { h, Component } from 'preact';
import { route } from 'preact-router';
import { database, storage } from '../../lib/firebase';

class Edit extends Component {
  state = {
    resumes: {},
    uploadTasks : []
  }

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.onUploadCompleted = this.onUploadCompleted.bind(this);
    this.deleteResume = this.deleteResume.bind(this);
    this.renderResume = this.renderResume.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.storageRef = storage.ref('/resumes')
      .child(this.props.id);

    this.resumeRef = database.ref('Resumes')
      .child(this.props.id);

    this.resumeRef.on('value', snapshot => {
      this.setState({ resumes: snapshot.val() })
    })
  }

  handleChange(event) {
    this.setState({ uploadTasks : [] });

    const files = event.target.files;

    for(let i = 0; i < files.length; i++) {
      const file = files[i];

      const uploadTask = this.storageRef.child(file.name)
        .put(file, { contentType: file.type });

      uploadTask.on('state_changed', snapshot => {
        const transfered = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);
        console.log('state_changed', transfered);

        this.setState({
          uploadTasks: [
            ...this.state.uploadTasks.slice(0, i),
            {
              Name: file.name,
              Transfered: transfered
            },
            ...this.state.uploadTasks.slice(i + 1, this.state.uploadTasks.length)
          ]
        })
      })

      uploadTask.then(snapshot => {
        const resumeRef = database.ref('Resumes')
          .child(this.props.id)
          .push();
          resumeRef.child('Name').set(file.name)
          resumeRef.child('Url').set(snapshot.downloadURL);
      });

    }



    // this.setState({ uploadTasks: files });
  }

  deleteResume(filename, databaseKey) {
    const fileRef = this.storageRef.child(filename);

    fileRef.delete().then(() => {
      this.resumeRef.child(databaseKey).remove();
    });
  }

  onUploadCompleted() {

  }

  renderResume(key) {
    const resume = this.state.resumes[key];
    const handleClick = event => {
      event.preventDefault();
      this.deleteResume(resume.Name, key);
    };

    return <li>
      <a class="is-clearfix">
        { resume.Name }
        <button onClick={ handleClick } class="button is-small is-pulled-right">
          <span class="icon is-small">
            <i class="fa fa-trash"></i>
          </span>
        </button>
      </a>
    </li>
  }

  handleClick(event) {
    event.preventDefault();

    route(`/details/candidate/${this.props.id}`);
  }

  render(_, { resumes, uploadTasks }) {
    const resumeElements = resumes ? Object.keys(resumes)
      .map(this.renderResume) : [];

    const uploadTaskElements = uploadTasks.map(task => <li>
      {task.Name}
      <progress class="progress is-info" value={task.Transfered} max="100">{ `${task.Transfered}%` }</progress>
    </li>)

    return (<div class="columns">
      <div class="column is-half">
        <aside class="menu">
          <p class="menu-label">Resumes</p>
          <ul class="menu-list">
          { resumeElements }
          </ul>
        </aside>
        <button class="button" onClick={ this.handleClick }>Back to Candidate</button>
      </div>

      <div class="column">
        <div class="field">
          <div class="file is-info is-large is-centered">
            <label class="file-label">
              <input class="file-input" multiple type="file" name="resume" onChange={ this.handleChange }  />
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fa fa-upload"></i>
                </span>
                <span class="file-label">
                  Click here or drag resumes.
                </span>
              </span>
            </label>
          </div>
        </div>
        <ul>
          { uploadTaskElements }
        </ul>
      </div>
    </div>);
  }
};

export default Edit;
