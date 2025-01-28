import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark , faFlag} from "@fortawesome/free-solid-svg-icons";

const TaskModal = ({ selectedTask, closeModal }) => {
  return (
    <div className="fixed inset-0 flex p-6 justify-center items-center bg-[#a3a3a3] bg-opacity-50">
      <div className="bg-white p-4 sm:p-10 rounded-2xl shadow-lg w-full sm:w-1/2">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">Task Details</h2>
          <button onClick={closeModal}>
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="text-[#4C4E648A] text-xl"
            />
          </button>
        </div>
        <div className="mt-4">
          <span className="block h-[0.15rem] w-full rounded-md bg-[#D7D7D7]"></span>
        </div>
        <div className="mt-4  text-center sm:text-start  text-2xl font-semibold font-[Poppins] text-[#546FFF]">
          <h1>{selectedTask.title}</h1>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row justify-between text-center">
          <div className="space-y-3 ">
            <h2 className="text-[#656F7D] text-sm font-normal">Due Date</h2>
            <p>{new Date(selectedTask.dueDate).toLocaleDateString()}</p>
          </div>
          <div className="space-y-3 mt-1 sm:mt-0">
            <h2 className="text-[#656F7D] text-sm font-normal">Assignee</h2>
            <p>{selectedTask.assignee}</p>
          </div>
          <div className="space-y-4 mt-1 sm:mt-0">
            <h2 className="text-[#656F7D] text-sm font-normal">Priority</h2>
            {selectedTask.priority==="Low"?(<><FontAwesomeIcon className="text-[#FFB72A] w-3" icon={faFlag} /> Low</>):selectedTask.priority==="Normal"?(<><FontAwesomeIcon className="text-[#75D653] w-3" icon={faFlag} /> Normal</>):(<><FontAwesomeIcon className="text-[#F25353] w-3" icon={faFlag} /> High</>)}
          </div>
          <div className="space-y-4 mt-1 sm:mt-0">
            <h2 className="text-[#656F7D] text-sm font-normal">Status</h2>
              {selectedTask.status==="Active"?(<p className="bg-[#75D653] w-fit px-3 rounded text-white flex justify-self-center font-medium ">Active</p>):selectedTask.status==="Closed"?(<p className="bg-[#F25353] w-fit px-3 rounded text-white font-medium flex justify-self-center ">Closed</p>):(<p className="bg-[#FFB72B] w-fit px-3 rounded text-white flex justify-self-center font-medium ">Pending</p>)} 
          </div>
        </div>
        <div className="border h-44 sm:h-full overflow-auto rounded-xl border-[#D7D7D7] p-4 sm:p-6 mt-10">
          <p>{selectedTask.description}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
