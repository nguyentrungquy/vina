import * as React from "react";
import { Outlet } from "react-router-dom";
import CookieChecking from "./checkCookie";

export interface IMobileAppLayoutProps {}

export default function MobileAppLayout(props: IMobileAppLayoutProps) {
  const [authening] = React.useState(false);

  React.useEffect(() => {
    // verifyUser();
  }, []);

  if (authening)
    return (
      <div>
        <CookieChecking />
      </div>
    );

  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1 overflow-auto">
        <Outlet />
        <div className="bottom-space mt-2"></div>
      </div>
    </div>
  );
}
