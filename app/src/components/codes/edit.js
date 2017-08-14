import { h, Component } from 'preact';
import AddCode from './addCode';

class EditCodes extends Component {
  constructor(props) {
    super(props);

    this.generateCodeRow = this.generateCodeRow.bind(this);
    this.addCode = this.addCode.bind(this);
    this.removeCode = this.removeCode.bind(this);
  }

  generateCodeRow(item) {
    const remove = (event) => {
      event.preventDefault();

      this.removeCode(item.index);
    };

    return (<div class="control">
      <div class="tags has-addons">
        <span class="tag is-info">{ item.code }</span>
        <a class="tag is-delete" onClick={ remove }></a>
      </div>
    </div>);
  }

  addCode(code) {
    const newCodes = [
      ...this.props.codes,
      code
    ].filter(p => !!p);

    this.props.update({
      id: this.props.type,
      value: newCodes
    });
  }

  removeCode(index) {
    const newCodes = [
      ...this.props.codes.slice(0, index),
      ...this.props.codes.slice(index + 1, this.props.codes.length)
    ];

    this.props.update({
      id: this.props.type,
      value: newCodes
    });
  }

  render({ type, codes }, _) {
    const codeElements = codes ? codes
      .map((code, index) => Object.assign({ index }, code))
      .reduce((aggr, curr) => {
        if(!aggr[curr.Category]) {
          return {
            ...aggr,
            [curr.Category]: [ {
              code: curr.Code,
              index: curr.index
            } ]
          };
      }

      const newCodes = Object.assign({}, aggr, {
        [curr.Category]: [...aggr[curr.Category], {
          code: curr.Code,
          index: curr.index
        } ]
      });

      return newCodes;
    }, {}) : {};

    return (<div>
      { Object.keys(codeElements).map(cat => ([
        <h5 class="title is-5">{ cat }</h5>,
        <div class="field is-grouped is-grouped-multiline">
          { codeElements[cat].map(this.generateCodeRow) }
        </div>
      ])) }
      <AddCode type={ type } update={ this.addCode } />
    </div>);

    /*return (<div class="menu">
      { Object.keys(codeElements).map(cat => ([
        <p class="menu-label">{ cat }</p>,
        <ul class="menu-list">
          { codeElements[cat].map(this.generateCodeRow) }
        </ul>
      ])) }
      <AddCode type={ type } update={ this.addCode } />
    </div>);*/
  }
}

export default EditCodes;
