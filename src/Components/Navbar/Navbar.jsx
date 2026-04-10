import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  // Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react";
import { Vibe, Xrp } from "iconsax-reactjs";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

export default function MyNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const loggedMenuItems = ["Home", "Log Out"];
  const unloggedMenuItems = ["Register", "Login"];
  const { setuserLogin, userLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  function logOut() {
    navigate("/login");
    setuserLogin(null);
    localStorage.removeItem("apiUserToken");
  }
  return (
    <Navbar>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />

      <NavbarBrand>
        <Link className="flex items-center gap-1" to={"/login"}>
          <Vibe size="48" className="text-blue-700 font-bold" />
          <p className="font-extrabold  text-3xl  text-blue-700 ms-.5">Vibely</p>
        </Link>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {userLogin && (
            <NavbarItem>
              <Link className="block" to="/home">
                Home
              </Link>
            </NavbarItem>
          )}
          {!userLogin && (
            <>
              <NavbarItem>
                <Link className="block" to="/login">
                  Login
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link className="block" to="/">
                  Register
                </Link>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              radius="sm"
              className="transition-transform"
              color="primary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" color="danger">
              <Link className="block" to={"/profile"}>
                Profile
              </Link>
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={() => logOut()}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarMenu>
        {userLogin
          ? loggedMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  onClick={() => {
                    if (item === "Log Out") {
                      logOut();
                    }
                  }}
                  className="w-full block"
                  color={
                    index === 2
                      ? "primary"
                      : index === loggedMenuItems.length - 1
                        ? "danger"
                        : "foreground"
                  }
                  to={`/${item === "Log Out" ? "login" : item}`}
                  size="lg"
                >
                  {item}
                </Link>
              </NavbarMenuItem>
            ))
          : unloggedMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  className="w-full block"
                  color={
                    index === 2
                      ? "primary"
                      : index === unloggedMenuItems.length - 1
                        ? "danger"
                        : "foreground"
                  }
                  to={`/${item}`}
                  size="lg"
                >
                  {item}
                </Link>
              </NavbarMenuItem>
            ))}
      </NavbarMenu>
    </Navbar>
  );
}
