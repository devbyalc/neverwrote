const _ = require('lodash');
const api = require('../helpers/api');

// Action type constants
/* *** TODO: Put action constants here *** */
const LOAD = 'neverwrote-frontend/LOAD';
const INSERT = 'neverwrote-frontend/INSERT';
const REMOVE = 'neverwrote-frontend/REMOVE';
const LOADNOTES ='neverwrote-frontend/LOADNOTES';
const SEARCH ='neverwrote-frontend/SEARCH';

// Function which takes the current data state and an action,
// and returns a new state

const initialState = {
  notes:[]
};

function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  switch(action.type) {
    /**** TODO: Put per-action code here ****/
    case INSERT:{
       const unsortedNotes = _.concat(state.notes, action.note);
       const notes = _.orderBy(unsortedNotes, 'createdAt','desc');
      return _.assign({}, state, {notes} );
    }
    case SEARCH:{
      const TheNotes = state.notes;
      var foundNotes = [];
      var found={};
      for(var i=0; i<TheNotes.length; i++)
      {
        if (TheNotes[i].content.includes(action.query) || TheNotes[i].title.includes(action.query))
        {
          foundNotes += TheNotes[i];
          found = true;
        }
      }

    return _.assign({}, state,{foundNotes:foundNotes, found:found});

    }
    case LOAD: {
      return _.assign({}, state, {activeNoteId: action.noteId});
    }

     case LOADNOTES: {
    	return _.assign({}, state, {activeNotebookId: action.notebookId, notes: action.notes });
     }
    case REMOVE: {
      const notes = _.reject(state.notes, {id: action.id});
      return _.assign({}, state, { notes });
  }

    default: return state;
  }
}

// Action creators
/* *** TODO: Put action creators here *** */
reducer.loadContent= (noteId) => {
	return (dispatch) => {
    api.get('/notes/' + noteId).then((note) => {
      dispatch({ type: LOAD, noteId, note })
    });
  };
};

reducer.searchNote= (query) => {
 return { type: SEARCH, query}
};

reducer.removeNote = (id) => {
  return { type: REMOVE, id };
};
reducer.deleteNote = (noteId) => {
   // TODO Section 8: Add code to perform delete
   return (dispatch) => {
     api.delete('/notes/'+ noteId).then(()=>{
       dispatch(reducer.removeNote(noteId));
     });
     };
};

// Attempts to create a post on the server and inserts it into the local post
// list if successful
reducer.insertNote = (note) => {
  return { type: INSERT, note };
};
reducer.createNote = (newNote,callback) => {
  return (dispatch) => {
    api.post('/notes', newNote).then((note) => {
      // This post is one that the store returns us! It has post id incremented to the next available id
      dispatch(reducer.insertNote([note]));
      callback();
    }).catch(() => {
      alert('Failed to create note. Are all of the fields filled in correctly?');
    });
  };
};

reducer.loadNotes= (notebookId) => {
	return (dispatch) => {
    api.get('/notebooks/' + notebookId + '/notes').then((notes) => {
      dispatch({ type: LOADNOTES, notebookId, notes })
    });
  };
};
// Export the action creators and reducer
module.exports = reducer;