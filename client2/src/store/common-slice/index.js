import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featureImageList: [],
  scmList: [],
};

export const getFeatureImages = createAsyncThunk(
  "/order/getFeatureImages",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/common/feature/get`
    );

    return response.data;
  }
);

export const addFeatureImage = createAsyncThunk(
  "/order/addFeatureImage",
  async (image) => {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/common/feature/add`,
      { image }
    );

    return response.data;
  }
);

export const getScmEntries = createAsyncThunk(
  "/scm/getScmEntry",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/common/scm/`
    );

    return response.data;
  }
);

export const addScmEntry = createAsyncThunk(
  "/scm/addScmEntry",
  async ({ path, public_id, description, crop_name }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/common/scm/add`,
      { path, public_id, description, crop_name } // Adjusted to match Mongoose model
    );

    return response.data;
  }
);

export const deleteScmEntry = createAsyncThunk(
  "/scm/deleteScmEntry",
  async (id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/common/scm/${id}`
    );

    return response.data;
  }
);

export const editScmEntry = createAsyncThunk(
  "/scm/editScmEntry",
  async ({ id, updatedData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/common/scm/${id}`,
      updatedData // Ensure this matches the model structure
    );

    return response.data;
  }
);

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      })
      .addCase(getScmEntries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getScmEntries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.scmList = action.payload.data; // Store SCM entries
      })
      .addCase(getScmEntries.rejected, (state) => {
        state.isLoading = false;
        state.scmList = [];
      })
      .addCase(addScmEntry.fulfilled, (state, action) => {
        state.scmList.push(action.payload.data); // Add new entry to the list
      })
      .addCase(deleteScmEntry.fulfilled, (state, action) => {
        state.scmList = state.scmList.filter(entry => entry._id !== action.payload.id); // Remove deleted entry
      })
      .addCase(editScmEntry.fulfilled, (state, action) => {
        const index = state.scmList.findIndex(entry => entry._id === action.payload.data._id);
        if (index !== -1) {
          state.scmList[index] = action.payload.data; // Update entry
        }
      });
  },
});

export default commonSlice.reducer;
