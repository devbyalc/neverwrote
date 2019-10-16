const React = require('react');


class Notebook extends React.Component {
  render() {
  	const onClickNotebook = (event) => {
    	event.preventDefault();
    	this.props.loadNotes(this.props.notebook.id);
    };
    const onRemove = (event) => {
      event.preventDefault();
      this.props.onDelete(this.props.notebook.id);
    };

    return (
        <div className='list-group-item'>

        <a href="#" onClick={onClickNotebook}>
          {this.props.notebook.title}
        </a>

          <a role="button" title="Delete notebook"
          style={{ paddingRight: '8px' }}
          onClick={ onRemove}
          >
            <span className="fa fa-remove" />
        </a>

        </div>
    );
  }
}

module.exports = Notebook;