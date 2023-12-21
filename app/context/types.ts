export type DataContextType = {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setModalAppear: React.Dispatch<React.SetStateAction<boolean>>;
  modalAppear: boolean;
};
