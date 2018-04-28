import { Camera, Permissions, ImageManipulator } from 'expo';
import { setPredictions } from '../../store';
const Clarifai = require('clarifai');
let clarifai = new Clarifai.App({
  apiKey: 'd33b727722384c04adfa7bdf5589e5cf',
});
process.nextTick = setImmediate;

export default class Game {
  init = async () => {
    await console.log('inside Game Init');
  };

  snap = async camera => {
    console.log('inside game snap');
    if (camera) {
      let photo = await camera.takePictureAsync();
      let manipulatedImage = await ImageManipulator.manipulate(
        photo.uri,
        [{ resize: { height: 512, width: 512 } }],
        { base64: true }
      );
      return manipulatedImage.base64;
    }
  };
  predict = async image => {
    const predictions = await clarifai.models
      .predict(Clarifai.GENERAL_MODEL, image)
      .then(data => data.outputs[0].data.concepts)
      .catch(err => console.log('this is error', err));
    return predictions;
  };
}
