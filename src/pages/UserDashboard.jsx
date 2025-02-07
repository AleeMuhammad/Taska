import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faTrash, faCircle } from "@fortawesome/free-solid-svg-icons";
import TaskModal from "../components/Modal";

const UserDashboard = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const tasks = useSelector((state) => state.tasks);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const openModal = (task) => {
    setSelectedTask(task);
    setisModalOpen(true);
  };
  const closeModal = () => {
    setSelectedTask(null);
    setisModalOpen(false);
  };

  const Usertasks = tasks.filter(
    (task) => task.assignee === currentUser.fullName
  );

  if (!currentUser) {
    return <h2>No user found. Please Sign Up.</h2>;
  }


  return (
    <div className=" text-lg font-semibold">
      {currentUser?.role === "admin" ? (
        <h2>Welcome Admin, {currentUser?.fullName}</h2>
      ) : (
        <div>
          <h1>Welcome User, {currentUser?.fullName}</h1>
          <div className="mt-5">
            <div className="overflow-x-auto">
              <table className="table-auto w-full border border-gray-200 rounded-lg ">
                <thead>
                  <tr className="text-left font-medium ">
                    <th className="px-4 py-5 border-b sm:hidden  border-gray-200">
                      Name
                    </th>
                    <th className="px-4 py-5 border-b sm:hidden  border-gray-200">
                      Due Date
                    </th> 
                    <th className="px-4 py-5 border-b hidden sm:table-cell border-gray-200">
                      Name
                    </th>
                    <th className="px-4 py-5 border-b hidden sm:table-cell border-gray-200">
                      Due Date
                    </th>
                    <th className="px-4 py-5 border-b hidden sm:table-cell border-gray-200">
                      Assigned By
                    </th>
                    <th className="px-4 py-5 border-b hidden sm:table-cell border-gray-200">
                      Priority
                    </th>
                    <th className="px-4 py-5 border-b hidden sm:table-cell border-gray-200">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Usertasks &&
                    Usertasks.map((task) => (
                      <tr key={task.id} className="hover:bg-gray-50 ">
                        <td
                        onClick={()=>openModal(task)}
                         className="px-4 py-4  border-b border-gray-200 text-[#546FFF] font-semibold cursor-pointer">
                          {task.title}
                        </td>
                        <td className="px-4 py-4 border-b sm:table-cell border-gray-200 text-[#000000] font-medium">
                          {new Date(task.dueDate).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4 border-b hidden sm:table-cell border-gray-200 text-[#000000] font-medium">
                          {task.assignedBy}
                        </td>
                        <td
                          className="px-4 hidden sm:table-cell py-6 border-b border-gray-200 relative text-[#000000] font-medium "
                        >
                          <div className="flex items-center space-x-2 cursor-pointer overflow-hidden">
                            <FontAwesomeIcon
                              icon={faFlag}
                              className={`${
                                task.priority === "Low"
                                  ? "text-[#FFB72A]"
                                  : task.priority === "Normal"
                                  ? "text-[#75D653]"
                                  : "text-[#F25353]"
                              } w-3`}
                            />
                            <span>{task.priority}</span>
                          </div>
                        </td>
                        <td className="px-4 hidden sm:table-cell py-6 border-b border-gray-200 relative text-[#000000] font-medium">
                          <div className="flex items-center space-x-2 cursor-pointer">
                            <span>
                              {" "}
                              {task.status === "Active" ? (
                                <p className="bg-[#75D653] w-fit px-3 rounded text-white font-medium">
                                  Active
                                </p>
                              ) : task.status === "Closed" ? (
                                <p className="bg-[#F25353] w-fit px-3 rounded text-white font-medium">
                                  Closed
                                </p>
                              ) : (
                                <p className="bg-[#FFB72B] w-fit px-3 rounded text-white font-medium">
                                  Pending
                                </p>
                              )}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          {isModalOpen && (
            <TaskModal selectedTask={selectedTask} closeModal={closeModal} />
          )}
        </div>
        
      )}
    </div>
  );
};

export default UserDashboard;
