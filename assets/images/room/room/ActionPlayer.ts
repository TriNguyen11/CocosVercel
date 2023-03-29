import { _decorator, Component, Node, RichText } from "cc";
const { ccclass, property } = _decorator;
import { Room } from "./Room";
@ccclass("ActionPlayer")
export class ActionPlayer extends Component {
  private RoomFake: any;
  static countRaisePressed: number = 0;
  static valueRaiseNumber: number;
  static valueRaiseTemp: number;
  @property(RichText) public valueRaise: RichText = null;

  start() {
    try {
      this.node.getChildByName("raise").getChildByName("Slider").active = false;
    } catch (error) {}
  }
  raise() {
    this.valueRaise.string = `<color=#000000>${
      ActionPlayer.valueRaiseNumber + Room.currentChips - Room.betRound >
      ActionPlayer.valueRaiseTemp
        ? (ActionPlayer.valueRaiseNumber + Room.currentChips - Room.betRound >
          Room.profileUser.chips
            ? Room.profileUser.chips
            : ActionPlayer.valueRaiseNumber + Room.currentChips - Room.betRound
          )?.toString()
        : (ActionPlayer.valueRaiseTemp > Room.profileUser.chips
            ? Room.profileUser.chips
            : ActionPlayer.valueRaiseTemp
          ).toString()
    }</color>`;

    if (this.node.getChildByName("raise").getChildByName("Slider").active) {
      if (
        Room.currentChips -
          Room?.statePlayers[Room.seatPlayerReal].accumulatedBet +
          (ActionPlayer.valueRaiseNumber
            ? ActionPlayer.valueRaiseNumber
            : ActionPlayer.valueRaiseTemp) >=
        Room?.statePlayers[Room.seatPlayerReal]?.chips
      ) {
        Room.roomController.send("ALLIN");
      } else {
        Room.roomController.send("RAISE", {
          chips:
            Room.currentChips -
            Room?.statePlayers[Room.seatPlayerReal].accumulatedBet +
            (ActionPlayer.valueRaiseNumber
              ? ActionPlayer.valueRaiseNumber
              : ActionPlayer.valueRaiseTemp),
        });
      }
      ActionPlayer.countRaisePressed = 0;

      return (this.node
        .getChildByName("raise")
        .getChildByName("Slider").active = false);
    }
    this.node.getChildByName("raise").getChildByName("Slider").active = true;
  }
  async call() {
    console.log("CALL");
    this.node.setScale(0, 0, 0);
    await this.sleep(300);
    Room.roomController.send("CALL");
    ActionPlayer.countRaisePressed = 0;
    setTimeout(() => {
      this.node.setScale(1, 1, 1);
    }, 1000);
  }
  async check() {
    console.log("CHECK");

    this.node.setScale(0, 0, 0);
    await this.sleep(300);
    Room.roomController.send("CHECK");
    ActionPlayer.countRaisePressed = 0;
    setTimeout(() => {
      this.node.setScale(1, 1, 1);
    }, 1000);
  }
  async fold() {
    this.node.setScale(0, 0, 0);
    await this.sleep(400);
    Room.roomController.send("FOLD");
    ActionPlayer.countRaisePressed = 0;
    setTimeout(() => {
      this.node.setScale(1, 1, 1);
    }, 1000);
  }
  async allin() {
    this.node.setScale(0, 0, 0);
    await this.sleep(300);
    Room.roomController.send("ALLIN");
    ActionPlayer.countRaisePressed = 0;
    setTimeout(() => {
      this.node.setScale(1, 1, 1);
    }, 1000);
  }

  handleRaiseSlider(e) {
    ActionPlayer.valueRaiseNumber =
      Math.round(
        (Math.round(e._progress * 100) *
          Room?.statePlayers[Room.seatPlayerReal].chips) /
          100
      ) < ActionPlayer.valueRaiseTemp
        ? ActionPlayer.valueRaiseTemp
        : Math.round(
            (Math.round(e._progress * 100) *
              Room?.statePlayers[Room.seatPlayerReal].chips) /
              100
          );
    this.valueRaise.string = `<color=#000000>${(
      ActionPlayer.valueRaiseNumber + Room.currentChips
    ).toString()}</color>`;
  }
  update(deltaTime: number) {}
  private sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
