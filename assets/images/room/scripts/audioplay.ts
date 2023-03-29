import { _decorator, Component, Node, AudioSource, Button } from "cc";
const { ccclass, property } = _decorator;

@ccclass("audioplay")
export class audioplay extends Component {
  @property(AudioSource) audioFoldSource: AudioSource;
  @property(AudioSource) audioCallSource: AudioSource;
  @property(AudioSource) audioCheckSource: AudioSource;
  @property(AudioSource) audioAllinSource: AudioSource;
  @property(AudioSource) audioRaiseSource: AudioSource;
  @property(AudioSource) audioChatSource: AudioSource;
  @property(AudioSource) audioBackSource: AudioSource;

  @property(Button) btn: Button;

  public handleClick(e, data) {
    switch (data) {
      case "1":
        this.node
          .getChildByName("playingRoom")
          .getChildByName("Button")
          .getChildByName("check")
          .getChildByName("check")
          .getComponent(AudioSource)
          .play();
        break;
      case "2":
        this.node
          .getChildByName("playingRoom")
          .getChildByName("Button")
          .getChildByName("fold")
          .getChildByName("fold")
          .getComponent(AudioSource)
          .play();
        break;
      case "3":
        this.node
          .getChildByName("playingRoom")
          .getChildByName("Button")
          .getChildByName("call")
          .getChildByName("call")
          .getComponent(AudioSource)
          .play();
        break;
      case "4":
        this.node
          .getChildByName("playingRoom")
          .getChildByName("Button")
          .getChildByName("raise")
          .getChildByName("raise")
          .getComponent(AudioSource)
          .play();
        break;
      case "5":
        this.node
          .getChildByName("playingRoom")
          .getChildByName("Button")
          .getChildByName("all in")
          .getChildByName("all-in")
          .getComponent(AudioSource)
          .play();
        break;
      case "6":
        this.node
          .getChildByName("playingRoom")
          .getChildByName("Button")
          .getChildByName("chat")
          .getChildByName("small-click")
          .getComponent(AudioSource)
          .play();
        break;
      case "7":
        this.node
          .getChildByName("playingRoom")
          .getChildByName("Button_back")
          .getChildByName("small-click")
          .getComponent(AudioSource)
          .play();
        break;
      default:
        break;
    }
  }

  pause() {
    // this.audioSource.pause();
  }
}
