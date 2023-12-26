export type DataContextType = {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setUnfollowModalAppear: React.Dispatch<React.SetStateAction<boolean>>;
  unFollowModalAppear: boolean;

  setEditThreadMode: React.Dispatch<React.SetStateAction<boolean>>;
  editThreadMode: boolean;
};
