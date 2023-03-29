import {
  _decorator,
  assetManager,
  Button,
  Component,
  EditBox,
  ImageAsset,
  Label,
  native,
  Sprite,
  SpriteFrame,
  sys,
  Texture2D,
} from "cc";
import { Config } from "db://assets/scripts/Config";
import { EPokerNode } from "db://assets/__types__/layout.type";
import { Lobby } from "db://assets/scripts/Lobby";

const { ccclass, property } = _decorator;
const { copyTextToClipboard } = native;

@ccclass("Profile")
export class Profile extends Component {
  @property(Label) public name_Profile: Label;
  @property(Label) public referral_Profile: Label;
  @property(Label) public date_Profile: Label;
  @property(EditBox) public addressWallet_Profile: EditBox;

  public userModel = null;
  public avatar_Profile: SpriteFrame = null;

  private lobby: Lobby;

  public async onLoad() {
    this.lobby = Lobby.getInstance();
    await this.init();
  }

  public onEnable() {}

  public async start() {
    this.node.getChildByName("Profile").getChildByName("PopupAvatar").active =
      false;
    this.node.getChildByName("Profile").getChildByName("PopupName").active =
      false;
    this.node
      .getChildByName("Profile")
      .getChildByName("PopupWarningChangeData").active = false;
  }

  private async init() {
    this.userModel = this.lobby.player;
    this.renderProfile(this.userModel);
  }

  public setupProperty() {
    this.avatar_Profile = this.node
      .getChildByName("Profile")
      .getChildByName("DetailBox")
      .getChildByName("Avatar")
      .getComponent(Sprite).spriteFrame;

    this.name_Profile = this.node
      .getChildByName("Profile")
      .getChildByName("DetailBox")
      .getChildByName("Content")
      .getChildByName("UserName")
      .getChildByName("Display")
      .getComponent(Label);

    this.addressWallet_Profile = this.node
      .getChildByName("Profile")
      .getChildByName("DetailBox")
      .getChildByName("Content")
      .getChildByName("WalletAddress")
      .getChildByName("EditBox")
      .getComponent(EditBox);
  }

  public renderProfile(userInfo: any) {
    this.setupProperty();

    const date = new Date(userInfo.createdAt);

    const day = this.formatTime(date.getDate().toString());
    let month = this.formatTime(date.getMonth().toString());
    const year = date.getFullYear().toString();

    this.node
      .getChildByName("Profile")
      .getChildByName("DetailBox")
      .getChildByName("Avatar")
      .getComponent(Sprite).spriteFrame = this.lobby.setAvatar(
      this.avatar_Profile,
      userInfo.avatar
    );

    this.node
      .getChildByName("Profile")
      .getChildByName("DetailBox")
      .getChildByName("Content")
      .getChildByName("StartDate")
      .getChildByName("Labeldate")
      .getComponent(Label).string = `${day}/${month}/${year}`;

    this.name_Profile.string = userInfo.username;
    !userInfo.addressWallet
      ? (this.addressWallet_Profile.string = "")
      : (this.addressWallet_Profile.string = userInfo.addressWallet);
    // this.avatar_Profile.name = userInfo.avatar;
  }

  public formatTime(time: string) {
    if (Number(time) < 10) {
      time = "0" + time;
    }
    return time;
  }

  public handleOpenPopupEditName() {
    this.node.getChildByName("Profile").getChildByName("PopupName").active =
      true;

    this.node
      .getChildByName("Profile")
      .getChildByName("PopupName")
      .getChildByName("Popup")
      .getChildByName("EditBox_ChangeName")
      .getComponent(EditBox).string = this.userModel.username.trim();
  }

  public handleClosePopupEditName(e, data) {
    if (data !== "cancel") {
      if (
        this.node
          .getChildByName("Profile")
          .getChildByName("PopupName")
          .getChildByName("Popup")
          .getChildByName("EditBox_ChangeName")
          .getComponent(EditBox)
          .string.trim() !== ""
      ) {
        this.name_Profile.string = this.node
          .getChildByName("Profile")
          .getChildByName("PopupName")
          .getChildByName("Popup")
          .getChildByName("EditBox_ChangeName")
          .getComponent(EditBox).string;
      }
    }
    this.node.getChildByName("Profile").getChildByName("PopupName").active =
      false;
  }

  public handleOpenPopupChangeAvatar() {
    this.node.getChildByName("Profile").getChildByName("PopupAvatar").active =
      true;
  }

  public handleClosePopupChangeAvatar() {
    this.node.getChildByName("Profile").getChildByName("PopupAvatar").active =
      false;
  }

  public handleChangeAvatar(e, data) {
    this.node
      .getChildByName("Profile")
      .getChildByName("DetailBox")
      .getChildByName("Avatar")
      .getComponent(Sprite).spriteFrame = this.lobby.setAvatar(
      this.avatar_Profile,
      data
    );

    this.node.getChildByName("Profile").getChildByName("PopupAvatar").active =
      false;
  }

  public async handleSaveProfile() {
    const dataIsChange = this.checkInfoIsChange();
    const avatar = this.userModel.avatar;
    const avatarProfile = this.node
      .getChildByName("Profile")
      .getChildByName("DetailBox")
      .getChildByName("Avatar")
      .getComponent(Sprite).spriteFrame.name;

    if (dataIsChange || avatar != avatarProfile) {
      const usernameProfile = this.name_Profile.string;
      const addressWallet = this.addressWallet_Profile.string;

      const avatar = this.node
        .getChildByName("Profile")
        .getChildByName("DetailBox")
        .getChildByName("Avatar")
        .getComponent(Sprite).spriteFrame.name;

      const dataSave = {
        uname: usernameProfile,
        addressWallet: addressWallet,
        ava: avatar,
      };
      console.log("VO NE");
      this.node
        .getChildByName("Profile")
        .getChildByName("BackBtn")
        .getComponent(Button).enabled = false;
      const updateUser = await Config.fetchData(
        "PUT",
        Config.BASE_CMS_END_POINT + "/user",
        JSON.stringify(dataSave)
      );

      if (updateUser.success) {
        this.disableButton();
        this.node
          .getChildByName("Profile")
          .getChildByName("PopupErrorData").active = true;
        this.node
          .getChildByName("Profile")
          .getChildByName("PopupErrorData")
          .getChildByName("Layout")
          .getChildByName("TitlePopup")
          .getComponent(Label).string = updateUser.message;
        this.userModel.username = this.name_Profile.string;
        this.userModel.addressWallet = this.addressWallet_Profile.string;
        this.userModel.avatar = this.node
          .getChildByName("Profile")
          .getChildByName("DetailBox")
          .getChildByName("Avatar")
          .getComponent(Sprite).spriteFrame.name;

        console.log(this.userModel);
      }
    }
  }

  public disableButton() {
    this.node
      .getChildByName("Profile")
      .getChildByName("BackBtn")
      .getComponent(Button).enabled = false;
    this.node
      .getChildByName("Profile")
      .getChildByName("Save")
      .getComponent(Button).enabled = false;
    const listButtonInDetailBox = this.node
      .getChildByName("Profile")
      .getChildByName("DetailBox")
      .getComponentsInChildren(Button);
    for (let button of listButtonInDetailBox) {
      button.enabled = false;
    }
  }

  public enableButton() {
    this.node
      .getChildByName("Profile")
      .getChildByName("BackBtn")
      .getComponent(Button).enabled = true;
    this.node
      .getChildByName("Profile")
      .getChildByName("Save")
      .getComponent(Button).enabled = true;
    const listButtonInDetailBox = this.node
      .getChildByName("Profile")
      .getChildByName("DetailBox")
      .getComponentsInChildren(Button);
    for (let button of listButtonInDetailBox) {
      button.enabled = true;
    }
  }

  public handleBackSence() {
    const dataIsChange = this.checkInfoIsChange();
    const avatar = this.userModel.avatar;
    const avatarProfile = this.node
      .getChildByName("Profile")
      .getChildByName("DetailBox")
      .getChildByName("Avatar")
      .getComponent(Sprite).spriteFrame.name;

    if (dataIsChange || avatar != avatarProfile) {
      this.node
        .getChildByName("Profile")
        .getChildByName("PopupWarningChangeData").active = true;
      this.node
        .getChildByName("Profile")
        .getChildByName("PopupWarningChangeData")
        .getChildByName("Layout")
        .getChildByName("TitlePopup")
        .getComponent(Label).string =
        "Information is subject to change. Do you want to save it?";
    } else {
      this.node
        .getChildByName("Profile")
        .getChildByName("DetailBox")
        .getChildByName("Avatar")
        .getComponent(Sprite).spriteFrame = this.lobby.setAvatar(
        this.node
          .getChildByName("Profile")
          .getChildByName("DetailBox")
          .getChildByName("Avatar")
          .getComponent(Sprite).spriteFrame,
        avatar
      );

      this.lobby.directorCamera(EPokerNode.HomeUI);
    }
  }

  public async handleSaveChange(e, data) {
    if (data === "1") {
      const usernameProfile = this.name_Profile.string;
      const addressWallet = this.addressWallet_Profile.string;
      const avatar = this.node
        .getChildByName("Profile")
        .getChildByName("DetailBox")
        .getChildByName("Avatar")
        .getComponent(Sprite).spriteFrame.name;

      const dataSave = {
        uname: usernameProfile,
        addressWallet: addressWallet,
        ava: avatar,
      };

      const updateUser = await Config.fetchData(
        "PUT",
        Config.BASE_CMS_END_POINT + "/user",
        JSON.stringify(dataSave)
      );

      if (updateUser.success) {
        this.userModel.avatar = this.node
          .getChildByName("Profile")
          .getChildByName("DetailBox")
          .getChildByName("Avatar")
          .getComponent(Sprite).spriteFrame.name;
        this.userModel.username = usernameProfile;
        this.userModel.addressWallet = addressWallet;
      }
    } else {
      this.node
        .getChildByName("Profile")
        .getChildByName("DetailBox")
        .getChildByName("Avatar")
        .getComponent(Sprite).spriteFrame = this.lobby.setAvatar(
        this.node
          .getChildByName("Profile")
          .getChildByName("DetailBox")
          .getChildByName("Avatar")
          .getComponent(Sprite).spriteFrame,
        this.userModel.avatar
      );
      this.name_Profile.string = this.userModel.username;
      this.addressWallet_Profile.string = this.userModel.addressWallet;
    }
    this.node
      .getChildByName("Profile")
      .getChildByName("PopupWarningChangeData").active = false;
    this.lobby.directorCamera(EPokerNode.HomeUI);
  }

  public handlePopupError() {
    this.enableButton();
    this.node
      .getChildByName("Profile")
      .getChildByName("PopupErrorData").active = false;
  }

  public handleCopy() {
    const referralLink = this.referral_Profile.string;
    if (sys.isNative) {
      console.log("Mobile");
      copyTextToClipboard("12313123131231223");
    } else {
      console.log("Chrome");
      navigator.clipboard.writeText(referralLink);
    }
  }

  public checkInfoIsChange() {
    const username = this.userModel.username;
    const addressWallet = this.userModel.addressWallet;

    // After change Info
    const usernameProfile = this.name_Profile.string;
    const addressWalletProfile = this.addressWallet_Profile.string;

    if (username != usernameProfile || addressWallet != addressWalletProfile) {
      return true;
    }
    return false;
  }

  public handleLogout() {
    sys.localStorage.clear();
    // this.network.room.leave();
    // director.loadScene(EPokerScene.LoginAuth);
  }
}
