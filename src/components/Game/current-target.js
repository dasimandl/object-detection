import React from 'react';
import { Header, Left, Right, Title } from 'native-base';
import { Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { updateType } from '../../store';

const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
  },
  header: {
    padding: 10,
    backgroundColor: '#A51E45',
  },
});

export const CurrentTarget = props => {
  const { targetItem, score } = props;
  console.log('score', score);
  return (
    <Header rounded style={styles.header}>
      <Left>
        <Title style={styles.titleText}>{`Find a ${targetItem}`}</Title>
      </Left>
      <Right>
        <Text style={styles.titleText}>{`Score: ${score}`}</Text>
      </Right>
    </Header>
  );
};

const mapState = ({ game: { targetItem, score } }) => ({
  targetItem,
  score,
});
const mapDispatch = dispatch => ({
  updateCameraType(type) {
    return dispatch(updateType(type));
  },
});
export default connect(mapState, mapDispatch)(CurrentTarget);
