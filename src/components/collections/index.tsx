"use client";

import BodyEditor from "@/components/collections/body-editor";
import BtnSend from "@/components/collections/send-btn";
import EndpointURL from "@/components/collections/endpoint-url";
import GenerateCodeRequest from "@/components/collections/generate-code-request";
import Headers from "@/components/collections/headers";
import Method from "@/components/collections/method";
import ResponseBody from "@/components/collections/response-body";
import { useUpdateUrl } from "@/hooks/use-update-url";
import styles from "./index.module.scss";

const Collections = () => {
  useUpdateUrl();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.selector__wrapper}>
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
