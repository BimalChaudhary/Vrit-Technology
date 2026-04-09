import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormItem, FormState } from "../types/form/form.types";

const initialState: FormState = {
  data: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<FormItem>) => {
      state.data.push(action.payload);
    },

    updateFormData: (state, action: PayloadAction<FormItem>) => {
      const index = state.data.findIndex(
        (item) => item.id === action.payload.id,
      );

      if (index !== -1) {
        state.data[index] = {
          ...state.data[index],
          ...action.payload,
          id: state.data[index].id,
        };
      }
    },

    deleteFormData: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addFormData, updateFormData, deleteFormData } =
  formSlice.actions;

export default formSlice.reducer;
