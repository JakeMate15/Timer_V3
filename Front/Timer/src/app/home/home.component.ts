import { Component } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
    currentUser: Usuario | null = null;

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/login']);
        } else {
            this.currentUser = this.authService.getCurrentUser();
        }
    }
}
