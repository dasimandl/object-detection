import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  setCurrentMatch,
  updateScore,
  setTargetItem,
  setStopInterval,
} from '../../store';
import { Footer, Container, Button, FooterTab } from 'native-base';
import { Text } from 'react-native';

export class SuccessfulMatch extends Component {
  componentDidMount = () => {
    const { updateCurrentScore, game, stopInterval } = this.props;
    updateCurrentScore(1);
    game.stop(stopInterval);
  };

  nextItem = async () => {
    const {
      updateMatch,
      game,
      updateTargetItem,
      updateStopIntervalRef,
    } = this.props;
    await updateMatch(false);
    await updateTargetItem(game.getTargetItem());
    await updateStopIntervalRef(game.start());
  };
  render() {
    const { targetItem, match, isRunning } = this.props;
    return (
      <Container>
        <Text>You found a {targetItem}</Text>
        {/* <Image source={}/> */}
        <Button full onPress={() => this.nextItem()}>
          <Text>Next Item</Text>
        </Button>
      </Container>
    );
  }
}

const mapState = ({
  game: { match, targetItem, stopInterval, isRunning },
}) => ({
  match,
  targetItem,
  stopInterval,
  isRunning,
});
const mapDispatch = dispatch => ({
  updateMatch(match) {
    return dispatch(setCurrentMatch(match));
  },
  updateCurrentScore(score) {
    return dispatch(updateScore(score));
  },
  updateTargetItem(item) {
    return dispatch(setTargetItem(item));
  },
  updateStopIntervalRef(ref) {
    return dispatch(setStopInterval(ref));
  },
});
export default connect(mapState, mapDispatch)(SuccessfulMatch);
