import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authState {
  accessToken: string | null;
}

const authState: authState = {
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
