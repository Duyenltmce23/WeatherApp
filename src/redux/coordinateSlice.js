import { createSlice } from "@reduxjs/toolkit";

const coordinateSlice = createSlice({
    name: 'coordinateSliceName',
    initialState: {},
    reducers: {
        setCoordinate: (state, action) => state = action.payload
    }
})
export const { actions, reducer } = coordinateSlice;
export const { setCoordinate } = actions;
export default reducer
