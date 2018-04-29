import { ImageManipulator } from 'expo';
import { setPredictions } from '../../store';
import scavengerClasses from './scavenger-classes';
const Clarifai = require('clarifai');
let clarifai = new Clarifai.App({
  apiKey: 'd33b727722384c04adfa7bdf5589e5cf',
});
process.nextTick = setImmediate;

export default class Game {
  constructor() {
    this.start = this.start.bind(this);
    this.snap = this.snap.bind(this);
    this.stop = this.stop.bind(this);
    this.predict = this.predict.bind(this);
    this.getTargetItem = this.getTargetItem.bind(this);
  }
  init = async () => {
    await console.log('inside Game Init');
  };

  snap = async camera => {
    console.log('inside game snap', camera);
    if (camera) {
      console.log('camera is available');
      let photo = await camera.takePictureAsync();
      console.log('photo is', photo);
      let manipulatedImage = await ImageManipulator.manipulate(
        photo.uri,
        [{ resize: { height: 512, width: 512 } }],
        { base64: true }
      );
      return manipulatedImage.base64;
    }
  };
  predict = async image => {
    console.log('inside predict');
    const predictions = await clarifai.models
      .predict(Clarifai.GENERAL_MODEL, image)
      .then(data => data.outputs[0].data.concepts)
      .catch(err => console.log('this is error', err));
    return predictions;
  };
  getTargetItem = () => {
    const keys = Object.keys(scavengerClasses);
    const numberOfItems = keys.length;
    const randomIndex = Math.floor(Math.random() * numberOfItems);
    return scavengerClasses[keys[randomIndex]];
  };

  start = async camera => {
    console.log('inside start', camera);
    const interval = setInterval(async () => {
      await this.predict(await this.snap(camera));
    }, 3000);
    return interval;
  };

  stop = intervalId => {
    clearInterval(intervalId);
  };
}
