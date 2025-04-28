import { Button, Link, SpaceVertical } from "@looker/components";
import React, { FC, useState } from "react";
import queryClient from "../../../utils/queryClient";

interface OauthLoginProps {
  fieldName: string;
  description?: string | null;
  oauthUrl?: string | null;
  fieldLabel: string;
}

const OauthLogin: FC<OauthLoginProps> = ({
  fieldName,
  description,
  oauthUrl,
  fieldLabel,
}) => {
  const [oauthClicked, setOauthClicked] = useState(false);

  return (
    <SpaceVertical
      gap="medium"
      align={"center"}
      key={fieldName}
      textAlign={"center"}
    >
      <span>{description}</span>
      {oauthClicked ? (
        <Button
          onClick={(e) => {
            e.preventDefault();
            queryClient.invalidateQueries({ queryKey: ["useIntegrationForm"] });
            setOauthClicked(false)
          }}
        >
          Verify credentials
        </Button>
      ) : (
        <Link
          href={oauthUrl || ""}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            setOauthClicked(true);
          }}
        >
          {fieldLabel}
        </Link>
      )}
    </SpaceVertical>
  );
};

export default OauthLogin;
