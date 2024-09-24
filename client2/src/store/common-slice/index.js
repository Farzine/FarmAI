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
    console.log(response.data, "API Response for SCM Entries");
    return response.data.scientificCultivationMethods;
  }
);

export const addScmEntry = createAsyncThunk(
  "/scm/addScmEntry",
  async ({ image, description, crop_name }) => {
    const formData = new FormData();
    formData.append('image', image); // File upload
    formData.append('description', description);
    formData.append('crop_name', crop_name);

    const response = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/common/scm/add`,
      formData, 
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
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
  async ({ id, formData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/common/scm/${id}`,
      formData, // Send FormData directly
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
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
        console.log(action.payload, "SCM Entries payload"); 
        state.isLoading = false;
        state.scmList = action.payload; // Store SCM entries
      })
      .addCase(getScmEntries.rejected, (state) => {
        state.isLoading = false;
        state.scmList = [];
      })
      .addCase(addScmEntry.fulfilled, (state, action) => {
        if (action.payload && action.payload.data) {
          state.scmList.push(action.payload.data); // Push the new entry only if it's valid
        }else {
          console.error("No valid data returned for the new SCM entry.");
        } 
      })
      .addCase(deleteScmEntry.fulfilled, (state, action) => {
        state.scmList = state.scmList.filter(entry => entry._id !== action.payload.id); // Remove deleted entry
      })
      .addCase(editScmEntry.fulfilled, (state, action) => {
        if (action.payload && action.payload.scientificCultivationMethods && action.payload.scientificCultivationMethods._id) {
          const index = state.scmList.findIndex(entry => entry._id === action.payload.scientificCultivationMethods._id);
          if (index !== -1) {
            state.scmList[index] = action.payload.scientificCultivationMethods; // Update the specific SCM entry
          }
        } else {
          console.error("Failed to retrieve updated SCM entry.");
        }
      });
  },
});

export default commonSlice.reducer;
