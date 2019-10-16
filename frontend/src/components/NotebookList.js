const React = require('react');
const ReactRedux = require('react-redux');

const Notebook = require('./Notebook');
const ActiveNotebook = require('./ActiveNotebook');
const NewNotebook= require('./NewNotebook');


const createActionDispatchers = require('../helpers/createActionDispatchers');
const notebooksActionCreators = require('../reducers/notebooks');
const notesActionCreators = require('../reducers/notes');

//const ActionCreators =[notebooksActionCreators,notesActionCreators];

/*
  *** TODO: Build more functionality into the NotebookList component ***
  At the moment, the NotebookList component simply renders the notebooks
  as a plain list containing their titles. This code is just a starting point,
  you will need to build upon it in order to complete the assignment.
*/
class NotebookList extends React.Component {
   constructor(props){
    super(props)

    this.state = {
      search: ''
    }
  }


  render() {
    const createNotebookListItem = (notebook) => {

      if(notebook.id === this.props.notes.activeNotebookId)
      {
        return<ActiveNotebook key={notebook.id} notebook={notebook} createNote={this.props.createNote}

        searchNote={this.props.searchNote} noteDelete={this.props.deleteNote} activeNote={this.props.notes}
        notes={this.props.notes.notes} loadContent={this.props.loadContent} />;
      }
        return<Notebook key = {notebook.id} notebook={notebook} loadNotes={this.props.loadNotes} onDelete={this.props.deleteNotebook} />
  };

    return (
      <div className="row">
      <h1 id='header'>Notebooks</h1>
       <NewNotebook createNotebook={this.props.createNotebook} />

      <div className="list-group">
          {this.props.notebooks.data.map(createNotebookListItem)}
      </div>
      </div>

    );
  }
}


const NotebookListContainer = ReactRedux.connect(
  state => ({
    notebooks: state.notebooks,
    notes: state.notes
  }),
  createActionDispatchers(notebooksActionCreators,notesActionCreators)
)(NotebookList);

module.exports = NotebookListContainer;
