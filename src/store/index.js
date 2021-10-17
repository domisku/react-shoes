import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = {};

const filterSlice = createSlice({
    name: 'productData',
    initialState,
    reducers: {
        method1(state) {
            state.something++
        },
        method2(state, action) {
            state.counter = action.amount + state.counter;
        }
    }
});



const store = configureStore({
    reducer: filterSlice.reducer
});

export const filterActions = filterSlice.actions;

export default store;