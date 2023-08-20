import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IncomeExpense} from "../models/income-expense.model";
import {IncomeAndExpensesService} from "../services/income-and-expenses.service";
import SweetAlert from "sweetalert2";
import {Store} from "@ngrx/store";
import {AppState} from "../state/app-state.interface";
import {Subscription} from "rxjs";
import {uiActions} from "../state/ui/ui.actions";

@Component({
  selector: 'app-income-and-expenses',
  templateUrl: './income-and-expenses.component.html',
  styleUrls: ['./income-and-expenses.component.css']
})
export class IncomeAndExpensesComponent implements OnInit, OnDestroy {
  public incomeAndExpensesFormGroup?: FormGroup;
  public type: string;
  public isLoading: boolean;

  private _uiSubscription?: Subscription;

  constructor(private _formBuilder: FormBuilder,
              private _incomeAndExpensesService: IncomeAndExpensesService,
              private _store: Store<AppState>) {
    this.type = 'INCOME';
    this.isLoading = false;
  }

  public ngOnInit(): void {
    this._initialize();
  }

  public ngOnDestroy(): void {
    this._finalize();
  }

  public saveIncomeExpense(): void {
    if (!this.incomeAndExpensesFormGroup || this.incomeAndExpensesFormGroup.invalid) {
      return;
    }
    this._store.dispatch(uiActions.startLoading());
    const {description, amount} = this.incomeAndExpensesFormGroup.value;
    const incomeExpense: IncomeExpense = new IncomeExpense(description, amount, this.type);
    this._incomeAndExpensesService.createIncomeExpense(incomeExpense)
      .then(() => {
        this._store.dispatch(uiActions.stopLoading());
        SweetAlert.fire(`${this.type} created`, description, 'success');
        this.incomeAndExpensesFormGroup?.reset();
      })
      .catch(error => {
        this._store.dispatch(uiActions.stopLoading());
        SweetAlert.fire('Error', error.message, 'error')
      });
  }

  private _initialize(): void {
    this.incomeAndExpensesFormGroup = this._formBuilder.group({
      description: ['', Validators.required],
      amount: [0, Validators.required]
    });
    this._uiSubscription = this._store.select('ui')
      .subscribe(ui => this.isLoading = ui.isLoading);
  }

  private _finalize(): void {
    this._uiSubscription?.unsubscribe();
  }
}
