import { configureStore } from "@reduxjs/toolkit";
import selectedProvinceSlice from './selectedProvinceSlice'
import coordinateSlice from './coordinateSlice'

export const store = configureStore({
    reducer: {
        selectedProvinceSliceName: selectedProvinceSlice,
        coordinateSliceName: coordinateSlice
    }
})