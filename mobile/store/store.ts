// store.ts
import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { User } from '../interface/user.interface';


export interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    LogoutAction: state => {
      state.user = null;
    },
    LoginAction: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const {LoginAction, LogoutAction} = authSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
