import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentMatch, updateScore, setTargetItem } from '../../store';
import { Footer, Container, Button, FooterTab } from 'native-base';
import { Text } from 'react-native';

export class SuccessfulMatch extends Component {
  componentDidMount = () => {
    const { updateCurrentScore } = this.props;
    updateCurrentScore(1);
  };

  nextItem = async () => {
    const { updateMatch, game, updateTargetItem } = this.props;
    await updateMatch(false);
    await updateTargetItem(game.getTargetItem());
  };
  render() {
    const { targetItem, match } = this.props;
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

const mapState = ({ game: { match, targetItem } }) => ({
  match,
  targetItem,
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
});
export default connect(mapState, mapDispatch)(SuccessfulMatch);
