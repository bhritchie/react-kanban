require('../lane.css');

import AltContainer from 'alt/AltContainer'
import React from 'react';
import Notes from './notes.jsx'
import NoteActions from '../actions/note-actions';
import NoteStore from '../stores/note-store';
import LaneActions from '../actions/lane-actions';
import Editable from './editable.jsx'

export default class Lane extends React.Component {
  constructor(props) {
    super(props);
    const id = props.id;

    this.addNote = this.addNote.bind(this, id);
    this.deleteNote = this.deleteNote.bind(this, id);
    this.editName = this.editName.bind(this, id);
  }

  render() {
    const {id, name, notes, ...props} = this.props;
    return (
      <div {...props}>
        <div className='lane-header'>
          <Editable className='lane-name' value={name} onEdit={this.editName} />
          <div className='lane-add-note'>
            <button onClick={this.addNote}>+</button>
          </div>
        </div>
        <AltContainer
          stores={[NoteStore]}
          inject={ {
            items: () => NoteStore.get(notes) || []
          } }
        >
          <Notes onEdit={this.editNote} onDelete={this.deleteNote} />
        </AltContainer>
      </div>
    )
  }

  addNote(laneId) {
    NoteActions.create({task: "A new task"});
    LaneActions.attachToLane({laneId});
  }

  editNote(id, task) {
    NoteActions.update({id, task});
  }

  deleteNote(laneId, noteId) {
    NoteActions.delete(noteId);
    LaneActions.detachFromLane({laneId, noteId});
  }

  editName(id, name) {
    if (name) {
      LaneActions.update({id, name});
    }
    else {
      LaneActions.delete(id);
    }
  }
}