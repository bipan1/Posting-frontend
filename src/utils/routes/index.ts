import asyncComponent from "../../hoc/AsyncComponent/AsyncComponent";
import { routeDetailType } from "../../types/generalTypes";

const LoginPage = asyncComponent(() => import("../../core/Public/LoginPage"));
const Home = asyncComponent(() => import("../../core/Protected/Home"));
const HomePage = asyncComponent(() => import("../../core/Public/HomePage"));
const OwnPosts = asyncComponent(() => import("../../core/Protected/MyPosts"));
const Profile = asyncComponent(() => import("../../core/Protected/Profile"))


export const appRoutes: routeDetailType[] = [
  {
    path: "/homepage",
    component: HomePage,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/signup",
    component: LoginPage,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/ownposts",
    component: OwnPosts,
  },
  {
    path: "/profile",
    component: Profile,
  },
];
