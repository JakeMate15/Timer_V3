import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './servicios/auth.guard';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';
import { TimerComponent } from './timer/timer.component';
import { RankingsComponent } from './rankings/rankings.component';
import { AmigosComponent } from './amigos/amigos.component';
import { FooterComponent } from './footer/footer.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { 
        path: 'home', 
        component: HomeComponent, 
        canActivate: [AuthGuard],
        children: [
            { path: 'acerca-de', component: AcercaDeComponent },
            { path: 'timer', component: TimerComponent },
            { path: 'rankings', component: RankingsComponent },
            { path: 'amigos', component: AmigosComponent}
        ]
    }
];
