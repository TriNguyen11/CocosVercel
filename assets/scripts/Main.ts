import {
  _decorator,
  Component,
  Camera,
  Node,
  Prefab,
  instantiate,
  sys,
} from "cc";
import { Config } from "db://assets/scripts/Config";
import { ELang } from "db://assets/__types__/global.type";

const { ccclass, property } = _decorator;

@ccclass("Main")
export class Main extends Component {
  private static _instance: Main;

  @property(Camera) public mainCamera: Camera;

  @property(Prefab) public loadingPrefab: Prefab;

  @property(Node) public authNode: Node;
  @property(Node) public lobbyNode: Node;

  public readonly initX = 800;
  public readonly initY = 390;
  public readonly horizonAdd = 1700;
  public readonly verticalAdd = 800;

  public player = null;

  public static getInstance() {
    return this._instance;
  }

  public async onLoad() {
    Main._instance = this;
    this.initLocalize();
    this.init();
  }

  public start() {}

  private initLocalize() {
    const defaultLang = sys.localStorage.getItem("lang");
    if (!defaultLang) sys.localStorage.setItem("lang", ELang.en);
    Config.localize(this.node);
  }

  private init() {
    const volume = Number(sys.localStorage.getItem("volume"));
    if (!volume) sys.localStorage.setItem("volume", "0.5");

    this.authNode.active = false;
    this.lobbyNode.active = true;
    this.mainCamera.node.setPosition(this.initX + this.horizonAdd, this.initY);
    console.log("vo main");
    this.checkAuth();
  }

  public initLoading() {
    this.node.removeAllChildren();
    const loadingNode = instantiate(this.loadingPrefab);
    loadingNode.setPosition(this.initX + this.horizonAdd, this.initY);
    this.node.addChild(loadingNode);
    return loadingNode;
  }

  public removeLoading(loadingNode: Node) {
    loadingNode.active = false;
    this.node.removeChild(loadingNode);
  }

  public checkAuth() {
    const token = sys.localStorage.getItem("accessToken");
    if (!token) {
      this.authNode.active = true;
      this.lobbyNode.active = false;
      this.mainCamera.node.setPosition(this.initX, this.initY);
    }
  }

  public update(deltaTime: number) {}

  // private changeScene(scene: EPokerScene) {
  //   tween(this.node)
  //     .to(1, { scale: new Vec3(1, 1, 1) }, { easing: "expoInOut" })
  //     .call(() => director.loadScene(scene))
  //     .start();
  // }
}
