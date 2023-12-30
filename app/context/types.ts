export type DataContextType = {
  threadToBeDeleted: string;
  setThreadToBeDeleted: React.Dispatch<React.SetStateAction<string>>;

  setUnfollowModalAppear: React.Dispatch<React.SetStateAction<boolean>>;
  unFollowModalAppear: boolean;

  setEditThreadMode: React.Dispatch<React.SetStateAction<boolean>>;
  editThreadMode: boolean;

  deleteThreadMode: boolean;
  setDeleteThreadMode: React.Dispatch<React.SetStateAction<boolean>>;

  threadToBeEdited: string;
  setThreadToBeEdited: React.Dispatch<React.SetStateAction<string>>;
};
