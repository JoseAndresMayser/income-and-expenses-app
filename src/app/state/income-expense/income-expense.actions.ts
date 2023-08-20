import {createAction, props} from "@ngrx/store";
import {IncomeExpenseData} from "../../interfaces/income-expense-data.interface";

export const incomeExpenseActions = {
  setItems: createAction(
    '[IncomeExpense] Set Items',
    props<{ items: IncomeExpenseData[] }>()
  ),
  removeItems: createAction('[IncomeExpense] Remove Items')
};
