import {ActionReducer, createReducer, on} from "@ngrx/store";
import {IncomeExpenseState} from "./income-expense-state.interface";
import {incomeExpenseActions} from "./income-expense.actions";

export const initialState: IncomeExpenseState = {
  items: []
}

export const incomeExpenseReducer: ActionReducer<IncomeExpenseState> = createReducer(
  initialState,
  on(
    incomeExpenseActions.setItems,
    (state, {items}) => ({...state, items: [...items]})
  ),
  on(incomeExpenseActions.removeItems, state => ({...state, items: []}))
);
