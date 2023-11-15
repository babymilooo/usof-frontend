import { combineReducers, configureStore } from '@reduxjs/toolkit'

import userSlice from './UserSlicer';

const rootReduser = combineReducers( {
    user: userSlice
})

export const store = configureStore({
    reducer: rootReduser,
})
