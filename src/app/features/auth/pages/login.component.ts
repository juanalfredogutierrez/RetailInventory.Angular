import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../../../core/services/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly tokenService = inject(TokenService);
  private readonly router = inject(Router);

  loading = false;
  errorMessage = '';

  loginForm = this.fb.nonNullable.group({
    userName: ['admin', Validators.required],
    password: ['Admin123*', Validators.required]
  });

  login(): void {

    if (this.loginForm.invalid)
      return;

    this.loading = true;
    this.errorMessage = '';

    this.authService
      .login(this.loginForm.getRawValue())
      .subscribe({
        next: response => {

          this.tokenService.setToken(
            response.data
          );

          this.router.navigate(['/dashboard']);
        },

        error: error => {

          this.errorMessage =
            error?.error?.errors?.[0]?.message ??
            'Credenciales inválidas';

          this.loading = false;
        },

        complete: () => {

          this.loading = false;
        }
      });
  }
}