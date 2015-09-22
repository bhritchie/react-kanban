import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/note-actions';

class NoteStore {
  constructor() {
    this.bindActions(NoteActions);
    this.notes = [];
  }

findNote(id) {
    const notes = this.notes;
    console.log(notes);
    const noteIndex = notes.findIndex((note) => note.id === id);

    if (noteIndex < 0) {
      console.log(`Couldn't find note with id ${id}`);
      return;
    }

    return noteIndex;
  }

  create(note) {
    const notes = this.notes;
    note.id = uuid.v4();
    this.setState({
      notes: notes.concat(note)
    })
  }

  update({id, task}) {
    let notes = this.notes;
    const noteIndex = this.findNote(id);

    if (noteIndex < 0) {
      return;
    }

    notes[noteIndex].task = task;
    this.setState({notes});
    console.log('note updated', id, task);
  }

  delete(id) {
    console.log('delete note');
    let notes = this.notes;
    const noteIndex = this.findNote(id);

    if (noteIndex < 0) {
      return;
    }

    this.setState({notes: notes.slice(0, noteIndex).concat(notes.slice(noteIndex + 1))})
  }
}

export default alt.createStore(NoteStore, 'NoteStore');