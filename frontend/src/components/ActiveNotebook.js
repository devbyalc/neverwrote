const React = require('react');

class ActiveNotebook extends React.Component {
  render() {
    return (
    	<li>
         {this.props.notebook.title}
         <ol>
           {this.props.notes.map(note => <li key={note.id}> {note.title} </li>)}
         </ol>
      </li>
    );
  }
}
module.exports = ActiveNotebook;