import {ActionReducer, createReducer, on} from "@ngrx/store";
import {UiState} from "./ui-state.interface";
import {uiActions} from "./ui.actions";

export const initialState: UiState = {
  isLoading: false
};

export const uiReducer: ActionReducer<UiState> = createReducer(
  initialState,
  on(uiActions.startLoading, state => ({...state, isLoading: true})),
  on(uiActions.stopLoading, state => ({...state, isLoading: false}))
);
