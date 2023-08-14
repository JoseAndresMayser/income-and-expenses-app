import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./auth/login/login.component";
import {RegistrationComponent} from "./auth/registration/registration.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {dashboardRoutes} from "./dashboard/dashboard.routes";
import {authGuard} from "./auth/guards/auth.guard";

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'registration',
        component: RegistrationComponent
    },
    {
        path: '',
        component: DashboardComponent,
        children: dashboardRoutes,
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
