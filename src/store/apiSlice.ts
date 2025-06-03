import { createSlice } from "@reduxjs/toolkit";

interface APIChoiceState {
  api: string;
}

const initialState: APIChoiceState = {
  api: "rest",
};

const apiChoiceSlice = createSlice({
  name: "apiChoice",
  initialState,
  reducers: {
    toggleToRest(state) {
      state.api = "rest";
    },
    toggleToGraphQL(state) {
      state.api = "graphQL";
    },
  },
});

export const { toggleToRest, toggleToGraphQL } = apiChoiceSlice.actions;
export default apiChoiceSlice.reducer;
