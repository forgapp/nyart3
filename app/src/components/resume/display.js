import { h, Component } from 'preact';
import { database } from '../../lib/firebase';

class Display extends Component {
  state = { resumes: {} }

  componentDidMount() {
    this.resumeRef = database.ref('Resumes')
      .child(this.props.id);

    this.resumeRef.on('value', snapshot => {
      this.setState({ resumes: snapshot.val() });
    });
  }

  componentWillUnmount() {
    this.resumeRef.off('value');
    this.resumeRef = null;
  }

  render(_, { resumes }) {
    const resumesElements = resumes ? Object.keys(resumes)
      .map(key => {
        const file = resumes[key];

        return (<a class="button is-link is-small" href={ file.Url } target="_blank">
          <span class="icon is-small">
            <i class="fa fa-file-text-o" aria-hidden="true"></i>
          </span>
          <span>{ file.Name }</span>
        </a>);
      }) : {};

    return (<div>{ resumesElements }</div>);
  }
};

export default Display;
