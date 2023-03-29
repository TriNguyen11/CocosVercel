import { _decorator, Component, Node, sys, director } from "cc";
const { ccclass, property } = _decorator;

import Colyseus from "db://colyseus-sdk/colyseus.js";
import { Lobby } from "db://assets/scripts/Lobby";
import { Room } from "../images/room/room/Room";
import { ERoomName } from "../__types__/room.type";
import { ActionPlayer } from "../images/room/room/ActionPlayer";
import { Config } from "./Config";

@ccclass("NetworkManager")
export class NetworkManager extends Component {
  private static _instance: NetworkManager;

  @property hostname = "localhost";
  // @property port = 9000;
  @property useSSL = false;

  client!: Colyseus.Client;
  room!: Colyseus.Room;

  public static getInstance() {
    if (!this._instance) this._instance = new NetworkManager();
    return this._instance;
  }

  onLoad() {
    NetworkManager._instance = this;
  }

  start() {
    // NetworkManager._instance = this;
    // // Instantiate Colyseus Client
    // // connects into (ws|wss)://hostname[:port]
    // // const endpoint = `${this.useSSL ? "wss" : "ws"}://${this.hostname}${
    // //   [443, 80].includes(this.port) || this.useSSL ? "" : `:${this.port}`
    // // }`;
    // // console.log(endpoint);
    // this.client = new Colyseus.Client(endpoint);
    // this.connect();
    // Connect into the room
  }

  async connect() {
    const lobby = Lobby.getInstance();
    console.log(lobby, "lobby");
    const { _id, username } = lobby.player;
    try {
      this.room = await this.client.joinOrCreate("nooob", {
        _id,
        username,
      });
      console.log(this.room, "this room");

      console.log("joined successfully!");
      console.log("user's sessionId:", this.room.sessionId);

      this.room.onStateChange((state) => {
        console.log("onStateChange: ", state);
      });

      this.room.onLeave((code) => {
        console.log("onLeave:", code);
      });
    } catch (e) {
      console.error(e);
    }
  }
  public async joinGameRoom() {
    try {
      // console.log(player, "check player real");

      this.client = new Colyseus.Client(Config.BASE_GAME_WEBSOCKET);

      const { player } = Lobby.getInstance();
      const { chips } = player;
      Room.profileUser = player;
      console.log(Room.profileUser);
      console.log(player, "playerplayerplayer");
      let roomLevel: ERoomName;
      if (chips >= 50000 && chips < 200000) {
        roomLevel = ERoomName.noob;
        ActionPlayer.valueRaiseTemp = 1000;
        ActionPlayer.valueRaiseNumber = 1000;
        Room.currentChips = 1000;
        Room.chiplevel = 1000;
        Room.minChipToStay = 50000;
      } else if (chips >= 200000 && chips < 500000) {
        roomLevel = ERoomName.normal;
        ActionPlayer.valueRaiseTemp = 5000;
        ActionPlayer.valueRaiseNumber = 5000;
        Room.currentChips = 5000;
        Room.chiplevel = 5000;
        Room.minChipToStay = 200000;
      } else if (chips >= 500000) {
        roomLevel = ERoomName.pro;
        ActionPlayer.valueRaiseTemp = 10000;
        ActionPlayer.valueRaiseNumber = 10000;
        Room.currentChips = 10000;
        Room.chiplevel = 10000;
        Room.minChipToStay = 500000;
      } else return;
      const jwt = sys.localStorage.getItem("accessToken");

      Room.roomController = await this.client.joinOrCreate(roomLevel, { jwt });
      console.log(Room.roomController, "Room vRoom.roomController");
      await director.loadScene("Room");
    } catch (err) {
      console.error(err);
    }
  }
}
