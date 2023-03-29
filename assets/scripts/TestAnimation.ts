import { _decorator, Component, Animation } from "cc";

const { ccclass, property } = _decorator;

@ccclass("TestAnimation")
export class TestAnimation extends Component {
  public start() {
    const animation = this.getComponent(Animation);
    console.log(animation);
    animation.play("rotation");
  }

  public update(deltaTime: number) {}
}
