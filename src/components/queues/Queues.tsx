import React from "react";
import { useCleanedNavigationContext } from "../../providers/navigation";

export const Queues: React.FC = () => {
  const { currentNavNode } = useCleanedNavigationContext();
  const apiRoute = React.useMemo(
    () => currentNavNode?.apiRoute || "",
    [currentNavNode]
  );

  return <>{apiRoute}</>;
};
