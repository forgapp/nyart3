import { h, Component } from 'preact';

class Tabs extends Component {
  state = { selected: 0 }

  componentWillMount() {
    const { selected } = this.props;

    if(selected) {
      this.setState({ selected });
    }
  }

  handleClick(event) {
    event.preventDefault();
    const index = event.target.dataset.index;

    this.setState({ selected: parseInt(index, 10) });
  }

  renderTitles() {
    return (
      <ul className="tabs__labels">
        {this.props.children.map(this.generateLabel.bind(this))}
      </ul>
    );
  }

  generateLabel(child, index) {
    let activeClass = (this.state.selected === index ? 'is-active' : '');

    return (<li className={activeClass}>
      <a data-index={ index } onClick={ this.handleClick.bind(this) }>{child.attributes.label}</a>
    </li>);
  }

  renderContent() {
    const { selected } = this.state;

    return this.props.children[selected];
  }

  render() {
    console.log('RENDER TABS')
    return (<div>
      <div class="tabs">
        { this.renderTitles() }
      </div>
      { this.renderContent() }
    </div>);
  }
}

export default Tabs;