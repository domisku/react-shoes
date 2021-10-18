import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = { brands: 'Adidas', colors: 'Brown', sizes: 'a', genders: 'g', types: 'a', seasons: 'f'};

const filterSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        updateBrand(state, action) {
            state.data = {...state.data,
                brands: action.payload.brands
            }
        },
        updateSize(state, action) {
            state.data = {...state.data,
                sizes: action.payload.sizes
            }
        },
        updateColor(state, action) {
            state.data = {...state.data,
                colors: action.payload.colors
            }
        },
        updateGender(state, action) {
            state.data = {...state.data,
                genders: action.payload.genders
            }
        },
        updateType(state, action) {
            state.data = {...state.data,
                types: action.payload.types
            }
        },
        updateSeason(state, action) {
            state.data = {...state.data,
                seasons: action.payload.seasons
            }
        },
        updatePrice(state, action) {
            state.data = {...state.data,
                prices: action.payload.prices
            }
        }
    }
});

const store = configureStore({
    reducer: filterSlice.reducer
});

export const filterActions = filterSlice.actions;

export default store;