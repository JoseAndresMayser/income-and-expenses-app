import {UiState} from "./ui/ui-state.interface";
import {AuthState} from "./auth/auth-state.interface";

export interface AppState {
  ui: UiState;
  auth: AuthState;
}
