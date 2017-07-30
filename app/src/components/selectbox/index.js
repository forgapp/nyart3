import { h, Component } from 'preact';
import getPicklist from '../../lib/picklist';

export const HorizontalSelectbox = ({ label, source, value, handleChange, horizontal }) => (<div class="field is-horizontal">
  <div class="field-label is-normal">
    <label class="label">{ label }</label>
  </div>
  <div class="field-body">
    <div class="field">
      <div class="control">
        <div class="select is-fullwidth">
          <select value={ value } onChange={ handleChange }>
            <option>Select dropdown</option>
            <option>With options</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</div>);

export class Selectbox extends Component {
  state = {
    isLoading: true,
    sources: []
  }

  componentWillMount() {
    getPicklist(this.props.type)
      .then(values => this.setState({
        isLoading: false,
        sources: values
      }));
  }

  render({ id, label, placeholder, value, handleChange }, { isLoading, sources }) {
    const selectClass = isLoading ? 'select is-fullwidth is-loading' : 'select is-fullwidth';
    const sourceElements = sources.map(option => (<option value={ option.value }>{ option.label }</option>));

    return (<div class="field">
      { label && <label class="label">{ label }</label> }
      <div class="control">
        <div class={ selectClass }>
          <select id={ id } value={ value } onChange={ handleChange }>
            { placeholder && <option value="">{ placeholder }</option> }
            { sourceElements }
          </select>
        </div>
      </div>
    </div>);
  }
}
