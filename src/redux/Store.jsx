import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { createStore } from "redux";

const initialState = {
  users: JSON.parse(localStorage.getItem("users")) || [],
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_USER":
      const updatedUsers = [...state.users, action.payload];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      toast.success("Sign Up Successful!");
      return { ...state, users: updatedUsers };

    case "LOGIN_USER":
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      toast.success("LogIn Successful!");
      return { ...state, currentUser: action.payload };

    case "LOGOUT_USER":
      localStorage.removeItem("currentUser");
      return { ...state, currentUser: null };

    case "ADD_TASK":
      const updatedTasks = [...state.tasks, action.payload];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return { ...state, tasks: updatedTasks };

      case "UPDATE_TASK":
        const modifiedTasks = state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, ...action.payload.updates } : task
        );
        localStorage.setItem("tasks", JSON.stringify(modifiedTasks));
        return { ...state, tasks: modifiedTasks };
      

        case "DELETE_TASK":
            const remainingTasks = state.tasks.filter((task) => task.id !== action.payload);
            localStorage.setItem("tasks", JSON.stringify(remainingTasks));
            return { ...state, tasks: remainingTasks };

    default:
      return state;
  }
};

const store = createStore(rootReducer);
export default store;

// Register a new user
export const registerUser = (user) => ({
  type: "REGISTER_USER",
  payload: { id: uuidv4(), ...user },
});

// Login User
export const loginUser = (user) => ({
  type: "LOGIN_USER",
  payload: user,
});

// Logout User
export const logoutUser = () => ({
  type: "LOGOUT_USER",
});

// Add a new task (Admin assigns task with selected status)
export const addTask = (task) => ({
  type: "ADD_TASK",
  payload: { id: uuidv4(), ...task },
});

// Update Task Status (Admin updates task status)
export const updateTask = (id, updates) => ({
  type: "UPDATE_TASK",
  payload: { id, updates },
});

  export const deleteTask=(id)=>({
    type:"DELETE_TASK",
    payload:id
  });