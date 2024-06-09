import { configureStore } from "@reduxjs/toolkit";
import themseSliceReducer from "../src/Features/themeSlice"
import { apiSlice } from '../src/Features/apiSlice';
import cartSliceReducer from '../src/Features/cartSlice';
import authSliceReducer from '../src/Features/authSlice';
import pcBuilderSlice from '../src/Features/pcBuilderSlice';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        theme: themseSliceReducer,
        cart: cartSliceReducer,
        auth: authSliceReducer,
        customPc: pcBuilderSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export default store;