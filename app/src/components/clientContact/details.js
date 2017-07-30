import { h, Component } from 'preact';

export default class ClientContactDetails extends Component {
  render({ id }, state) {
    return (<div>Details of Client Contact: {id}</div>);
  }
}
