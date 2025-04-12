'use client'

import React from 'react'
import { useAppSelector } from '@/app/redux/hooks';

type ResponseDet = {
    resOk: boolean;
    resStatus: number;
  };

function ResponseBody() {

   const bodyRes = useAppSelector(state => state.selected.selectedContent).bodyRes
   const resDetails: ResponseDet[] = useAppSelector(state => state.selected.selectedContent).details 



  return (

  
    <div className="flex flex-col justify-self-center">

      
    <div>
      {resDetails?.map((x, index) => (
        <div key={index} className="w-1/9 mx-auto">
          {x.resOk == true ? (
            <div className="bg-green-500 text-black">
              {x.resStatus} <span>OK</span>
            </div>
          ) : (
            <div className="bg-red-500">
              {x.resStatus} <span>Not Found</span>
            </div>
          )}
        </div>
      ))}
    </div>

    <div>
      <textarea
        readOnly
        name="bodyResponse"
        id="handleJSON"
        cols={100}
        rows={50}
        className="p-4 border"
        defaultValue={bodyRes?.length > 1 ? bodyRes : ''}
      ></textarea>
  </div>

  
  </div>
  )
}

export default ResponseBody
