'use client'

import BodyEditor from "@/app/components/Collections/BodyEditor";
import BtnSend from "@/app/components/Collections/BtnSend";
import EndpointURL from "@/app/components/Collections/EndpointURL";
import GenerateCodeRequest from "@/app/components/Collections/GenerateCodeRequest";
import Headers from "@/app/components/Collections/Headers";
import Method from "@/app/components/Collections/Method";
import ResponseBody from "@/app/components/Collections/ResponseBody";
import { store } from "@/app/redux/store";
import { Provider } from "react-redux";





const Collections = () => {
  

  return (
    <Provider store={store()}>
    <div className="w-1/5 mx-auto my-10 flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-3">
        <div className="border flex flex-row"> 
          <Method />
          <EndpointURL />
        </div>
      <BodyEditor  / >
      </div>
      <Headers />
     <GenerateCodeRequest />  
     <BtnSend / >
      <ResponseBody />
    </div>
    </Provider>
         
        )
      }

export default Collections;
