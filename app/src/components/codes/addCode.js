import { h, Component } from 'preact';
import getPicklist from '../../lib/picklist';

class AddCode extends Component {
  state = {
    isLoadingCategory: true,
    selectedCategory: '',
    selectedCode: '',
    categories: {}
  }

  constructor(props) {
    super(props);

    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    getPicklist(this.props.type)
      .then(values => this.setState({
        isLoadingCategory: false,
        categories: values
      }));
  }

  handleCategoryChange(event) {
    this.setState({
      selectedCategory: event.target.value,
      selectedCode: ''
    });
  }

  handleCodeChange(event) {
    this.setState({ selectedCode: event.target.value });
  }

  handleClick(event) {
    event.preventDefault();

    this.props.update({
      Category: this.state.selectedCategory,
      Code: this.state.selectedCode
    });

    this.setState({ selectedCode: '' });
  }

  render({ id }, { isLoadingCategory, categories, selectedCategory, selectedCode }) {
    const categorySelectClass = isLoadingCategory ? 'select is-fullwidth is-loading' : 'select is-fullwidth';
    const categoryElements = Object.keys(categories)
      .map(option => (<option value={ option }>{ option }</option>));

    const codeElements = categories[selectedCategory] ? categories[selectedCategory]
      .map(option => (<option value={ option }>{ option }</option>)) : [];

    return (<div class="field has-addons">
      <div class="control">
        <div class={ categorySelectClass }>
          <select id={ id } onChange={ this.handleCategoryChange } value={ selectedCategory }>
            <option value="">Category</option> }
            { categoryElements }
          </select>
        </div>
      </div>

      <div class="control">
        <div class='select is-fullwidth'>
          <select id={ id } onChange={ this.handleCodeChange } value={ selectedCode }>
            <option value="">Codes</option> }
              { codeElements }
          </select>
        </div>
      </div>

      <p class="control">
        <button onClick={ this.handleClick } class="button is-primary">
          <i class="fa fa-check"></i>
        </button>
      </p>
    </div>);
  }
}

export default AddCode;