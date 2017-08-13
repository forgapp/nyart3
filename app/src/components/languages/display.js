import { h, Component } from 'preact';

const Display = ({ languages }) => {
  const languageElements = languages ? languages.map(language => (<div class="control">
    <div class="tags has-addons">
      <span class="tag is-dark">{ language.Language }</span>
      <span class="tag is-info">{ language.Level }</span>
    </div>
  </div>)) : [];

  return (<div class="field is-grouped is-grouped-multiline">
    { languageElements }
  </div>);
};

export default Display;
