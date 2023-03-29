import { _decorator, Component, ProgressBar, RichText } from "cc";

const { ccclass, property } = _decorator;

@ccclass("Loading")
export class Loading extends Component {
  @property(ProgressBar) public progressBar: ProgressBar;
  @property(RichText) public percentage: RichText;

  public onLoad() {
    this.percentage.string = "0 %";
  }

  public start() {}

  public update(deltaTime: number) {
    // 16.67ms ~ 60fps
    if (this.progressBar.progress < 0 || this.progressBar.progress >= 1.0)
      return;
    this.progressBar.progress += deltaTime * 2;
    this.percentage.string = `${Math.ceil(
      this.progressBar.progress < 1 ? this.progressBar.progress * 100 : 100
    )} %`;
  }
}
