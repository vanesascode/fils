export type DataContextType = {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setUnfollowModalAppear: React.Dispatch<React.SetStateAction<boolean>>;
  unFollowModalAppear: boolean;
  addBookmarks: boolean;
  setAddBookmarks: React.Dispatch<React.SetStateAction<boolean>>;
  setRemoveBookmarks: React.Dispatch<React.SetStateAction<boolean>>;
  removeBookmarks: boolean;
  setEditThreadMode: React.Dispatch<React.SetStateAction<boolean>>;
  editThreadMode: boolean;
  deleteThreadMode: boolean;
  setDeleteThreadMode: React.Dispatch<React.SetStateAction<boolean>>;
};
