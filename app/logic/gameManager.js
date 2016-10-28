import { observable, action, computed, autorun } from 'mobx';
import { InteractionManager } from 'react-native';
export default class GameManager {

  @observable
  encodedSignature = null;


  @observable
  levelCount = 0;


  @action
  startGame(){
    this.levelCount = 1;
  }

  @action
  updateSignature(base64Image){
    console.log(base64Image)
    this.encodedSignature = base64Image;
  }
}
