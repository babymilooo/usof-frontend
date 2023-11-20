import { combineReducers, configureStore } from '@reduxjs/toolkit'

import userSlice from './UserSlicer';
import sidebarReducer from './Slidebar';

const rootReduser = combineReducers( {
    user: userSlice,
    sidebar: sidebarReducer
})

export const store = configureStore({
    reducer: rootReduser,
})
