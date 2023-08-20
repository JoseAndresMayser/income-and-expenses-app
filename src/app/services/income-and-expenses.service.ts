import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IncomeExpense} from "../models/income-expense.model";
import {AuthService} from "./auth.service";
import {User} from "../models/user.model";
import {DocumentReference} from "@angular/fire/compat/firestore/interfaces";
import {map, Observable} from "rxjs";
import {IncomeExpenseData} from "../interfaces/income-expense-data.interface";

@Injectable({
  providedIn: 'root'
})
export class IncomeAndExpensesService {
  constructor(private _firestore: AngularFirestore, private _authService: AuthService) {
  }

  public getIncomeAndExpenses(uid: string): Observable<IncomeExpenseData[]> {
    return this._firestore.collection(`${uid}/income-and-expenses/items`)
      .snapshotChanges()
      .pipe(
        map(snapshot =>
          snapshot.map<IncomeExpenseData>(element => ({
            uid: element.payload.doc.id,
            incomeExpense: element.payload.doc.data() as IncomeExpense
          }))
        )
      );
  }

  public createIncomeExpense(incomeExpense: IncomeExpense): Promise<DocumentReference> {
    const user: User | undefined = this._authService.getUser();
    return this._firestore.collection<IncomeExpense>(`${user?.uid}/income-and-expenses/items`)
      .add({...incomeExpense});
  }

  public removeIncomeExpense(incomeExpenseUid: string): Promise<void> {
    const user: User | undefined = this._authService.getUser();
    return this._firestore.doc(`${user?.uid}/income-and-expenses/items/${incomeExpenseUid}`).delete();
  }
}
