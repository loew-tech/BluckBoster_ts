import { createSlice } from "@reduxjs/toolkit";

interface APIChoiceState {
  api: string;
}

const initialState: APIChoiceState = {
  api: "REST",
};

const apiChoiceSlice = createSlice({
  name: "apiChoice",
  initialState,
  reducers: {
    toggleToRest(state) {
      state.api = "REST";
    },
    toggleToGraphQL(state) {
      state.api = "GraphQL";
    },
  },
});

export const { toggleToRest, toggleToGraphQL } = apiChoiceSlice.actions;
export default apiChoiceSlice.reducer;
