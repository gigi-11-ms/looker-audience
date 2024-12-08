import React from "react";
import { Box, Span, Button } from "@looker/components";
import { useHistory } from "react-router-dom";
import { AUDIENCES_PAGE } from "../../routes/config";
import PageTemplate from "../../templates/PageTemplate";

const ErrorPage = () => {
  const history = useHistory();

  const handleGoHome = () => {
    history.push(AUDIENCES_PAGE);
  };

  return (
    <PageTemplate>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        width={"100%"}
        flexDirection="column"
      >
        <Span fontSize="xlarge" fontWeight="bold" color="red500">
          404
        </Span>
        <Span fontSize="large" marginTop="small">
          Oops! Page Not Found
        </Span>
        <Span fontSize="medium" marginTop="small">
          Sorry, the page you are looking for does not exist.
        </Span>
        <Button onClick={handleGoHome} marginTop="large">
          Go to Home
        </Button>
      </Box>
    </PageTemplate>
  );
};

export default ErrorPage;
