import {createAction, props} from "@ngrx/store";
import {User} from "../../models/user.model";

export const authActions = {
  setUser: createAction(
    '[Auth] Set User',
    props<{ user: User }>()
  ),
  removeUser: createAction('[Auth] Remove User')
}
