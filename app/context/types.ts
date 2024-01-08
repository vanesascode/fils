export type DataContextType = {
  threadToBeDeleted: string;
  setThreadToBeDeleted: React.Dispatch<React.SetStateAction<string>>;

  setEditThreadMode: React.Dispatch<React.SetStateAction<boolean>>;
  editThreadMode: boolean;

  deleteThreadMode: boolean;
  setDeleteThreadMode: React.Dispatch<React.SetStateAction<boolean>>;

  threadToBeEdited: string;
  setThreadToBeEdited: React.Dispatch<React.SetStateAction<string>>;

  colorMode: string;
  setColorMode: React.Dispatch<React.SetStateAction<string>>;
};
