import React from 'react';
import Notes from './notes.jsx'
import NoteActions from '../actions/note-actions';
import NoteStore from '../stores/note-store';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.storeChanged = this.storeChanged.bind(this);
    this.state = NoteStore.getState();
  }

  storeChanged(state) {
    this.setState(state);
  }

  componentDidMount() {
    NoteStore.listen(this.storeChanged);
  }

  componentWillUnmount() {
    NoteStore.unlisten(this.storeChanged);
  }

  render() {
    return (
      <div>
        <button className="add-note" onClick={this.addNote}>+</button>
        <Notes items={this.state.notes} onEdit={this.editNote} onDelete={this.deleteNote} />
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