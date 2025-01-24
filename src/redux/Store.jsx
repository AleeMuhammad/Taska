  
import { createStore, combineReducers } from 'redux';
import { v4 as uuidv4 } from 'uuid'; 
import { toast } from "react-toastify";

// Action Types for tasks
const AddTask = "task/add";
const DeleteTask = "Task/delete";
const UpdateTask = "task/update";

// Action Types for user
const SignUp = "user/signup";
const SignIn = "user/signin";
const SignOut = "user/signout";

// Initial States
const taskInitialState = {
  task: JSON.parse(localStorage.getItem("tasks")) || [],
};

const userInitialState = {
  user: JSON.parse(localStorage.getItem("userData")) || null,
  isAuthenticated: !!JSON.parse(localStorage.getItem("userData")),
};

// Task Reducer
const taskReducer = (state = taskInitialState, action) => {
  switch (action.type) {
    case AddTask: {
      const updatedState = {
        ...state,
        task: [...state.task, action.payload],
      };
      localStorage.setItem("tasks", JSON.stringify(updatedState.task));
      toast.success("Task Created Successfully");
      return updatedState;
    }
    case DeleteTask: {
      const updatedState = {
        ...state,
        task: state.task.filter((task) => task.id !== action.payload),
      };
      localStorage.setItem("tasks", JSON.stringify(updatedState.task));
      toast.success("Task Deleted Successfully");
      return updatedState;
    }
    case UpdateTask: {
      const updatedTasks = state.task.map((task) =>
        task.id === action.payload.id ? { ...task, ...action.payload.updates } : task
      );
      const updatedState = {
        ...state,
        task: updatedTasks,
      };
      localStorage.setItem("tasks", JSON.stringify(updatedState.task));
      toast.success("Task Updated Successfully");
      return updatedState;
    }
    default:
      return state;
  }
};

// User Reducer
const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case SignUp: {
      const updatedState = {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
      localStorage.setItem("userData", JSON.stringify(updatedState.user));
      toast.success("Sign Up Successful!");
      return updatedState;
    }
    case SignIn: {
      if (
        state.user &&
        state.user.email === action.payload.email &&
        state.user.password === action.payload.password
      ) {
        toast.success("Sign In Successful!");
        return { ...state, isAuthenticated: true };
      } else {
        toast.error("Invalid Email or Password");
        return state;
      }
    }
    case SignOut: {
      localStorage.removeItem("userData");
      toast.success("Signed Out Successfully!");
      return { user: null, isAuthenticated: false };
    }
    default:
      return state;
  }
};

// Combine Reducers
const rootReducer = combineReducers({
  tasks: taskReducer,
  user: userReducer,
});

// Create Store
export const store = createStore(rootReducer);

// Task Action Creators
export const addTask = (data) => {
  const taskWithId = { ...data, id: uuidv4() };  
  return { type: AddTask, payload: taskWithId };
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
