import {
  _decorator,
  Button,
  Component,
  instantiate,
  Label,
  Node,
  Prefab,
  Sprite,
  sys,
  director,
} from "cc";
import { EPokerNode } from "db://assets/__types__/layout.type";
import { Config } from "db://assets/scripts/Config";
import { ELang } from "../../__types__/global.type";
import { Lobby } from "db://assets/scripts/Lobby";
import { Main } from "db://assets/scripts/Main";
import { Room } from "../../images/room/room/Room";
import { ERoomName } from "../../__types__/room.type";
import { ActionPlayer } from "../../images/room/room/ActionPlayer";
import Colyseus from "db://colyseus-sdk/colyseus.js";

const { ccclass, property } = _decorator;

@ccclass("Home")
export class Home extends Component {
  @property(Node) public homeScreenNode: Node;
  @property(Node) public chatScreenNode: Node;

  @property(Prefab) public popUpPrefab: Prefab;

  public main: Main;
  public lobby: Lobby;

  public async onLoad() {
    this.chatScreenNode.active = false;
    this.main = Main.getInstance();
    this.lobby = Lobby.getInstance();
  }

  public onEnable() {
    this.lobby = Lobby.getInstance();
    const avatar = this.lobby.player.avatar;

    this.setAvatar(avatar);
    this.init();
  }

  public start() {
    console.log("qua home!");
    this.init();
  }

  private init() {
    const chips = this.lobby.player.chips;
    this.node
      .getChildByName("Home")
      .getChildByName("PlayerInfo")
      .getComponentInChildren(Label).string =
      Config.formatCurrency(chips).toString();
  }

  public update(deltaTime: number) {}

  public goProfile() {
    this.lobby.directorCamera(EPokerNode.ProfileUI);
  }

  // public goWatch() {
  //   this.lobby.directorCamera(EPokerNode.WatchUI);
  // }

  public goSetting() {
    this.lobby.directorCamera(EPokerNode.SettingUI);
  }

  public goSelectRoom() {
    this.lobby.directorCamera(EPokerNode.SelectRoomUI);
  }

  public goReward() {
    this.lobby.directorCamera(EPokerNode.RewardUI);
  }

  // public goMailBox() {
  //   this.lobby.directorCamera(EPokerNode.MailBoxUI);
  // }

  public goRank() {
    this.lobby.directorCamera(EPokerNode.RankUI);
  }

  public async goChat() {
    this.chatScreenNode.active = true;
    this.node.getChildByName("Home").getChildByName("NotiMess").active = false;
    this.switchEnableHomeBtn(false);
  }

  public goBackHomeFromChat() {
    this.chatScreenNode.active = false;
    this.switchEnableHomeBtn(true);
  }

  public popUp() {
    this.switchEnableHomeBtn(false);
    const popUp = instantiate(this.popUpPrefab);
    this.node.addChild(popUp);
    popUp.getComponentInChildren(Label).string = "hahaha";
    const btn = popUp.getComponentInChildren(Button);
    btn.node.on(
      Button.EventType.CLICK,
      () => {
        console.log(234234234);
        popUp.active = false;
        this.switchEnableHomeBtn(true);
      },
      popUp
    );
  }

  public async playNow() {
    // this.client = new Colyseus.Client(endpoint);
    // director.preloadScene("Room", async () => {
    //   this.lobby.room.leave(true);
    //   const room = this.lobby.roomClient()
    //   // connect ws game room
    //   try {
    //     const room = Room.getInstance();
    //     // console.log(player, "check player real");
    //     // console.log(this.room);
    //     const player = this.lobby.player;
    //     const { chips } = player;
    //     room.profileUser = player;
    //     let roomLevel: ERoomName;
    //     if (chips >= 50000 && chips < 200000) {
    //       roomLevel = ERoomName.noob;
    //       ActionPlayer.valueRaiseTemp = 1000;
    //       ActionPlayer.valueRaiseNumber = 1000;
    //       room.currentChips = 1000;
    //       room.chiplevel = 1000;
    //       room.minChipToStay = 50000;
    //     } else if (chips >= 200000 && chips < 500000) {
    //       roomLevel = ERoomName.normal;
    //       ActionPlayer.valueRaiseTemp = 5000;
    //       ActionPlayer.valueRaiseNumber = 5000;
    //       room.currentChips = 5000;
    //       room.chiplevel = 5000;
    //       room.minChipToStay = 200000;
    //     } else if (chips >= 500000) {
    //       roomLevel = ERoomName.pro;
    //       ActionPlayer.valueRaiseTemp = 10000;
    //       ActionPlayer.valueRaiseNumber = 10000;
    //       Room.currentChips = 10000;
    //       Room.chiplevel = 10000;
    //       Room.chiplevel = 500000;
    //     } else return;
    //     const jwt = await sys.localStorage.getItem("accessToken");
    //     room.roomController = await roomClient.joinOrCreate(roomLevel, {
    //       jwt,
    //     });
    //     console.log(room.roomController, " Room.roomController");
    //   } catch (err) {
    //     console.error(err);
    //   }
    // });
    // director.loadScene("Room");
  }

  public logOut() {
    sys.localStorage.removeItem("accessToken");
    sys.localStorage.removeItem("reconnectId");
    this.lobby.room.leave(true);
  }

  public switchLang() {
    if (Config.getLang() === ELang.en) Config.setLang(ELang.vn);
    else if (Config.getLang() === ELang.vn) Config.setLang(ELang.en);
    Config.localize(this.node);
  }

  public setAvatar(avatar: any) {
    this.node
      .getChildByName("Home")
      .getChildByName("PlayerInfo")
      .getChildByName("Avatar")
      .getComponent(Sprite).spriteFrame = this.lobby.setAvatar(
      this.node
        .getChildByName("Home")
        .getChildByName("PlayerInfo")
        .getChildByName("Avatar")
        .getComponent(Sprite).spriteFrame,
      avatar
    );
  }

  private switchEnableHomeBtn(enabled: boolean) {
    const allBtn = this.homeScreenNode.getComponentsInChildren(Button);
    for (let btn of allBtn.values()) btn.enabled = enabled;
  }

  private listenChatMessage() {
    this.lobby.room.onMessage("LOBBY_PRIVATE_CHAT", (data) => {
      if (data) this.node.getChildByName("NotiMess").active = true;
    });
  }
}
