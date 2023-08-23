import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { navbar } from "../../../assets/data/";
import logo from "../../../assets/images/logo.svg";

export const HeaderOrganism: FC = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <>
      <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white">
        <img src={logo} alt="Logo" />
        <ul className="text-black hidden md:flex">
          {navbar.map((item) => (
            <li key={item.id} className="p-4">
              <Link to={item.to}>{item.label}</Link>
            </li>
          ))}
        </ul>
        <div onClick={handleNav} className="block md:hidden">
          {nav ? (
            <AiOutlineClose size={20} color="black" />
          ) : (
            <AiOutlineMenu size={20} color="black" />
          )}
        </div>
        <div
          className={
            nav
              ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-gray-600 ease-in-out duration-500"
              : "fixed left-[-100%]"
          }
        >
          <img src={logo} alt="Logo" />
          <ul className="text-white capitalize p-4">
            {navbar.map((item) => (
              <li key={item.id} className="p-4">
                <Link to={item.to} className="border-b border-black-600">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
