const React = require('react');

class Note extends React.Component {
  render() {
  	const onClickNote = (event) => {
    	event.preventDefault();
    	this.props.loadContent(this.props.note.id);
    };

    const onRemove = (event) => {
      event.preventDefault();
      this.props.onDelete(this.props.note.id);
    };

    return (
        <div className="media-body">
        <a href="#" onClick={onClickNote}>
          {this.props.note.title}
        </a>

         <a role="button" title="Delete note"
          style={{ paddingRight: '8px' }}
          onClick={ onRemove}
          >
          <span className="fa fa-remove" />
        </a>
        </div>

    );
  }
}
module.exports = Note;