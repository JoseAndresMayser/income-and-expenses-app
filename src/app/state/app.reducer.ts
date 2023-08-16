import {ActionReducerMap} from "@ngrx/store";
import {AppState} from "./app-state.interface";
import {uiReducer} from "./ui/ui.reducer";
import {authReducer} from "./auth/auth.reducer";

export const appReducer: ActionReducerMap<AppState> = {
  ui: uiReducer,
  auth: authReducer
};
