import { h, Component } from 'preact';
import Markdown from 'preact-markdown';
import { Renderer } from 'marked';

const Notes = ({ markdown }) => {
  const render = new Renderer();
  
  render.heading = (text, level) => `<h${level} class="title is-${level}">${text}</h${level}>`;
  render.table = (header, body) => `<table class="table is-striped is-narrow">
    <thead>${header}</thead>
    <tbody>${body}</tbody>
  </table>`

  const markedOpt = { renderer: render };

  return <Markdown markdownOpts={ markedOpt }  markdown={ markdown } />
}
export default Notes;
