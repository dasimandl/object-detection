import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  setCurrentMatch,
  updateScore,
  setTargetItem,
  setStopInterval,
} from '../../store';
import {
  Container,
  Button,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Icon,
  Right,
  Left,
  Title,
} from 'native-base';
import { Text, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
  },
  header: {
    padding: 5,
    backgroundColor: '#A51E45',
  },
});

export class SuccessfulMatch extends Component {
  componentDidMount = () => {
    const { updateCurrentScore, game, stopInterval } = this.props;
    updateCurrentScore(1);
    game.stop(stopInterval);
  };

  nextItem = async () => {
    const { updateMatch, game, updateTargetItem } = this.props;
    await updateTargetItem(await game.getTargetItem());
    await updateMatch(false);
  };
  render() {
    const { targetItem, uri, score } = this.props;
    return (
      <Container>
        <Header rounded style={styles.header}>
          <Left>
            <Title style={styles.titleText}>🙌 🙃 🙌</Title>
          </Left>
          <Right>
            <Text style={styles.titleText}>{`Score: ${score}`}</Text>
          </Right>
        </Header>
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Icon name="thumbs-up" />
                <Body>
                  <Text style={{ fontSize: 20 }}>
                    You found a {targetItem}!
                  </Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
            <Icon name="thumbs-up" color="#4F8EF7" size={25} style={{ position: 'absolute', top: 30, left: 10 }} />

              <Image
                source={{ uri: uri }}
                style={{ height: 500, width: null, flex: 1 }}
              />
            </CardItem>
            <Button full onPress={() => this.nextItem()}>
              <Text>Next Item</Text>
            </Button>
          </Card>
        </Content>
      </Container>
    );
  }
}

const mapState = ({
  game: { match, targetItem, stopInterval, isRunning, score },
  cameraData: { uri },
}) => ({
  match,
  targetItem,
  stopInterval,
  isRunning,
  uri,
  score,
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
