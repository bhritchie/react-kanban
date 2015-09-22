import AltContainer from 'alt/AltContainer'
import React from 'react';
import Lanes from './lanes.jsx';
import LaneActions from '../actions/lane-actions';
import LaneStore from '../stores/lane-store';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <button className="add-lane" onClick={this.addItem}>+</button>
        <AltContainer stores={[LaneStore]} inject={ { items: () => LaneStore.getState().lanes || [] } }>
          <Lanes />
        </AltContainer>
      </div>
    )
  }

  addItem() {
    LaneActions.create({name: "New Lane"});
  }
}