import { createSlice } from "@reduxjs/toolkit";

const selectedProvinceSlice = createSlice({
    name: 'selectedProvinceSliceName',
    initialState: '',
    reducers: {
        selectProvince: (state, action) => state = action.payload
    }
})

export const { actions, reducer } = selectedProvinceSlice;
export const { selectProvince } = actions
export default reducer
