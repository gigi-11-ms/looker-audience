import React, { useContext, useEffect, useState } from "react";
import { ComponentsProvider, Space, Span } from "@looker/components";
import { ExtensionContext } from "@looker/extension-sdk-react";

export const HelloWorld: React.FC = () => {
  const { core40SDK } = useContext(ExtensionContext);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getMe = async () => {
      try {
        const me = await core40SDK.ok(core40SDK.me());
        setMessage(`Hello, ${me.display_name}`);
      } catch (error) {
        console.error(error);
        setMessage("An error occurred while getting information about me!");
      }
    };
    getMe();
  }, []);

  return (
    <ComponentsProvider>
      <Space around>
        <Span fontSize="xxxxxlarge">{message}</Span>
      </Space>
    </ComponentsProvider>
  );
};
