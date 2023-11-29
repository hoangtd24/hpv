import {lazy,LazyExoticComponent,ComponentType} from "react"
const After = lazy(() => import("../pages/After/After"));
const Before = lazy(() => import("../pages/Before/Before"));
const Home = lazy(() => import("../pages/Home/Home"));

type Route = {
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: LazyExoticComponent<ComponentType<any>>;
};

export const publicRoutes: Route[] = [
  { path: "/before", component: Before },
  { path: "/after", component: After },
  { path: "/", component: Home },
];

export const privateRoutes: Route[] = [];
