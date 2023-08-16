import {ActionReducer, createReducer, on} from "@ngrx/store";
import {authActions} from "./auth.actions";
import {AuthState} from "./auth-state.interface";

export const initialState: AuthState = {
  user: null
};

export const authReducer: ActionReducer<AuthState> = createReducer(
  initialState,
  on(authActions.setUser, (state, {user}) => ({...state, user: {...user}})),
  on(authActions.removeUser, state => ({...state, user: null}))
);
