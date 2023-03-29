// export interface IPlayer {
//   isLoggedIn: boolean;
//   player: TPlayer;
// }

export type TPlayer = {
  _id: string;
  username?: string;
  email?: string;
  chips: number;
  avatar?: string;
};
