import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from "../dashboard/dashboard.component";
import {IncomeAndExpensesComponent} from "./income-and-expenses.component";
import {StatisticsComponent} from "./statistics/statistics.component";
import {DetailComponent} from "./detail/detail.component";
import {ReactiveFormsModule} from "@angular/forms";
import {NgChartsModule} from "ng2-charts";
import {SharedModule} from "../shared/shared.module";
import {DashboardRoutesModule} from "../dashboard/dashboard-routes.module";
import {StoreModule} from "@ngrx/store";
import {incomeExpenseReducer} from "../state/income-expense/income-expense.reducer";

@NgModule({
  declarations: [
    DashboardComponent,
    IncomeAndExpensesComponent,
    StatisticsComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('incomeExpense', incomeExpenseReducer),
    ReactiveFormsModule,
    NgChartsModule,
    SharedModule,
    DashboardRoutesModule
  ]
})
export class IncomeAndExpensesModule {
}
