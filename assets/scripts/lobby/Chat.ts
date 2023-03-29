import {
  _decorator,
  Button,
  Component,
  EditBox,
  Event,
  EventHandler,
  instantiate,
  Label,
  Layout,
  Node,
  Prefab,
  RichText,
  ScrollView,
  Sprite,
  SpriteFrame,
} from "cc";
import { Lobby } from "db://assets/scripts/Lobby";

const { ccclass, property } = _decorator;

@ccclass("Chat")
export class Chat extends Component {
  @property(ScrollView) public scrollView: ScrollView;

  @property(Layout) public chatSidebarLayout: Layout;
  @property(Node) public friendNode: Node;

  @property(Prefab) public friendListPrefab: Prefab;

  @property(Layout) public chatContentLayout: Layout;

  @property(Node) public chatInputNode: Node;
  @property(EditBox) public chatInput: EditBox;
  @property(Prefab) public emojiPrefab: Prefab;
  @property(Prefab) public senderPrefab: Prefab;
  @property(Prefab) public receiverPrefab: Prefab;

  @property(SpriteFrame) public onlineStatus: SpriteFrame = null;
  @property(SpriteFrame) public offlineStatus: SpriteFrame = null;

  private lobby: Lobby;
  private receiverId: string;

  public onLoad() {
    this.chatInputNode.active = false;
    this.lobby = Lobby.getInstance();
  }

  public async onEnable() {
    this.chatInputNode.active = false;
    this.checkFriendsOnline();
  }

  public async start() {
    this.listenPrivateMessage(); // listen all message
  }

  public update(deltaTime: number) {}

  private checkFriendsOnline() {
    this.lobby.room.send("LOBBY_CHECK_FRIENDS");
  }

  private parseFriendNodes(friendList: any[]) {
    this.chatSidebarLayout.node.removeAllChildren();
    if (!friendList.length) return;
    const fNodes = [];
    friendList.map((friend) => {
      /* handle friend prefabs */
      const friendListPrefabs = instantiate(this.friendListPrefab);
      friendListPrefabs.getComponentInChildren(Label).string =
        friend.username ?? friend.email;
      if (friend.sessionId)
        friendListPrefabs
          .getChildByName("StatusCircle")
          .getComponent(Sprite).spriteFrame = this.onlineStatus;

      /* handle friend nodes */
      const friendNodes = instantiate(this.friendNode);
      friendNodes.addChild(friendListPrefabs);

      // handle click for each friend node
      const clickEventHandler = new EventHandler();
      clickEventHandler.target = this.node;
      clickEventHandler.component = "Chat";
      clickEventHandler.handler = "clickToChat";
      clickEventHandler.customEventData = friend.sessionId;
      const button = friendNodes.getComponent(Button);
      button.clickEvents.push(clickEventHandler);

      fNodes.push(friendNodes);
    });
    for (const fN of fNodes) this.chatSidebarLayout.node.addChild(fN);
  }

  public async clickToChat(e: Event, friendSessionId: string) {
    this.receiverId = friendSessionId;

    const node = e.target as Node;
    const button = node.getComponent(Button);

    if (friendSessionId) {
      this.lobby.room.send("LOBBY_REQUEST_CHAT_FRIEND", friendSessionId);
      this.chatInputNode.active = true;
      this.chatContentLayout.node.active = true;
      button.enabled = false;
      this.chatContentLayout.node.removeAllChildren();
    } else {
      this.chatInputNode.active = false;
      this.chatContentLayout.node.active = false;
      this.chatSidebarLayout.node
        .getComponentsInChildren(Button)
        .forEach((btn) => (btn.enabled = true));
    }
  }

  public openEmoji() {
    // this.chatInputNode.removeAllChildren();
    // const emojiNode = instantiate(this.emojiPrefab);
    // this.chatInputNode.addChild(emojiNode);
  }

  public async sendChat() {
    if (!this.chatInput.string) return;
    const input = this.chatInput.string;

    /* send data to server */
    const receiverId = this.receiverId;
    await this.sendPrivateMessage(receiverId, input);
    /* end send data to server */
    const currentTime = new Date();
    const formatTime =
      this.formatTime(currentTime.getHours().toString()) +
      ":" +
      this.formatTime(currentTime.getMinutes().toString());
    /* add message sending */
    const sendNode = instantiate(this.senderPrefab);
    sendNode
      .getChildByName("SenderChatText")
      .getChildByName("SenderChatLabel")
      .getComponent(Label).string = input;
    sendNode.getChildByName("ChatTime").getComponent(Label).string = formatTime;
    this.chatContentLayout.node.addChild(sendNode);
    this.scrollView.scrollToBottom();
    this.chatInput.string = "";
    /* end add message sending */
  }

  /* Colyseus Chat */
  private sendPrivateMessage(receiverId: string, message: string) {
    this.lobby.room.send("LOBBY_PRIVATE_CHAT", {
      receiverId,
      message,
      time: new Date(),
    });
  }

  private listenPrivateMessage() {
    /* check friend online */
    this.lobby.room.onMessage("LOBBY_CHECK_FRIENDS", (data) => {
      console.log("check friend", data);
      this.parseFriendNodes(data);
    });

    this.lobby.room.onMessage("LOBBY_REQUEST_CHAT_FRIEND", (data) => {
      const { messageIn, messageOut } = data;
      console.log(data);
      this.chatContentLayout.node.removeAllChildren();
      messageIn &&
        messageIn.messages.map((item) => {
          const receivedNode = instantiate(this.receiverPrefab);
          receivedNode.getComponentInChildren(Label).string = item.message;
          receivedNode.getChildByName("ChatTime").getComponent(Label).string =
            this.formatTimeReload(item.time);
          this.chatContentLayout.node.addChild(receivedNode);
        });
      messageOut &&
        messageOut.messages.map((item) => {
          const sendedNode = instantiate(this.senderPrefab);
          sendedNode.getComponentInChildren(Label).string = item.message;
          sendedNode.getChildByName("ChatTime").getComponent(Label).string =
            this.formatTimeReload(item.time);
          this.chatContentLayout.node.addChild(sendedNode);
        });

      this.scrollView.scrollToBottom();
      this.chatInputNode.active = true;
    });

    /* send/receive chat message */
    this.lobby.room.onMessage("LOBBY_PRIVATE_CHAT", (data) => {
      const { message, time } = data;

      const receivedNode = instantiate(this.receiverPrefab);
      receivedNode.getComponentInChildren(RichText).string = message;
      receivedNode.getChildByName("ChatTime").getComponent(Label).string = time;
      this.chatContentLayout.node.addChild(receivedNode);
      this.scrollView.scrollToBottom();
      this.chatInputNode.active = true;
    });
  }

  private formatTime(time: string) {
    if (Number(time) < 10) time = "0" + time;
    return time;
  }

  private formatTimeReload(time: number) {
    const timeReloadMessage = new Date(time);
    return (
      this.formatTime(timeReloadMessage.getHours().toString()) +
      ":" +
      this.formatTime(timeReloadMessage.getMinutes().toString())
    );
  }
}
