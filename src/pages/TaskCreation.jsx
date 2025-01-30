import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../redux/Store";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faFlag } from "@fortawesome/free-solid-svg-icons";

import Select, { components } from "react-select";

const TaskCreation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const currentAdmin = JSON.parse(localStorage.getItem("currentUser"));

  const statusOptions = [
    {
      value: "Pending",
      label: (
        <>
          <FontAwesomeIcon className="text-[#FFB72A] w-3" icon={faCircle} />{" "}
          Pending{" "}
        </>
      ),
    },
    {
      value: "Active",
      label: (
        <>
          <FontAwesomeIcon className="text-[#74D453] w-3" icon={faCircle} />{" "}
          Active{" "}
        </>
      ),
    },
    {
      value: "Closed",
      label: (
        <>
          <FontAwesomeIcon className="text-[#F25353] w-3" icon={faCircle} />{" "}
          Closed
        </>
      ),
    },
  ];

  const priorityOptions = [
    {
      value: "Low",
      label: (
        <>
          <FontAwesomeIcon className="text-[#FFB72A] w-3" icon={faFlag} /> Low
        </>
      ),
    },
    {
      value: "Normal",
      label: (
        <>
          <FontAwesomeIcon className="text-[#75D653] w-3" icon={faFlag} />{" "}
          Normal{" "}
        </>
      ),
    },
    {
      value: "High",
      label: (
        <>
          <FontAwesomeIcon className="text-[#F25353] w-3" icon={faFlag} /> High
        </>
      ),
    },
  ];

  const assigneeOptions = users
    .filter((user) => user.role === "user")
    .map((user) => ({
      value: user.fullName, // Assuming `id` is unique
      label: user.fullName, // Displaying the name in the dropdown
    }));

  console.log(assigneeOptions);
  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    dueDate: yup.date().required("Due date is required"),
    priority: yup.string().required("Priority is required"),
    status: yup.string().required("Status is required"),
    assignee: yup.string().required("Assignee is required"),
    description: yup
      .string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters"),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    try {
      dispatch(
        addTask({
          ...data,
          assignedBy: currentAdmin?.fullName || "Unknown",
        })
      );
      navigate("/", { replace: true });
      console.log("Task Created:", newTask);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-8 bg-white shadow-md rounded-lg">
      <ToastContainer className={"mt-10"} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-6"
      >
        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-[#141522] font-[Plus Jakarta Sans]"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title")}
            className="block w-full border border-[#B9B9B9] p-2 mt-4 rounded-md shadow-sm sm:text-sm"
            placeholder="Enter task title"
          />
          <p className="text-red-500 text-sm">{errors.title?.message}</p>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-[#141522] font-[Plus Jakarta Sans]"
          >
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            {...register("dueDate")}
            className="block w-full border border-[#B9B9B9] p-2 mt-4 rounded-md shadow-sm sm:text-sm"
            placeholder="enter"
          />
          <p className="text-red-500 text-sm">{errors.dueDate?.message}</p>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-[#141522] font-[Plus Jakarta Sans]"
          >
            Priority
          </label>
          <Controller
            name="priority"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                options={priorityOptions}
                value={priorityOptions.find(
                  (option) => option.value === field.value
                )} // Find the option matching the value
                className="mt-4 block w-full rounded-md shadow-sm sm:text-sm"
                onChange={(priorityOptions) =>
                  field.onChange(priorityOptions.value)
                } // Set only the value
                components={{
                  MenuList: (props) => (
                    <>
                      <div className="px-4 py-2 mt-2 font-[Poppins] text-base font-medium text-[#333333]">
                        Select a Priority
                        <span className="block h-[0.1rem] mt-2 w-full  bg-[#DDDDDD]"></span>
                      </div>
                      <components.MenuList {...props} />
                    </>
                  ),
                }}
              />
            )}
          />
          <p className="text-red-500 text-sm">{errors.priority?.message}</p>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-[#141522] font-[Plus Jakarta Sans]"
          >
            Status
          </label>
          <Controller
            name="status"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                options={statusOptions}
                value={statusOptions.find(
                  (option) => option.value === field.value
                )} // Find the option matching the value
                className="mt-4 block w-full rounded-md shadow-sm sm:text-sm"
                onChange={(selectedOption) =>
                  field.onChange(selectedOption.value)
                } // Set only the value
                components={{
                  MenuList: (props) => (
                    <>
                      <div className="px-4 py-2 mt-2 font-[Poppins] text-base font-medium text-[#333333]">
                        Select a Status
                        <span className="block h-[0.1rem] mt-2 w-full  bg-[#DDDDDD]"></span>
                      </div>
                      <components.MenuList {...props} />
                    </>
                  ),
                }}
              />
            )}
          />

          <p className="text-red-500 text-sm">{errors.status?.message}</p>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="assignee"
            className="block text-sm font-medium text-[#141522] font-[Plus Jakarta Sans]"
          >
            Assignee
          </label>
          <Controller
            name="assignee"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                options={assigneeOptions}
                value={assigneeOptions.find(
                  (option) => option.value === field.value
                )}
                className="mt-4 block w-full rounded-md shadow-sm sm:text-sm"
                onChange={(selectedOption) =>
                  field.onChange(selectedOption.value)
                }
                components={{
                  MenuList: (props) => (
                    <>
                      <div className="px-4 py-2 mt-2 font-[Poppins] text-base font-medium text-[#333333]">
                        Select an Assignee
                        <span className="block h-[0.1rem] mt-2 w-full text-black bg-[#DDDDDD]"></span>
                      </div>
                      <components.MenuList {...props} />
                    </>
                  ),
                }}
              />
            )}
          />
          <p className="text-red-500 text-sm">{errors.assignee?.message}</p>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-[#141522] font-[Plus Jakarta Sans]"
          >
            Description
          </label>
          <input
            id="description"
            {...register("description")}
            className="block w-full border border-[#B9B9B9] p-2 mt-4 rounded-md shadow-sm sm:text-sm "
            placeholder="Enter task description"
          ></input>
          <p className="text-red-500 text-sm">{errors.description?.message}</p>
        </div>

        <div className="col-span-2 sm:mt-36 text-right">
          <button
            type="submit"
            className="px-6 py-2 w-full sm:w-auto text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskCreation;
