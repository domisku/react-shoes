import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialFilterState = { data: null };

const filterSlice = createSlice({
  name: "filter",
  initialState: initialFilterState,
  reducers: {
    updateBrand(state, action) {
      state.data = { ...state.data, brands: action.payload.brands };
    },
    updateSize(state, action) {
      state.data = { ...state.data, sizes: action.payload.sizes };
    },
    updateColor(state, action) {
      state.data = { ...state.data, colors: action.payload.colors };
    },
    updateGender(state, action) {
      state.data = { ...state.data, genders: action.payload.genders };
    },
    updateType(state, action) {
      state.data = { ...state.data, types: action.payload.types };
    },
    updateSeason(state, action) {
      state.data = { ...state.data, seasons: action.payload.seasons };
    },
    updatePrice(state, action) {
      state.data = { ...state.data, prices: action.payload.prices };
    },
  },
});

let logoutTimer;

function calculateRemainingTime(expirationTime) {
  const currentTime = new Date().getTime();
  const remainingDuration = expirationTime - currentTime;

  return remainingDuration;
}

const initialAuthState = {
  idToken: localStorage.getItem("token"),
  username: null,
  modalClosed: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    storeIdToken(state, action) {
      state.idToken = action.payload.idToken;
      localStorage.setItem("token", action.payload.idToken);
    },
    storeUsername(state, action) {
      state.username = action.payload.username;
      localStorage.setItem("username", action.payload.username);
    },
    storeTokenExpirationTime(state, action) {
      const remainingTime = calculateRemainingTime(
        action.payload.expirationTime
      );
      logoutTimer = setTimeout(() => localStorage.clear(), remainingTime);
      localStorage.setItem(
        "expirationTime",
        action.payload.expirationTime.toString()
      );
    },
    logout(state) {
      state.idToken = null;
      localStorage.clear();
      if (logoutTimer) clearTimeout(logoutTimer);
    },
    modalClosed(state) {
      state.modalClosed++;
    },
  },
});

const store = configureStore({
  reducer: { filter: filterSlice.reducer, auth: authSlice.reducer },
});

export const filterActions = filterSlice.actions;
export const authActions = authSlice.actions;

export default store;
