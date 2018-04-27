import { Camera, Permissions, ImageManipulator } from 'expo';

export default class Game {

  init = async () => {
    console.log('inside Game Init');

  }

  snap = async () => {
     console.log('inside game snap')
     if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      console.log('photo', photo);
      this.setState({ uri: photo.uri });
      let manipulatedImage = await ImageManipulator.manipulate(
        photo.uri,
        [{ resize: { height: 512, width: 512 } }],
        { base64: true }
      );
  }

}
