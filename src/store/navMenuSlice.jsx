import { createSlice } from '@reduxjs/toolkit';
import { HomeFilled } from '@ant-design/icons';
const initialState = {
    title: 'Home',
    icon: <HomeFilled />,
};

const navMenuSlice = createSlice({
    name: 'navMenu',
    initialState,
    reducers: {
        setNaveMenu: (state, action) => {
            state.title = action.payload.title;
            state.icon = action.payload.icon;
        },
    },
});
export const { setNaveMenu } = navMenuSlice.actions;
export default navMenuSlice.reducer;
