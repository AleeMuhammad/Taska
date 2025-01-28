import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icon from "../assets/book-square.png";

import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const SideMenu = () => {
  return (
    <div className="bg-[#FFFFFF] hidden sm:block text-[#141522] h-full w-64 p-4">
      <div className="flex justify-center items-center p-4 space-x-2 mt-1">
        <img className="mt-1" src={icon} alt="" />
        <h1 className="text-3xl font-[Plus Jakarta Sans] font-semibold">Taska</h1>
      </div>
      <div>
        <nav className="mt-4 p-2 ">
          <ul>
            <li className="flex items-center p-3 font-[Plus Jakarta Sans] font-semibold text-sm rounded-lg space-x-3 bg-[#F5F5F7]">
            <FontAwesomeIcon className="h-4" icon={faBookOpen} />
              <Link  to="/">Task</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideMenu;
