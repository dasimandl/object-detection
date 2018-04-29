import React from 'react';
import { Header } from 'native-base';
import { Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { updatePermission, updateType, setPredictions } from '../../store';

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
  const { targetItem } = props;
  return (
    <Header rounded style={styles.header}>
      <Text style={styles.titleText}>{`Find a ${targetItem}`}</Text>
    </Header>
  );
};

const mapState = ({ game: { targetItem } }) => ({
  targetItem,
});
const mapDispatch = dispatch => ({
  updateCameraType(type) {
    return dispatch(updateType(type));
  },
});
export default connect(mapState, mapDispatch)(CurrentTarget);
