import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../state/app-state.interface";
import {filter, Subscription} from "rxjs";
import {IncomeAndExpensesService} from "../services/income-and-expenses.service";
import {User} from "../models/user.model";
import {incomeExpenseActions} from "../state/income-expense/income-expense.actions";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private _authSubscription?: Subscription;
  private _incomeAndExpensesSubscription?: Subscription;

  constructor(private _store: Store<AppState>, private _incomeAndExpensesService: IncomeAndExpensesService) {
  }

  public ngOnInit(): void {
    this._authSubscription = this._store.select('auth')
      .pipe(
        filter(auth => !!auth.user)
      ).subscribe(auth => {
        const user: User | null = auth.user;
        if (!user) {
          return;
        }
        this._incomeAndExpensesSubscription = this._incomeAndExpensesService.getIncomeAndExpenses(user.uid)
          .subscribe(
            items => this._store.dispatch(incomeExpenseActions.setItems({items}))
          );
      });
  }

  public ngOnDestroy(): void {
    this._authSubscription?.unsubscribe();
    this._incomeAndExpensesSubscription?.unsubscribe();
  }
}
