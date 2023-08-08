import {Routes} from "@angular/router";
import {StatisticsComponent} from "../income-and-expenses/statistics/statistics.component";
import {IncomeAndExpensesComponent} from "../income-and-expenses/income-and-expenses.component";
import {DetailComponent} from "../income-and-expenses/detail/detail.component";

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: StatisticsComponent
  },
  {
    path: 'income-and-expenses',
    component: IncomeAndExpensesComponent
  },
  {
    path: 'detail',
    component: DetailComponent
  }
];
