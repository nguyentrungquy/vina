import { createBrowserRouter } from "react-router-dom";
import MobileMainLayout from "../layouts/mobile/main";
import WagePage2 from "../pages/mobile/wage2/page";
import MobileHomePage from "../pages/mobile/home/home";
import Attendant from "../pages/mobile/attendant/attendant";
import DayOffPage from "../pages/mobile/dayoff/dayOff";
import Information from "../pages/mobile/infomation/page";
import Asset from "../pages/mobile/asset/asset";
import AssetCheckDetail from "../pages/mobile/assetCheckDetail/page";
import DepartmentAssetCheck from "../pages/mobile/departmentAssetCheck/page";
import NotFound from "../pages/mobile/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MobileMainLayout />,
    children: [
      { path: "/wage", element: <WagePage2 /> },
      { path: "/attendant", element: <Attendant /> },
      { path: "/day-off", element: <DayOffPage /> },
      { path: "/information", element: <Information /> },
      { path: "/asset", element: <Asset /> },
      { path: "/asset-check/:masterId", element: <AssetCheckDetail /> },
      {
        path: "/asset-check/:masterId/:departmentId",
        element: <DepartmentAssetCheck />,
      },
      { path: "/", element: <MobileHomePage /> },
      { path: "*", element: <NotFound /> }, // Not Found Page
    ],
  },
]);

