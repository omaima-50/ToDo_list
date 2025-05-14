// src/Features/AdminSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config";

const initialState = {
  admin: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
};

// Register Admin
export const registerAdmin = createAsyncThunk(
  "admins/registerAdmin",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${ENV.SERVER_URL}/registerAdmin`, {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
      return response.data.user;
    } catch (error) {
      return rejectWithValue("Admin registration failed");
    }
  }
);

// Login Admin
export const loginadmin = createAsyncThunk(
  "admins/loginadmin",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${ENV.SERVER_URL}/loginadmin`, {
        email: userData.email,
        password: userData.password,
      });
      return response.data.user;
    } catch (error) {
      return rejectWithValue("Invalid admin credentials");
    }
  }
);

// Logout Admin
export const logoutadmin = createAsyncThunk(
  "admins/logoutadmin",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${ENV.SERVER_URL}/logoutadmin`);
      return {};
    } catch (error) {
      return rejectWithValue("Logout failed");
    }
  }
);

const adminsSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {
    reset: (state) => {
      state.admin = {};
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.admin = action.payload;
      })
      .addCase(registerAdmin.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // Login
      .addCase(loginadmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginadmin.fulfilled, (state, action) => {
        state.admin = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(loginadmin.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // Logout
      .addCase(logoutadmin.fulfilled, (state) => {
        state.admin = {};
        state.isLoading = false;
        state.isSuccess = false;
      });
  },
});

export const { reset, setAdmin } = adminsSlice.actions;
export default adminsSlice.reducer;


// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import * as ENV from "../config";

// const initialState = {
//   admin: {},
//   isLoading: false,
//   isSuccess: false,
//   isError: false,
//   errorMessage: "", // Added to store specific error messages
// };

// // Register Admin
// export const registerAdmin = createAsyncThunk(
//   "admins/registerAdmin",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${ENV.SERVER_URL}/registerAdmin`, {
//         name: userData.name,
//         email: userData.email,
//         password: userData.password,
//       });
      
//       // Validate response structure
//       if (!response.data?.user) {
//         throw new Error("Invalid response structure from server");
//       }
      
//       return response.data.user;
//     } catch (error) {
//       // Enhanced error handling
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         return rejectWithValue(error.response.data?.error || error.response.data?.message || "Admin registration failed");
//       } else if (error.request) {
//         // The request was made but no response was received
//         return rejectWithValue("No response from server");
//       } else {
//         // Something happened in setting up the request
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );

// // [Keep other thunks the same...]

// const adminsSlice = createSlice({
//   name: "admins",
//   initialState,
//   reducers: {
//     reset: (state) => {
//       state.admin = {};
//       state.isLoading = false;
//       state.isSuccess = false;
//       state.isError = false;
//       state.errorMessage = "";
//     },
//     setAdmin: (state, action) => {
//       state.admin = action.payload;
//     },
//     clearError: (state) => {
//       state.isError = false;
//       state.errorMessage = "";
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // Register
//       .addCase(registerAdmin.pending, (state) => {
//         state.isLoading = true;
//         state.isSuccess = false;
//         state.isError = false;
//         state.errorMessage = "";
//       })
//       .addCase(registerAdmin.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.admin = action.payload;
//         state.errorMessage = "";
//       })
//       .addCase(registerAdmin.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.errorMessage = action.payload || "Admin registration failed";
//       })

//       // [Keep other cases the same...]
//   },
// });

// export const { reset, setAdmin, clearError } = adminsSlice.actions;
// export default adminsSlice.reducer;