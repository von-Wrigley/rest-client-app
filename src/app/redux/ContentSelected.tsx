import { createSlice, type PayloadAction  } from "@reduxjs/toolkit"

type ResponseDet = {
  resOk: boolean;
  resStatus: number;
};


type InitSt = {
  method: string,
  inputURL: string, 
  bodyReq: string,
  bodyRes: string,
  details: ResponseDet[],
  generateCode: [], 
  selectedLang: string,
  headers: []
}


const initState = {
  selectedContent: {method: '', inputURL: '', bodyReq: '', bodyRes: '', details: [], generateCode: [], selectedLang: "", headers: []}
}

const StoreSelecedSlice = createSlice({
    name: 'selectedItems',
    initialState: initState,
    reducers: {
        addItem: (state, action: PayloadAction) => {
         state.selectedContent.method = action.payload
                 
        },
        addInputURL: (state, action: PayloadAction) => {
          state.selectedContent.inputURL = action.payload
                  
         },
         addBodyReq: (state, action: PayloadAction) => {
          state.selectedContent.bodyReq = action.payload
                  
         },
         addBodyRes: (state, action: PayloadAction) => {
          state.selectedContent.bodyRes = action.payload
                  
         },
         resContentDetails: (state, action: PayloadAction) => {
          state.selectedContent.details =action.payload
                  
         },
         generateCodePOSTMAN: (state, action: PayloadAction) => {
          state.selectedContent.generateCode = action.payload 
                  
         },
         selectedLanguage: (state, action: PayloadAction) => {
          state.selectedContent.selectedLang =action.payload
                  
         },
         selectedHeaders: (state, action: PayloadAction) => {
          state.selectedContent.headers =action.payload
                  
         },
       
       
   
    }
})
export const {addItem, addInputURL, addBodyReq, addBodyRes,resContentDetails, generateCodePOSTMAN, selectedLanguage, selectedHeaders } = StoreSelecedSlice.actions
export default StoreSelecedSlice.reducer


