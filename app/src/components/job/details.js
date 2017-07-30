import { h, Component } from 'preact';

export default class JobDetails extends Component {
  render({ id }, state) {
    return (<div>Details of Job: {id}</div>);
  }
}
