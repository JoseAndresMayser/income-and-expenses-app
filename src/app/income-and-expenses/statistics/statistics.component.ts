import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {IncomeExpenseData} from "../../interfaces/income-expense-data.interface";
import {IncomeExpense} from "../../models/income-expense.model";
import {ChartData, ChartType} from "chart.js";
import {AppStateWithIncomeExpense} from "../../state/income-expense/app-state-with-income-expense.interface";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  public totalIncome: number;
  public totalExpenses: number;
  public incomeAmount: number;
  public expensesAmount: number;
  public doughnutChartLabels: string[];
  public doughnutChartData: ChartData<'doughnut'>;
  public doughnutChartType: ChartType;

  constructor(private _store: Store<AppStateWithIncomeExpense>) {
    this.totalIncome = 0;
    this.totalExpenses = 0;
    this.incomeAmount = 0;
    this.expensesAmount = 0;
    this.doughnutChartLabels = ['Income', 'Expenses'];
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: []
    };
    this.doughnutChartType = 'doughnut';
  }

  public ngOnInit(): void {
    this._initialize();
  }

  private _initialize(): void {
    this._store.select('incomeExpense')
      .subscribe(state => this._generateStatistics(state.items))
  }

  private _generateStatistics(items: IncomeExpenseData[]): void {
    this.totalIncome = 0;
    this.totalExpenses = 0;
    this.incomeAmount = 0;
    this.expensesAmount = 0;
    items.forEach(item => {
      const incomeExpense: IncomeExpense = item.incomeExpense;
      const amount: number = incomeExpense.amount;
      if (incomeExpense.type === 'INCOME') {
        this.totalIncome += amount;
        this.incomeAmount += 1;
      } else {
        this.totalExpenses += amount;
        this.expensesAmount += 1;
      }
    });
    this.doughnutChartData.datasets.push({data: [this.totalIncome, this.totalExpenses]});
  }
}
