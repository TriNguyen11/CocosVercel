import {
  _decorator,
  assetManager,
  AudioSource,
  Component,
  ImageAsset,
  Node,
  SpriteFrame,
  sys,
  Texture2D,
} from "cc";
import { EPokerNode } from "db://assets/__types__/layout.type";
import { Main } from "db://assets/scripts/Main";
import { NetworkManager } from "db://assets/scripts/NetworkManager";
import { ERoomName } from "db://assets/__types__/room.type";
import { Config } from "db://assets/scripts/Config";
import Colyseus from "db://colyseus-sdk/colyseus.js";

const { ccclass, property } = _decorator;

@ccclass("Lobby")
export class Lobby extends Component {
  private static _instance: Lobby = null;

  public nodes: Node[] = [];

  @property(Node) public homeNode: Node;
  @property(Node) public selectRoomNode: Node;
  @property(Node) public profileRoomNode: Node;
  @property(Node) public settingRoomNode: Node;
  @property(Node) public rankRoomNode: Node;
  @property(Node) public rewardRoomNode: Node;
  // List avatar
  @property(SpriteFrame) public avatar_1_Profile: SpriteFrame = null;
  @property(SpriteFrame) public avatar_2_Profile: SpriteFrame = null;
  @property(SpriteFrame) public avatar_3_Profile: SpriteFrame = null;
  @property(SpriteFrame) public avatar_4_Profile: SpriteFrame = null;
  @property(SpriteFrame) public avatar_5_Profile: SpriteFrame = null;
  @property(SpriteFrame) public avatar_6_Profile: SpriteFrame = null;

  public client!: Colyseus.Client;
  public roomClient!: Colyseus.Client;
  public room!: Colyseus.Room;

  public main: Main;

  public player = null;

  public static getInstance() {
    return this._instance;
  }

  public async onLoad() {
    Lobby._instance = this;
    this.nodes = this.node.children;
    this.nodes.forEach((node) => (node.active = false));
    this.main = Main.getInstance();
  }

  public async onEnable() {}

  public async start() {
    // console.log(this.node.getPosition());
    await this.handleAuth();
    const endpoint = Config.BASE_GAME_WEBSOCKET;
    this.client = new Colyseus.Client(endpoint);
    this.roomClient = new Colyseus.Client(endpoint);
    await this.connectWebsocket();

    // this.main.removeLoading(this.main.initLoading());
  }

  public update(deltaTime: number) {}

  private async handleAuth() {
    this.player = await Config.fetchData(
      "GET",
      `${Config.BASE_CMS_END_POINT}/user`
    );
    if (!this.player) {
      this.node.active = false;
      this.main.mainCamera.node.setPosition(
        this.main.initX + this.main.horizonAdd,
        this.main.initY
      );
      return;
    }
    this.homeNode.active = true;
  }

  private async connectWebsocket() {
    const reconnectId = sys.localStorage.getItem("reconnectId");
    if (!reconnectId) return await this.joinLobby();
    return await this.reconnectLobby(reconnectId);
  }

  private async joinLobby() {
    const { _id, username } = this.player;
    try {
      this.room = await this.client.joinOrCreate(ERoomName.lobby, {
        _id,
        username,
      });
      // console.log("create successfully to Lobby ROOM!", this.room);
      // console.log("user's sessionId:", this.room.sessionId);
      this.setReconnectId(this.room.sessionId);
    } catch (e) {
      console.error(e);
    }
  }

  private async reconnectLobby(reconnectId: string) {
    try {
      this.room = await this.client.reconnect("zunohandsome", reconnectId);
      // console.log("reconnect successfully to Lobby ROOM!", this.room);
      // console.log("user's sessionId:", this.room.sessionId);
    } catch (e) {
      console.error(e);
      await this.joinLobby();
    }
  }

  private setReconnectId(reconnectId: string) {
    sys.localStorage.setItem("reconnectId", reconnectId);
  }

  public directorCamera(node: string) {
    let positionDirectorY = this.main.initY;
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].name === node) {
        switch (this.nodes[i].name) {
          case EPokerNode.HomeUI:
            positionDirectorY = this.main.initY;
            console.log(positionDirectorY);
            break;
          case EPokerNode.SelectRoomUI:
            positionDirectorY =
              this.selectRoomNode.position.y + this.main.initY;
            break;
          case EPokerNode.ProfileUI:
            positionDirectorY =
              this.profileRoomNode.position.y + this.main.initY;
            break;
          case EPokerNode.SettingUI:
            positionDirectorY =
              this.settingRoomNode.position.y + this.main.initY;
            break;
          case EPokerNode.RankUI:
            positionDirectorY = this.rankRoomNode.position.y + this.main.initY;
            break;
          case EPokerNode.RewardUI:
            positionDirectorY =
              this.rewardRoomNode.position.y + this.main.initY;
            break;

          default:
            break;
        }
        console.log(positionDirectorY);
        Config.localize(this.nodes[i]);
        this.nodes[i].active = true;
        this.main.mainCamera.node.setPosition(
          this.main.initX + this.main.horizonAdd,
          positionDirectorY
        );
      } else {
        this.nodes[i].active = false;
      }
    }
  }

  public setAvatar(spirteFrameAvatar: SpriteFrame, avatar: string) {
    // console.log(avatar, "12313123");
    // console.log(spirteFrameAvatar, "SpriteFrame");

    switch (avatar) {
      case "default-avatar.png":
        spirteFrameAvatar = this.avatar_1_Profile;
        break;
      case "ava2":
        spirteFrameAvatar = this.avatar_2_Profile;

        break;
      case "ava3":
        spirteFrameAvatar = this.avatar_3_Profile;

        break;
      case "ava4":
        spirteFrameAvatar = this.avatar_4_Profile;

        break;
      case "ava5":
        spirteFrameAvatar = this.avatar_5_Profile;

        break;
      case "ava6":
        spirteFrameAvatar = this.avatar_6_Profile;

        break;

      default:
        assetManager.loadRemote<ImageAsset>(
          avatar,
          (err: any, imageAsset: ImageAsset) => {
            const spriteFrame = new SpriteFrame();
            const texture = new Texture2D();
            texture.image = imageAsset;
            spriteFrame.texture = texture;

            spirteFrameAvatar = spriteFrame;
          }
        );
        break;
    }
    console.log(spirteFrameAvatar, "LALALALALLAL");

    return spirteFrameAvatar;
  }
}
