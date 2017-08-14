import { h, Component } from 'preact';

const DisplayCodes = ({ codes }) => {
  const codeElements = codes ? codes.reduce((aggr, curr) => {
    if(!aggr[curr.Category]) {
      return {
        ...aggr,
        [curr.Category]: [ curr.Code ]
      };
    }

    const newCodes = Object.assign({}, aggr, {
      [curr.Category]: [...aggr[curr.Category], curr.Code ]
    });

    return newCodes;
  }, {}) : {};

  return (<div class="menu">
    { Object.keys(codeElements).map(cat => ([
      <h6 class="title is-6 is-marginless">{ cat }</h6>,
      <div class="tags">
        { codeElements[cat].map(code => (<div class="tag">{ code }</div>)) }
      </div>
    ])) }
  </div>);
};

export default DisplayCodes;
