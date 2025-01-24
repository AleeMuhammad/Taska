import React,{useState} from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/Store";

const Header = () => {
  const location = useLocation();
  const {user}=useSelector((state)=>state.user);

  const getHeading = () => {
    switch (location.pathname) {
      case "/":
        return "Task";
      case "/taskcreation":
        return "Create New Task";
      default:
        return "Task Management";
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const dispatch=useDispatch();

  const handlelogout=()=>{
    dispatch(signOut())
    setIsOpen(false);
  }
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
    <div className="hidden sm:block">
      <div className="bg-[#FFFFFF]  text-black px-4 py-2 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <button className="flex flex-col justify-center  items-center  rounded-md">
          <span className="block h-[0.15rem] w-4 bg-black"></span>
          <span className="block h-[0.15rem] w-4 bg-black my-1"></span>
          <span className="block h-[0.15rem] w-4 bg-black"></span>
        </button>
        <h1 className="text-lg font-semibold">{getHeading()}</h1>
      </div>
      {
         user?( 
          <div>
          <button onClick={handlelogout} className="bg-[#546FFF] text-white px-4   py-2 rounded-xl">Log Out</button>
          </div>
         ) :(
          <div className='space-x-2 p-2'>
           <Link className="bg-[#546FFF] text-white px-4 py-2 rounded-xl" to={"/signin"}>Sign In</Link>
           <Link className="bg-[#546FFF] text-white px-4 py-2 rounded-xl" to={"/signup"}>Sign Up</Link>
             </div>
         )
      }
      {/* <button onClick={handlelogout} className="bg-[#546FFF] text-white px-4 py-2 rounded-xl">Log Out</button> */}
      </div>
    </div>

    <div className="block sm:hidden">
    <div className="bg-[#FFFFFF] text-black px-4 py-2 flex justify-between items-center">
      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <FontAwesomeIcon className="h-7" icon={faBookOpen} />
      </div>
      <div>
        <h1 className="text-lg font-semibold">{getHeading()}</h1>
      </div>

      <div className="relative">
        <button
          onClick={toggleMenu}
          type="button"
          className="flex flex-col justify-center items-center rounded-md"
        >
          <span className="block h-[0.15rem] w-4 bg-black"></span>
          <span className="block h-[0.15rem] w-4 bg-black my-1"></span>
          <span className="block h-[0.15rem] w-4 bg-black"></span>
        </button>

        {isOpen && (
          <div className="absolute right-0 p-2 mt-2 w-56 bg-white shadow-lg rounded-md">
            <div>
                    <nav className="p-2">
                      <ul>
                        <li className="flex items-center p-3 font-[Plus Jakarta Sans] font-semibold text-sm rounded-lg space-x-3 bg-[#F5F5F7]">
                        <FontAwesomeIcon className="h-4" icon={faBookOpen} />
                          <Link  to="/task">Task</Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  {
         user?( 
          <div>
          <button onClick={handlelogout} className="bg-[#546FFF] text-white flex justify-self-center px-4 py-2 rounded-xl">Log Out</button>
          </div>
         ) :(
          <div className='space-x-2 p-2'>
           <Link className="bg-[#546FFF] text-white px-4 py-2 rounded-xl" to={"/signin"}>Sign In</Link>
           <Link className="bg-[#546FFF] text-white px-4 py-2 rounded-xl" to={"/signup"}>Sign Up</Link>
             </div>
         )
      }
            {/* <button onClick={handlelogout} className="bg-[#546FFF] text-white px-4 py-2 rounded-xl">Log Out</button> */}

          </div>
        )}
      </div>
    </div>

    </div>

    </>
  );
};

export default Header;
