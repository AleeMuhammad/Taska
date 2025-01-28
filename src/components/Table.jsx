import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faTrash, faCircle } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../redux/Store";

import TaskModal from "./Modal";

const Table = () => {
  const priorityOptions = [
    { value: "Low", label: "Low", color: "text-[#FFB72A]" },
    { value: "Normal", label: "Normal", color: "text-[#75D653]" },
    { value: "High", label: "High", color: "text-[#F25353]" },
  ];

  const statusOptions = [
    { value: "Active", label: "Active", color: "text-[#75D653]" },
    { value: "Closed", label: "Closed", color: "text-[#F25353]" },
    { value: "Pending", label: "Pending", color: "text-[#FFB72B]" },
  ];

  const tasks = useSelector((state) => state.user.tasks);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [search, setSearch] = useState("");

  // State to manage dropdown visibility for priority and status
  const [priorityDropdown, setPriorityDropdown] = useState(null);
  const [statusDropdown, setStatusDropdown] = useState(null);

  const tasksPerPage = 5;

  const sortedTasks = [...tasks].sort((a, b) => {
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);
    return dateA - dateB;
  });

  const filteredTasks = sortedTasks.filter(
    (task) =>
      task.title && task.title.toLowerCase().includes(search.toLowerCase())
  );

  const offset = currentPage * tasksPerPage;
  const currentTasks = filteredTasks.slice(offset, offset + tasksPerPage);
  const pageCount = Math.ceil(filteredTasks.length / tasksPerPage);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handlePriorityChange = (taskId, newPriority) => {
    dispatch(updateTask(taskId, { priority: newPriority }));
    setPriorityDropdown(null); 
  };

  const handleStatusChange = (taskId, newStatus) => {
    dispatch(updateTask(taskId, { status: newStatus }));
    setStatusDropdown(null); 
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };


  const openModal = (task) => {
    setSelectedTask(task);
    setisModalOpen(true);
  };
  const closeModal = () => {
    setSelectedTask(null);
    setisModalOpen(false);
  };

  return (
    <>
      <div>
        <input
          className="placeholder:text-black p-2 rounded-md border border-[#B9B9B9] mb-2"
          type="text"
          id="search"
          name="search"
          placeholder="Search Task"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center mt-4">
          No Task to display, Create a task
        </div>
      ) : (
        <div>
          <div  className="overflow-x-auto">
            <table className="table-auto w-full border border-gray-200 rounded-lg ">
              <thead>
                <tr className="text-left font-medium ">
                <th className="px-4 py-5 border-b sm:hidden  border-gray-200">Name</th>
                <th className="px-4 py-5 border-b sm:hidden  border-gray-200">
                    Actions
                  </th>
                  <th className="px-4 py-5 border-b hidden sm:table-cell border-gray-200">Name</th>
                  <th className="px-4 py-5 border-b hidden sm:table-cell border-gray-200">
                    Due Date
                  </th>
                  <th className="px-4 py-5 border-b hidden sm:table-cell border-gray-200">
                    Assignee
                  </th>
                  <th className="px-4 py-5 border-b hidden sm:table-cell border-gray-200">
                    Priority
                  </th>
                  <th className="px-4 py-5 border-b hidden sm:table-cell border-gray-200">Status</th>
                  <th className="px-4 py-5 border-b hidden sm:table-cell border-gray-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50 ">
                     <td
                      onClick={() => openModal(task)}
                      className="px-4 py-4  border-b sm:hidden border-gray-200 text-[#546FFF] font-semibold cursor-pointer"
                    >
                      {task.title}
                    </td>
                     <td className="px-4 py-4 border-b sm:hidden border-gray-200">
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(task.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                    <td
                      onClick={() => openModal(task)}
                      className="px-4 py-4  border-b hidden sm:table-cell border-gray-200 text-[#546FFF] font-semibold cursor-pointer"
                    >
                      {task.title}
                    </td>
                    <td className="px-4 py-4 border-b hidden sm:table-cell border-gray-200 text-[#000000] font-medium">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 border-b hidden sm:table-cell border-gray-200 text-[#000000] font-medium">
                      {task.assignee}
                    </td>
                    <td onClick={()=>{setStatusDropdown(null)}} className="px-4 hidden sm:table-cell py-6 border-b border-gray-200 relative text-[#000000] font-medium ">
                      <div
                        onClick={() =>
                          setPriorityDropdown(
                            priorityDropdown === task.id ? null : task.id
                          )
                        }
                        className="flex items-center space-x-2 cursor-pointer overflow-hidden"
                      >
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
                      {priorityDropdown === task.id && (
                        <div className="absolute overflow-hidden -top-[4.9rem] -left-24 mt-1 w-32 bg-white border rounded shadow-lg">
                          <div className="p-2 flex flex-col items-center">
                            Priority
                            <span className="block h-[0.1rem] mt-2 w-24 roun bg-[#DDDDDD]"></span>
                          </div>

                          {priorityOptions.map((option) => (
                            <div
                              key={option.value}
                              onClick={() =>
                                handlePriorityChange(task.id, option.value)
                              }
                              className={`flex items-center space-x-2 px-3 py-1 cursor-pointer overflow-hidden hover:bg-gray-100 `}
                            >
                              <FontAwesomeIcon icon={faFlag} className={`w-3 ${option.color}`} />
                              <span>{option.label}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                    <td onClick={()=>setPriorityDropdown(null)} className="px-4 hidden sm:table-cell py-6 border-b border-gray-200 relative text-[#000000] font-medium">
                      <div
                        onClick={() =>
                          setStatusDropdown(
                            statusDropdown === task.id ? null : task.id
                          )
                        }
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <span> {task.status === "Active" ? (
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
                      )}</span>
                      </div>
                      {statusDropdown === task.id && (
                        <div className="absolute -top-[4.9rem] -left-24 mt-1 w-32 bg-white border rounded shadow-lg">
                          <div className="p-2 flex flex-col items-center">
                            Status
                            <span className="block h-[0.1rem] mt-2 w-24 bg-[#DDDDDD]"></span>
                          </div>

                          {statusOptions.map((option) => (
                            <div
                              key={option.value}
                              onClick={() =>
                                handleStatusChange(task.id, option.value)
                              }
                              className={`flex items-center space-x-2 px-3 py-1 cursor-pointer hover:bg-gray-100`}
                            >
                              <FontAwesomeIcon  icon={faCircle} className={`w-3 ${option.color}`} />
                              <span>{option.label}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4 border-b hidden sm:table-cell border-gray-200">
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(task.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center mt-4"
            pageClassName="px-3 py-1 border rounded-lg mx-1 cursor-pointer"
            activeClassName="bg-blue-500 text-white"
            previousClassName="px-3 py-1 border rounded-lg mx-1 cursor-pointer"
            nextClassName="px-3 py-1 border rounded-lg mx-1 cursor-pointer"
            disabledClassName="opacity-50 cursor-not-allowed"
          />

          {isModalOpen && (
            <TaskModal selectedTask={selectedTask} closeModal={closeModal} />
          )}
        </div>
      )}
    </>
  );
};

export default Table;
