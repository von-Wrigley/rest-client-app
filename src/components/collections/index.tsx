"use client";

import BodyEditor from "@/components/collections/body-editor";
import BtnSend from "@/components/collections/send-btn";
import EndpointURL from "@/components/collections/endpoint-url";
import GenerateCodeRequest from "@/components/collections/generate-code-request";
import Headers from "@/components/collections/headers";
import Method from "@/components/collections/method";
import ResponseBody from "@/components/collections/response-body";
import { useUpdateUrl } from "@/hooks/use-update-url";

const Collections = () => {
  useUpdateUrl();

  return (
    <div className="w-1/5 mx-auto my-10 flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-3">
        <div className="border flex flex-row">
          <Method />
          <EndpointURL />
        </div>
        <BodyEditor />
      </div>
      <Headers />
      <GenerateCodeRequest />
      <BtnSend />
      <ResponseBody />
    </div>
  );
};
export default Collections;
