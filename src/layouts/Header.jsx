import React from "react";
import { useState } from "react";
import "../assets/CSS/goldenEffect.css";
import "../assets/CSS/greenEffect.css";
import Button from "./components/Button";
import { Link, useNavigate } from "react-router-dom";
import MenuButton from "./components/MenuButton";
import dynamoLogo from "../assets/logo/dynamologo.png";

const Header = () => {
  const [active, setActive] = useState("Home");
  const [hovered, setHovered] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menus = [
    { name: "Home", link: "/", submenus: [] },
    {
      name: "Puzzles",
      submenus: [
        { name: "Puzzle Rush", link: "/puzzle" },
        { name: "Puzzle Battle", link: "/" },
        { name: "Puzzle Storm", link: "" },
        { name: "Puzzle Racer", link: "/" },
      ],
    },
    {
      name: "Community",
      submenus: [{ name: "Players", link: "/player" }],
    },
    {
      name: "Tournaments",
      submenus: [
        { name: "About Tournament", link: "/TournamentDetail" },
        { name: "Tournament List", link: "/tournaments" },
      ],
    },
    { name: "Rules", link: "/chessLearn", submenus: [] },
    { name: "About Us", link: "/aboutUs", submenus: [] },
    { name: "Games", link: "/Games", submenus: [] },
  ];

  let timeoutId;

  const handleMenuClick = (menu) => {
    if (menu.link) {
      navigate(menu.link);
      setActive(menu.name);
      setIsMenuOpen(false);
    }
  };

  const handleSubmenuClick = (menu, submenu) => {
    navigate(submenu.link);
    setActive(menu.name);
    setIsMenuOpen(false);
  };

  return (
    <header>
      <nav className={`w-full flex flex-col justify-between items-center bg-black/[0.6] backdrop-blur-sm fixed top-0 p-4 z-50`}>
        <div className="w-full flex justify-between items-center">
          <div className="w-[200px] flex flex-col items-center">
            <Link to="/">
              <img width={51} height={51} src={dynamoLogo} alt="Dynamo Chess Logo" />
            </Link>
          </div>

          <div className="hidden container xl:flex justify-center space-x-8">
            {menus.map((menu) => (
              <div
                key={menu.name}
                className="relative h-full"
                onMouseEnter={() => {
                  clearTimeout(timeoutId);
                  setHovered(menu.name);
                }}
                onMouseLeave={() => {
                  timeoutId = setTimeout(() => setHovered(null), 300);
                }}
              >
                {menu.link ? (
                  <Link
                    to={menu.link}
                    className="cursor-pointer text-lg font-semibold golden-text transition duration-300"
                    onClick={() => handleMenuClick(menu)}
                  >
                    {menu.name}
                  </Link>
                ) : (
                  <span className="cursor-pointer text-lg font-semibold golden-text transition duration-300">
                    {menu.name}
                  </span>
                )}

                <div
                  className={`absolute left-0 bottom-0 w-full h-[2px] rounded-md transition-all duration-300 ${
                    active === menu.name || hovered === menu.name
                      ? "bg-[#FACA15] scale-100"
                      : "scale-0"
                  }`}
                ></div>

                {menu.submenus.length > 0 && hovered === menu.name && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-[47px] mt-2 bg-black/[0.6] p-2 rounded-b-sm backdrop-blur-sm shadow-md transition-opacity duration-500 ease-in-out opacity-100"
                    onMouseEnter={() => clearTimeout(timeoutId)}
                    onMouseLeave={() => {
                      timeoutId = setTimeout(() => setHovered(null), 300);
                    }}
                  >
                    {menu.submenus.map((submenu) => (
                      <Link
                        to={submenu.link}
                        key={submenu.name}
                        className="px-4 flex flex-col text-nowrap py-2 golden-text text-sm hover:bg-[#ffd277] hover:text-black transition"
                        onClick={() => handleSubmenuClick(menu, submenu)}
                      >
                        {submenu.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between w-[200px] mr-6">
            <Button />
            <div className="xl:hidden">
              <MenuButton
                setIsMenuOpen={setIsMenuOpen}
                isMenuOpen={isMenuOpen}
              />
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`transition-transform duration-500 ease-out transform origin-top flex flex-col gap-4 xl:hidden items-center justify-center fixed w-full top-[83px] bg-black/[0.6] backdrop-blur-sm z-50 ${
          isMenuOpen ? "scale-y-100" : "scale-y-0"
        }`}
      >
        {menus.map((menu) => (
          <div
            key={menu.name}
            className="relative w-full flex flex-col items-center justify-center"
            onMouseEnter={() => {
              clearTimeout(timeoutId);
              setHovered(menu.name);
            }}
            onMouseLeave={() => {
              timeoutId = setTimeout(() => setHovered(null), 300);
            }}
          >
            {menu.link ? (
              <Link
                to={menu.link}
                className="w-full cursor-pointer text-lg font-semibold golden-text transition duration-300 text-center"
                onClick={() => handleMenuClick(menu)}
              >
                {menu.name}
              </Link>
            ) : (
              <span className="w-full cursor-pointer text-lg font-semibold golden-text transition duration-300 text-center">
                {menu.name}
              </span>
            )}

            <div
              className={`absolute left-0 top-[27px] w-full h-[2px] rounded-md transition-all duration-300 ${
                active === menu.name || hovered === menu.name
                  ? "bg-[#FACA15] scale-100"
                  : "scale-0"
              }`}
            ></div>

            {menu.submenus.length > 0 && hovered === menu.name && (
              <div
                className="mt-2 w-full flex flex-col items-center p-2 rounded-b-sm backdrop-blur-sm shadow-md transition-opacity duration-500 ease-in-out opacity-100"
                onMouseEnter={() => clearTimeout(timeoutId)}
                onMouseLeave={() => {
                  timeoutId = setTimeout(() => setHovered(null), 300);
                }}
              >
                {menu.submenus.map((submenu) => (
                  <Link
                    to={submenu.link}
                    key={submenu.name}
                    className="px-4 flex flex-col text-nowrap py-2 golden-text text-sm hover:bg-[#ffd277] hover:text-black transition"
                    onClick={() => handleSubmenuClick(menu, submenu)}
                  >
                    {submenu.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;
