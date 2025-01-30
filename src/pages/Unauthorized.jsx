import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[88vh]  text-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
        <p className="text-gray-600 mb-6">
          You do not have permission to view this page.
        </p>
        <Link
          to="/userdashboard"
         
        >
            <button className="bg-[#546FFF]  text-white  w-[10rem] py-2 rounded-xl">

          Go back
            </button>
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
