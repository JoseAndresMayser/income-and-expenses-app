import {AppState} from "../app-state.interface";
import {IncomeExpenseState} from "./income-expense-state.interface";

export interface AppStateWithIncomeExpense extends AppState {
  incomeExpense: IncomeExpenseState;
}
