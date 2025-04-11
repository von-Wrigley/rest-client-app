'use client'
import { useTranslations } from "next-intl";
import styles from "./index.module.scss";
import { useState } from "react";
import Form from 'next/form';
import { usePathname, useSearchParams } from "next/navigation";
import { useLocalStorage } from "@/app/hooks/LocStor";
import { useRouter } from 'next/navigation';
type ResponseDet = {
  resOk: boolean;
  resStatus: number;
};

const Collections = () => {
  const t = useTranslations("CollectionsPage");
 
  const [inputState, setState] = useState('');
  const [stateMethod, setMethod] = useState('null');
  const [resDetails, setResponseDatails] = useState<ResponseDet[]>();
  const [responseBody, setResponseBody] = useState<string | undefined>(undefined);
  const [bodyPost, setBodyPost] = useState('');
  // const [userHeader, setUserHeader] = useState({});
  const[useSelect, setSelect]= useState('JSON')
  const [headerLocal, setHeaderLocal] = useState(undefined);
  const [inputs, setInputs] = useState([{ key: '', value: '' }]);
  const dt = new Date();
  const pathname = usePathname()
  const [storage, setStorage] = useLocalStorage('country', []);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [inputURL, setInputURL]=useState('')
  const [bodyReq2, setBodyReq2]=useState('')
 
  
  const handlechange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    setMethod(target.value);
   
    window.history.pushState(
      window.history.state ,
      '', 
      pathname + '/'+ target.value  +(inputURL.length >0 ? ('/' + inputURL) : '') +  (bodyReq2.length > 0 ? ('/' + bodyReq2) : '')
    );
  };

  const handleSelect = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(target.value);
  };

  const handleAddHeader = () => {
        setInputs([...inputs, { key: '', value: '' }]);
      };

  const handleRemoveHeader = (index:number) => {
            const newArray = [...inputs];
            newArray.splice(index, 1);
            setInputs(newArray);
          };

        

   const handleHeader = (e, i:number) => {
               const { name, value } = e.target;
 
            const newArr = inputs.map((x) => 
                { return encodeURIComponent(`${x.key}`)  }
                
                  // encodeURIComponent(`${x.key}${x.value}`);
                );
                const newArr2 = inputs.map((x) => 
                  encodeURIComponent(`${x.value}`)  
                     
                );
                console.log(newArr)
                
                const currentUrl = new URL(window.location.href);
                const params = new URLSearchParams(searchParams.toString())
                
                
                const createQueryString = (name, value) => {
                      const params = new URLSearchParams(searchParams.toString())
                
                      params.set(name, value)
            
                      return params.toString()
                    

                    }
                    console.log(pathname)
                router.push(pathname + '/'+ stateMethod +  '?' + createQueryString(newArr, newArr2) )
            
                const list = [...inputs];
              
                 list[i][name] = value;
            
                 
                 const newList = (list) => {
                    for(const value of list ) {
                           console.log(`${value[0]} `, value[1])
                    }
                 }
                
               
               
               
                 // setInputs(list);         
                //  setHeaderLocal(newArr)
      };
              const handlerequest = async () => {
                    if (stateMethod === 'GET') {
                      console.log(inputs)
                      if (typeof window !== 'undefined') {
                        setStorage([
                          ...storage,
                          {
                            method: stateMethod,
                            input: `${inputState}`,
                            date: dt,
                            heaaders: headerLocal,
                            body: bodyPost
                          },
                        ]);
                      }
                      const res = await fetch(`/api/collections/${inputState}`, {
                        headers: {
                          Authorization: 'EFfw2342',
                        },
                      });
                      const x = await res.json();
                
                      setResponseDatails([{ resOk: res.ok, resStatus: res.status }]);
                      const responseBody = JSON.stringify(x);
                      hanfleFormater(responseBody);
                    } else if (stateMethod === 'DELETE') {
                      const res = await fetch(`/api/collections/${inputState}`, {
                        method: 'DELETE',
                      });
                      setResponseDatails([{ resOk: res.ok, resStatus: res.status }]);
                      const x = await res.json();
                      console.log(x);
                      setResponseBody('{}');
                    } else if (stateMethod === 'POST') {
                      if (typeof window !== 'undefined') {
                        setStorage([
                          ...storage,
                          { method: stateMethod, input: `${inputState}`, date: dt,  body: bodyPost },
                        ]);
                      }
                      const res = await fetch(`/api/collections/${inputState}`, {
                        method: 'POST',
                        body: JSON.stringify(bodyPost),
                        headers: {
                          'Content-type': 'application/json; charset=UTF-8',
                        },
                      });
                      setResponseDatails([{ resOk: res.ok, resStatus: res.status }]);
                      const x = await res.json();
                      console.log(x);
                      hanfleFormater(JSON.stringify(x));
                    } else if (stateMethod === 'PUT') {
                      if (typeof window !== 'undefined') {
                        setStorage([
                          ...storage,
                          { method: stateMethod, input: `${inputState}`, date: dt,  body: bodyPost },
                        ]);
                      }
                      const res = await fetch(`/api/collections/${inputState}`, {
                        method: 'PUT',
                        body: JSON.stringify(bodyPost),
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      });
                      console.log(res);
                      setResponseDatails([{ resOk: res.ok, resStatus: res.status }]);
                      const x = await res.json();
                      hanfleFormater(JSON.stringify(x));
                    } else if (stateMethod === 'PATCH') {
                      if (typeof window !== 'undefined') {
                        setStorage([
                          ...storage,
                          { method: stateMethod, input: `${inputState}`, date: dt,  body: bodyPost },
                        ]);
                      }
                      const res = await fetch(`/api/collections/${inputState}`, {
                        method: 'PATCH',
                        body: JSON.stringify(bodyPost),
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      });
                      console.log(res);
                      setResponseDatails([{ resOk: res.ok, resStatus: res.status }]);
                      const x = await res.json();
                      hanfleFormater(JSON.stringify(x));
                    }
                  };
                
                  const hanfleFormater = (x:string) => {
                    if (
                      stateMethod === 'GET' ||
                      stateMethod === 'POST' ||
                      stateMethod === 'DELETE' ||
                      stateMethod === 'PUT' ||
                      stateMethod === 'PATCH'
                    ) {
                      const test1 = JSON.stringify(JSON.parse(x), null, 4);
                      // bar.value = test1
                      setResponseBody(test1);
                    }
                  };

       const handleBodyRequest = ()=> {
                        const currentUrl = new URL(window.location.href);
                    console.log(bodyPost.length)
                        const bodyRequest = btoa( bodyPost);
                        setBodyReq2(bodyRequest)
                         console.log(currentUrl.pathname)
                        window.history.pushState(
                          window.history.state, '',
                            
                          // currentUrl.pathname 
                  pathname  + '/' + stateMethod + '/'+
                  (inputURL ?? '')  +  '/'+  bodyRequest
                        );

      //                   window.history.state ,
      //                                '', 
      // pathname + '/'+ target.value
                           
                      }
                      const formatCode = (bodyPost:string ) => {
                        const parsedData = JSON.parse(bodyPost)
                        
                             const x = JSON.stringify( parsedData, null, 4);
                             setBodyPost(x)
                            
                        
                          }

  return (
   
          <div className={styles.pageStructure}>
            <div >
              <div className="flex flex-col gap-y-3">
                <div >
                  <select
                    name="Method"
                    id="method"
                    className="p-2 m-2"
                    value={stateMethod}
                    onChange={handlechange}
                  >
                    <option disabled value="null">
                    {t("method")}
                    </option>
                    <option value="GET">GET</option>
                    <option value="DELETE">DELETE</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="PATCH">PATCH</option>
                  </select>
               
                  <input
                    type="text"
                    className="p-4"
                    onChange={(e) => {
                      setState(e.target.value);
                      const asciiStringEncoded = btoa(e.target.value);
                      setInputURL(asciiStringEncoded)
                      window.history.pushState(
                        window.history.state,
                        '',
                        pathname + '/' + stateMethod + '/'+
                          asciiStringEncoded +  (bodyReq2.length >0 ? ('/' + bodyReq2) : '')
                      );
                    }}
                  />
                </div>
      
      
      
                <form method="post" name="bodyEditor">
                  <div className="flex">
                    
                    <select name="selectFormat" id="selectFormat" value={useSelect} onChange={handleSelect} >
                      <option value="JSON">JSON</option>
                      <option value="TEXT">TEXT</option>
                    </select>
                  </div>
      
                  <textarea
                   
                     value={bodyPost}
                    className="border"
                    rows={5}
                    name="RequestBody"
                    onChange={(e) => setBodyPost(e.target.value)}
                    onBlur={handleBodyRequest}
                  >
                  </textarea>
                </form>
                {(bodyPost.length > 0 && useSelect === 'JSON') && <button type="button" onClick={()=> formatCode(bodyPost)}  >Beautify</button>}
              </div>


      
              <Form action="">
                <h4> {t("headers")}</h4>
                <div className="flex flex-col gap-y-7">
                  <button
                    onClick={handleAddHeader}
                    type="button"
                    className="bg-green-400 w-18"

                  >
                     {t("btnAdd")}
                  </button>
      
                  {inputs.map((item, index) => (
                    <div className="flex gap-x-2 " key={index}>
                      <input
                        type="text"
                        placeholder= {t("key")}
                        name="key"
                        value={item.key}
                         onChange={(e) => handleHeader(e, index)}
                        
                        className="border border-gray-300 "
                      />
                      <input
                        type="text"
                        placeholder= {t("value")}
                        name="value"
                        value={item.value}
                         onChange={(e) => handleHeader(e, index)}
                        
                        className="border border-gray-300 "
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveHeader(index)}
                        className="bg-red-600 p-3"
                      >
                          {t("btnDelete")}
                      </button>
                    </div>
                  ))}
                </div>
              </Form>
      
              <div>Code: [Generated request code]</div>
      
              <button
                type="submit"
                className="bg-blue-100 p-4"
                onClick={handlerequest}
              >
                 {t("btnSend")}
              </button>
            </div>
             
          
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
                  cols={70}
                  rows={25}
                  className="p-4 border"
                  defaultValue={responseBody?.length > 1 ? responseBody : ''}
                ></textarea>
              </div>
            </div>
          </div>
        );
      }

export default Collections;
