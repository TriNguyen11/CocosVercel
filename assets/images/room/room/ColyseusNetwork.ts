import { _decorator, Component, sys, director } from "cc";
import Colyseus from "db://colyseus-sdk/colyseus.js";
import { ERoomName } from "db://assets/__types__/room.type";
import { Room } from "./Room";
import { ActionPlayer } from "./ActionPlayer";
const { ccclass, property } = _decorator;

@ccclass("ColyseusNetwork")
export class ColyseusNetwork extends Component {
  @property public hostname: string;
  private port = 9000;
  @property public useSSL = false;

  private static _instance: ColyseusNetwork;
  public client: Colyseus.Client;
  public room: Colyseus.Room;

  private constructor() {
    super();
  }

  public static getInstance() {
    if (!this._instance) this._instance = new ColyseusNetwork();
    return this._instance;
  }

  /* LIFE CYCLE AND FUNCTION */
  public onLoad() {
    // Instantiate Colyseus Client
    ColyseusNetwork._instance = this;
  }

  public async start() {
    // connects into (ws|wss)://hostname[:port]
    const endpoint =
      `${this.useSSL ? "wss" : "ws"}://${this.hostname}` +
      `${!this.useSSL && ":" + this.port}`;

    this.client = new Colyseus.Client(endpoint);
    // await this.joinLobbyRoom();
  }

  public async joinLobbyRoom(player: any) {
    try {
      const { _id, username } = player;
      this.room = await this.client.joinOrCreate(ERoomName.lobby, {
        _id,
        username,
      });
      // console.log("joined successfully to Lobby ROOM!", this.room);
      // console.log("user's sessionId:", this.room.sessionId);
    } catch (error) {
      console.error(error);
    }
  }

  public async joinGameRoom(player: any) {
    try {
      // console.log(player, "check player real");
      // console.log(this.room);
      const { chips } = player;
      Room.profileUser = player;
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
        Room.chiplevel = 500000;
      } else return;
      const jwt = sys.localStorage.getItem("accessToken");
      Room.roomController = await this.client.joinOrCreate(roomLevel, { jwt });
    } catch (err) {
      console.error(err);
    }
  }
}
