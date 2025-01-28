import { createStore, combineReducers } from "redux";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

// Action Types for tasks and user
const AddTask = "task/add";
const DeleteTask = "task/delete";
const UpdateTask = "task/update";
const SignUp = "user/signup";
const SignIn = "user/signin";
const SignOut = "user/signout";

// Initial State
const initialState = {
  user: JSON.parse(localStorage.getItem("currentUser")) || null,
  isAuthenticated: !!JSON.parse(localStorage.getItem("currentUser")),
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
};

// Reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // User Actions
    case SignUp: {
      const updatedState = {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        tasks: [],
      };

      // Store user-specific data in localStorage
      localStorage.setItem("currentUser", JSON.stringify(updatedState.user));
      localStorage.setItem(
        "usersData",
        JSON.stringify({
          [action.payload.email]: updatedState,
        })
      );
      toast.success("Sign Up Successful!");
      return updatedState;
    }

    case SignIn: {
      const usersData = JSON.parse(localStorage.getItem("usersData")) || {};
      const storedUser = usersData[action.payload.email];

      if (storedUser) {
        if (
          storedUser.user.email === action.payload.email &&
          storedUser.user.password === action.payload.password
        ) {
          const updatedState = {
            ...storedUser,
            isAuthenticated: true,
          };
          localStorage.setItem("currentUser", JSON.stringify(updatedState.user));
          toast.success("Sign In Successful!");
          return updatedState;
        } else {
          toast.error("Invalid Email or Password");
        }
      } else {
        toast.error("No account found for this email.");
      }
      return state;
    }

    case SignOut: {
      localStorage.removeItem("currentUser");
      toast.success("Signed Out Successfully!");
      return { ...state, user: null, isAuthenticated: false, tasks: [] };
    }

    // Task Actions
    case AddTask: {
      const newTask = { ...action.payload, id: uuidv4() };
      const updatedTasks = [...state.tasks, newTask];
      const usersData = JSON.parse(localStorage.getItem("usersData")) || {};

      // Update the current user's task list
      if (state.user) {
        usersData[state.user.email] = {
          ...usersData[state.user.email],
          tasks: updatedTasks,
        };
      }

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      localStorage.setItem("usersData", JSON.stringify(usersData));
      toast.success("Task Created Successfully");
      return { ...state, tasks: updatedTasks };
    }

    case DeleteTask: {
      const updatedTasks = state.tasks.filter((task) => task.id !== action.payload);
      const usersData = JSON.parse(localStorage.getItem("usersData")) || {};

      // Update the current user's task list
      if (state.user) {
        usersData[state.user.email] = {
          ...usersData[state.user.email],
          tasks: updatedTasks,
        };
      }

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      localStorage.setItem("usersData", JSON.stringify(usersData));
      toast.success("Task Deleted Successfully");
      return { ...state, tasks: updatedTasks };
    }

    case UpdateTask: {
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.payload.id ? { ...task, ...action.payload.updates } : task
      );
      const usersData = JSON.parse(localStorage.getItem("usersData")) || {};

      // Update the current user's task list
      if (state.user) {
        usersData[state.user.email] = {
          ...usersData[state.user.email],
          tasks: updatedTasks,
        };
      }

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      localStorage.setItem("usersData", JSON.stringify(usersData));
      toast.success("Task Updated Successfully");
      return { ...state, tasks: updatedTasks };
    }

    default:
      return state;
  }
};

// Combine Reducers
const rootReducer = combineReducers({
  user: userReducer,
});

// Create Store
export const store = createStore(rootReducer);

// Task Action Creators
export const addTask = (data) => {
  return { type: AddTask, payload: data };
};

export const deleteTask = (id) => {
  return { type: DeleteTask, payload: id };
};

export const updateTask = (id, updates) => {
  return { type: UpdateTask, payload: { id, updates } };
};

// User Action Creators
export const signUp = (data) => ({ type: SignUp, payload: data });
export const signIn = (data) => ({ type: SignIn, payload: data });
export const signOut = () => ({ type: SignOut });
