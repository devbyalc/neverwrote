const _ = require('lodash');
const api = require('../helpers/api');

// Action type constants
/* *** TODO: Put action constants here *** */
const INSERT= 'neverwrote-frontend/notebooks/INSERT';
const REMOVE= 'neverwrote-frontend/notebooks/REMOVE';
//const INSERT= 'neverwrote-frontend/notebooks/INSERT';

const initialState = {};

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  switch(action.type) {
    case INSERT:{
       const unsortedNotebook = _.concat(state.data, action.notebook);
       const data = _.orderBy(unsortedNotebook, 'createdAt','desc');
      return _.assign({}, state, {data} );
    }
    case REMOVE: {
      const data = _.reject(state.data, {id: action.id});
      return _.assign({}, state, { data });
    }

    default: return state;
  }
}

// Action creators
/* *** TODO: Put action creators here *** */
reducer.insertNotebook = (notebook) => {
  return { type: INSERT, notebook };
};
reducer.createNotebook = (newNotebook,callback) => {
  return (dispatch) => {
    api.post('/notebooks', newNotebook).then((notebook) => {
      // This post is one that the store returns us! It has post id incremented to the next available id
      dispatch(reducer.insertNotebook([notebook]));
      callback();
    }).catch(() => {
      alert('Failed to create notebook. Are all of the fields filled in correctly?');
    });
  };
};

reducer.removeNotebook = (id) => {
  return { type: REMOVE, id };
};
reducer.deleteNotebook = (notebookId) => {
   // TODO Section 8: Add code to perform delete
   return (dispatch) => {
     api.delete('/notebooks/'+ notebookId).then(()=>{
       dispatch(reducer.removeNotebook(notebookId));
     });
     };
};

// Export the action creators and reducer
module.exports = reducer;
