import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featureImageList: [],
  scmList: [],
  expertAdviceList: [],
};

export const addExpertAdvice = createAsyncThunk(
  "/expertAdvice/addExpertAdvice",
  async ({ image, description, title }) => {
    const formData = new FormData();
    formData.append('image', image); // File upload
    formData.append('description', description);
    formData.append('title', title);

    const response = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/common/expertAdvice/add`,
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

export const fetchAllExpertAdvice = createAsyncThunk(
  "/expertAdvice/fetchAllExpertAdvice",
  async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/common/expertAdvice`
    );

    return result?.data.expertAdvice;
  }
);

export const editExpertAdvice = createAsyncThunk(
  "/expertAdvice/editExpertAdvice",
  async ({ id, formData }) => {
    const result = await axios.put(
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/common/expertAdvice/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result?.data;
  }
);

export const deleteExpertAdvice = createAsyncThunk(
  "/expertAdvice/deleteExpertAdvice",
  async (id) => {
    const result = await axios.delete(
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/common/expertAdvice/${id}`
    );

    return result?.data;
  }
);


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
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/common/scm`
    );
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


const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchAllExpertAdvice.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchAllExpertAdvice.fulfilled, (state, action) => {
      state.isLoading = false;
      state.expertAdviceList = action.payload;
    })
    .addCase(fetchAllExpertAdvice.rejected, (state, action) => {
      state.isLoading = false;
      state.expertAdviceList = [];
    })  
    .addCase(addExpertAdvice.fulfilled, (state, action) => {
      if (action.payload && action.payload.data) {
        state.expertAdviceList.push(action.payload.data); 
      }else {
        console.error("No valid data returned for the new SCM entry.");
      } 
    })
    .addCase(deleteExpertAdvice.fulfilled, (state, action) => {
      state.expertAdviceList = state.expertAdviceList.filter(entry => entry._id !== action.payload.id); 
    })
    .addCase(editExpertAdvice.fulfilled, (state, action) => {
      if (action.payload && action.payload.expertAdvice && action.payload.expertAdvice._id) {
        const index = state.expertAdviceList.findIndex(entry => entry._id === action.payload.expertAdvice._id);
        if (index !== -1) {
          state.expertAdviceList[index] = action.payload.expertAdvice; 
        }
      } else {
        console.error("Failed to retrieve updated SCM entry.");
      }
    })
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
        state.scmList = action.payload; 
      })
      .addCase(getScmEntries.rejected, (state) => {
        state.isLoading = false;
        state.scmList = [];
      })
      .addCase(addScmEntry.fulfilled, (state, action) => {
        if (action.payload && action.payload.data) {
          state.scmList.push(action.payload.data); 
        }else {
          console.error("No valid data returned for the new SCM entry.");
        } 
      })
      .addCase(deleteScmEntry.fulfilled, (state, action) => {
        state.scmList = state.scmList.filter(entry => entry._id !== action.payload.id); 
      })
      .addCase(editScmEntry.fulfilled, (state, action) => {
        if (action.payload && action.payload.scientificCultivationMethods && action.payload.scientificCultivationMethods._id) {
          const index = state.scmList.findIndex(entry => entry._id === action.payload.scientificCultivationMethods._id);
          if (index !== -1) {
            state.scmList[index] = action.payload.scientificCultivationMethods; 
          }
        } else {
          console.error("Failed to retrieve updated SCM entry.");
        }
      });
  },
});

export default commonSlice.reducer;
