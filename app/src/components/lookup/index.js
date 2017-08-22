import { h, Component } from 'preact';
import Elastic from '../../lib/elastic';
import xs from 'xstream';
import fromEvent from 'xstream/extra/fromEvent';
import debounce from 'xstream/extra/debounce';
import { autocomplete } from './style.css';

class Lookup extends Component {
  state = {
    suggestions: null,
    searchText: ''
  }

  constructor(props) {
    super(props);

    this.elastic = new Elastic();
    this.elastic
      .setIndex(this.props.index)
      .setType(this.props.type)
      .size(15);
  }

  componentDidMount() {
    if(this.props.value) {
      this.setState({ searchText: this.props.value });
    }

    const inputStream = fromEvent(this.base.querySelector('input'), 'input')
      .compose(debounce(500))
      .map(event => event.target.value);

    this.sub2 = inputStream
      .subscribe({
        next: (x) => {
          this.setState({ searchText: x });
        },
        error: (err) => console.error(err)
      });

    this.sub = inputStream
      .map(searchText => searchText + '*')
      .map(this.search.bind(this))
      .flatten()
      .subscribe({
        next: (x) => {
          this.setState({ suggestions: x.hits.hits });
        },
        error: (err) => console.error(err)
      });
  }

  componentWillReceiveProps(nextProps, _) {
      this.setState({ searchText: nextProps.value });
  }

  componentDidUpdate() {
    this.scrollToView();
  }

  componentWillUnmount() {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }

  scrollToView() {
    const pageContent = document.querySelector('.page-content');
    const dropdownMenu = this.base.querySelector('.dropdown-menu');
    const pageContentPosition = pageContent.getBoundingClientRect();
    const dropdownMenuPosition = dropdownMenu.getBoundingClientRect();

    if(pageContentPosition.bottom < dropdownMenuPosition.bottom) {
      pageContent.scrollTop = dropdownMenuPosition.bottom;
    }
  }

  search(value) {
    const search = this.elastic
      .query(value)
      .search();

    return xs.fromPromise(search);
  }

  hasResult() {
    const { suggestions } = this.state;

    return suggestions && suggestions.length !== 0;
  }

  handleClick(event) {
    event.preventDefault();
    this.props.handleClick(event.target.dataset);
    this.setState({ suggestions: null });
  }

  handleBlur(event) {
    event.preventDefault();

    this.setState({
      suggestions: null,
      searchText: this.props.value
    });
  }

  render({ placeholder, label }, { suggestions, searchText }) {
    const dropdownClass = suggestions ? `dropdown ${autocomplete} is-active` : `dropdown${autocomplete}`;

    return (<div class="field">
      { label && <div class="label is-small">{ label }</div> }
      <div class={ dropdownClass }>
        <div class="dropdown-trigger">
          <p class="control">
            <input class="input" value={ searchText } placeholder={ placeholder } onBlur={ this.handleBlur.bind(this) } />
          </p>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
          <div class="dropdown-content">
          { !this.hasResult() && <span class="dropdown-item">No Results.</span>}
          { this.hasResult() && suggestions.map(suggestion => {
            const value = this.props.formatValue(suggestion._source);

            return (<a onMousedown={ this.handleClick.bind(this) } data-id={ suggestion._id } data-value={ value } class="dropdown-item">
              { value }
            </a>)})
          }
          </div>
        </div>
      </div>
    </div>);
  }
}

export default Lookup;
