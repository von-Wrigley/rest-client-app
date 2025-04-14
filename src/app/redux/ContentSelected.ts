import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ResponseDet = {
  resOk: boolean;
  resStatus: number;
};

type InitState = {
  method: string;
  inputURL: string;
  bodyReq: string;
  bodyRes: string;
  details: ResponseDet[];
  generateCode: string[];
  selectedLang: string;
  headers: Record<string, string>[];
};

type State = {
  selectedContent: InitState;
};

const initialState: State = {
  selectedContent: {
    method: "",
    inputURL: "",
    bodyReq: "",
    bodyRes: "",
    details: [],
    generateCode: [],
    selectedLang: "",
    headers: [],
  },
};

const StoreSelectedSlice = createSlice({
  name: "selectedItems",
  initialState,
  reducers: {
    addMethod: (state, action: PayloadAction<string>) => {
      state.selectedContent.method = action.payload;
    },
    addInputURL: (state, action: PayloadAction<string>) => {
      state.selectedContent.inputURL = action.payload;
    },
    addBodyReq: (state, action: PayloadAction<string>) => {
      state.selectedContent.bodyReq = action.payload;
    },
    addBodyRes: (state, action: PayloadAction<string>) => {
      state.selectedContent.bodyRes = action.payload;
    },
    resContentDetails: (state, action: PayloadAction<ResponseDet[]>) => {
      state.selectedContent.details = action.payload;
    },
    generateCodePOSTMAN: (state, action: PayloadAction<string[]>) => {
      state.selectedContent.generateCode = action.payload;
    },
    selectedLanguage: (state, action: PayloadAction<string>) => {
      state.selectedContent.selectedLang = action.payload;
    },
    selectedHeaders: (
      state,
      action: PayloadAction<Record<string, string>[]>
    ) => {
      state.selectedContent.headers = action.payload;
    },
  },
});
export const {
  addMethod,
  addInputURL,
  addBodyReq,
  addBodyRes,
  resContentDetails,
  generateCodePOSTMAN,
  selectedLanguage,
  selectedHeaders,
} = StoreSelectedSlice.actions;

export default StoreSelectedSlice.reducer;
