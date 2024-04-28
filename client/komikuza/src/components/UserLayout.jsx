import { Outlet } from "react-router-dom";
import NavbarUser from "./NavbarUser";

export default function UserLayout() {
  return (
    <>
      <NavbarUser />
      <Outlet />
    </>
  );
}

//!USERLAYOUT
