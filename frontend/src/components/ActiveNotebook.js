const React = require('react');
const Note = require('./Note');
const Search = require('./Search');
const ActiveNote = require('./ActiveNote');
const NewNote = require('./NewNote');

class ActiveNotebook extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      search: ''
    }
  }

  updateSearch(e) {
    this.setState({search: e.target.value});
    console.log('search:' + this.state.search);
  }

  render() {
      let filteredNotes = this.props.notes.filter(
        (note) => {
          const title = note.title.toUpperCase();
          const content = note.content.toUpperCase();
          return title.includes(this.state.search.toUpperCase()) || content.includes(this.state.search.toUpperCase())
        });

      const createNotesItem = (note) => {
      if(note.id === this.props.activeNote.activeNoteId)
      {
        return<ActiveNote key={note.id} note={note} />;
      }
        return<Note key={note.id} note={note} loadContent={this.props.loadContent} onDelete={this.props.noteDelete}/>;

  };

    return (
      <div className="list-group-item">
    	<h2 className="list-group-item-heading"> {this.props.notebook.title} <NewNote notebookId={this.props.notebook.id} createNote={this.props.createNote}/>
      </h2>
       <input className ="search-bar" type ="text"
       value={this.state.search}
       onChange={this.updateSearch.bind(this)}
       placeholder="note title/note content"/>
      <div className="media"> {filteredNotes.map(note => createNotesItem(note))}</div>
      </div>

    );
  }
}
module.exports = ActiveNotebook;