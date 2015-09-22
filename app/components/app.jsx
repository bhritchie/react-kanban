import uuid from 'node-uuid';
import React from 'react';
import Notes from './notes.jsx'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [
        {
          id: uuid.v4(),
          task: 'Learn Webpack'
        },
        {
          id: uuid.v4(),
          task: 'Learn React'
        },
        {
          id: uuid.v4(),
          task: 'Do laundry'
        }
      ]
    };

    this.findNote = this.findNote.bind(this);
    this.addNote = this.addNote.bind(this);
    this.editNote = this.editNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  render() {
    return (
      <div>
        <button className="add-note" onClick={this.addNote}>+</button>
        <Notes items={this.state.notes} onEdit={this.editNote} onDelete={this.deleteNote} />
      </div>
    )
  }

  findNote(id) {
    const notes = this.state.notes;
    console.log(notes);
    const noteIndex = notes.findIndex((note) => note.id === id)

    if (noteIndex < 0) {
      console.log(`Couldn't find note with id ${id}`);
      return
    }

    return noteIndex;
  }

  addNote() {
    this.setState({
      notes: this.state.notes.concat([{
        id: uuid.v4(),
        task: "A new task"
      }])
    });
  }

  editNote(noteId, task) {
    let notes = this.state.notes;
    const noteIndex = this.findNote(noteId);

    if (noteId < 0) {
      return;
    }

    notes[noteIndex].task = task;
    this.setState({notes});
    console.log('note edited', noteId, task);
  }

  deleteNote(noteId) {
    console.log('delet note');
    let notes = this.state.notes;
    const noteIndex = this.findNote(noteId);

    if (noteId < 0) {
      return;
    }

    this.setState({notes: notes.slice(0, noteIndex).concat(notes.slice(noteIndex + 1))})
  }
}