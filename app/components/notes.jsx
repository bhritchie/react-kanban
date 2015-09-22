import React from 'react';
import Note from './note.jsx';

export default class Notes extends React.Component {
  constructor(props) {
    super(props)

    this.renderNote = this.renderNote.bind(this);
  }

  render() {
    return (
      <div>
        <ul className="notes">{this.props.items.map(this.renderNote)}</ul>
      </div>
    );
  }

  renderNote(note) {
    return(
      <li key={`note${note.id}`}>
        <Note
          task={note.task}
          onEdit={this.props.onEdit.bind(null, note.id)}
          onDelete={this.props.onDelete.bind(null, note.id)} />
      </li>
    );
  }
}