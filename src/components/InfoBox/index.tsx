import React, { FC, useState } from "react";
import { Tooltip, Box } from "@looker/components";
import { MdInfoOutline } from "react-icons/md";

interface IInfoBox {
  description?: string | null;
}

const InfoBox: FC<IInfoBox> = ({ description }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <Tooltip
        textAlign="left"
        content={
          <Box padding={5}>
            <Box>Description: </Box>
            <Box marginTop={5}>{description || "No description"}</Box>
          </Box>
        }
      >
        <MdInfoOutline
          fill={isActive ? "#d2336f" : "grey"}
          size={20}
          cursor={"pointer"}
          onMouseEnter={() => setIsActive(true)}
          onMouseLeave={() => setIsActive(false)}
        />
      </Tooltip>
    </>
  );
};

export default InfoBox;
