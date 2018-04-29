import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentMatch } from '../../store';

export class SuccessfulMatch extends Component {
  render() {
    const {targetItem, match} = this.props;
    return <div />;
  }
}

const mapState = ({ game: { match, targetItem } }) => ({
  match, targetItem
});
const mapDispatch = dispatch => ({
  updateMatch(match) {
    return dispatch(setCurrentMatch(match));
  },
});
export default connect(mapState, mapDispatch)(SuccessfulMatch);
