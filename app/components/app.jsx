import AltContainer from 'alt/AltContainer'
import React from 'react';
import Notes from './notes.jsx'
import NoteActions from '../actions/note-actions';
import NoteStore from '../stores/note-store';
import connect from '../decorators/connect';


export default class App extends React.Component {
  render() {
    return (
      <div>
        <button className="add-note" onClick={this.addNote}>+</button>
        <AltContainer stores={[NoteStore]} inject={ { items: () => NoteStore.getState().notes } }>
          <Notes onEdit={this.editNote} onDelete={this.deleteNote} />
        </AltContainer>
      </div>
    )
  }

  addNote() {
    NoteActions.create({task: "A new task"});
  }

  editNote(id, task) {
    NoteActions.update({id, task});
  }

  deleteNote(id) {
    NoteActions.delete(id);
  }
}