import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../state/app-state.interface";
import {IncomeExpenseData} from "../../interfaces/income-expense-data.interface";
import {Subscription} from "rxjs";
import {IncomeAndExpensesService} from "../../services/income-and-expenses.service";
import SweetAlert from "sweetalert2";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {
  public incomeAndExpenses: IncomeExpenseData[];

  private _incomeExpenseSubscription?: Subscription;

  constructor(private _store: Store<AppState>, private _incomeAndExpensesService: IncomeAndExpensesService) {
    this.incomeAndExpenses = [];
  }

  public ngOnInit(): void {
    this._initialize();
  }

  public ngOnDestroy(): void {
    this._finalize();
  }

  public removeIncomeExpense(item: IncomeExpenseData): void {
    this._incomeAndExpensesService.removeIncomeExpense(item.uid)
      .then(() => SweetAlert.fire(`${item.incomeExpense.type} removed`, '', 'success'))
      .catch(error => SweetAlert.fire('Error', error.message, 'error'));
  }

  private _initialize(): void {
    this._incomeExpenseSubscription = this._store.select('incomeExpense')
      .subscribe(state => this.incomeAndExpenses = state.items);
  }

  private _finalize(): void {
    this._incomeExpenseSubscription?.unsubscribe();
  }
}
