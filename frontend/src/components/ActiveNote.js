const React = require('react');

class ActiveNote extends React.Component {
  render() {
    return (
      <li className="container">
          <h1> {this.props.note.title}</h1>
          <p>
            {this.props.note.content}
          </p>
        </li>
    );
  }
}
module.exports = ActiveNote;