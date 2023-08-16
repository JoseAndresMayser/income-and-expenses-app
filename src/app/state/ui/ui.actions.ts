import {createAction} from "@ngrx/store";

export const uiActions = {
  startLoading: createAction('[Ui] Start Loading'),
  stopLoading: createAction('[Ui] Stop Loading')
}
