import React from "react";
import { useDocumentTitle } from "usehooks-ts";

const NotFoundPage: React.FC = () => {
  useDocumentTitle("404#");

  return <>page not found</>;
};

export default NotFoundPage;
