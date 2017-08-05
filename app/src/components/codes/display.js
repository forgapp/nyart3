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
      <p class="menu-label">{ cat }</p>,
      <ul class="menu-list">
        { codeElements[cat].map(code => (<li>{ code }</li>)) }
      </ul>
    ])) }
  </div>);
};

export default DisplayCodes;
