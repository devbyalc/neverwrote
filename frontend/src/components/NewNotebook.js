const React = require('react');
const NotebookEdit = require('./NotebookEdit');

/**
 * A button which expands into a form for writing a new post.
 */
class NewNotebook extends React.Component {
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

    const createNotebook = (newNotebook) => {
      this.props.createNotebook(newNotebook, (err) => {
        if(!err) closeEdit();
      });
    };

  if(this.state.editing) {
      // Render component for editing the post
      return (
        <NotebookEdit
          notebook={this.props.notebook}
          onSave={createNotebook}
          onCancel={closeEdit}
        />
      );
    }
    // TODO Section 7: Write code to switch to edit mode when editing is clicked
    return (
      <button className="btn btn-primary btn-lg"
        onClick={ openEdit }
      >
       Create New Notebook
      </button>
    );
  }
}

module.exports = NewNotebook;
