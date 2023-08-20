import {UiState} from "./ui/ui-state.interface";
import {AuthState} from "./auth/auth-state.interface";
import {IncomeExpenseState} from "./income-expense/income-expense-state.interface";

export interface AppState {
  ui: UiState;
  auth: AuthState;
  incomeExpense: IncomeExpenseState;
}
