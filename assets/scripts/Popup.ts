import { _decorator, Component, Node, tween, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Popup")
export class Popup extends Component {
  public onLoad() {
    tween(this.node)
      .to(0.5, { scale: new Vec3(0, 0, 0) }, { easing: "quadInOut" })
      .to(0.5, { scale: new Vec3(1, 1, 1) }, { easing: "quadInOut" })
      .start();
  }

  public start() {}

  public update(deltaTime: number) {}

  public test() {
    console.log(3232);
  }
}
