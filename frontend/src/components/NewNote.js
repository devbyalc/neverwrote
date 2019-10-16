const React = require('react');
const NoteEdit = require('./NoteEdit');

/**
 * A button which expands into a form for writing a new post.
 */
class NewNote extends React.Component {
  constructor(props) {
    super(props);
    // Set initial internal state for this component
    this.state = { editing: false };
  }

  render() {
    const openEdit = () => {
      this.setState({ editing: true });
    };

    const closeEdit = () => {
      this.setState({ editing: false });
    };

    const createNote = (newNote) => {
      this.props.createNote(newNote, (err) => {
        if(!err) closeEdit();
      });
    };

  if(this.state.editing) {
      // Render component for editing the post
      return (
        <NoteEdit
          note={this.props.note}
          notebookId={this.props.notebookId}
          onSave={createNote}
          onCancel={closeEdit}
        />
      );
    }
    // TODO Section 7: Write code to switch to edit mode when editing is clicked
    return (

        <a role="button" title="add note"
          style={{ paddingRight: '8px' }}
          onClick={ openEdit}
          >
            <span className="fa fa-plus" />
        </a>
    );
  }
}

module.exports = NewNote;
