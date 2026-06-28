import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { ProductoService } from '../../services/producto.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.scss'
})
export class ProductoFormComponent {
  constructor() {
  
  }


  private readonly dialogRef =
    inject(MatDialogRef<ProductoFormComponent>, {
      optional: true
    });
  private readonly fb = inject(FormBuilder);

  private readonly productoService =
    inject(ProductoService);

  private readonly router =
    inject(Router);

  form = this.fb.group({
    codigo: ['', Validators.required],
    nombre: ['', Validators.required],
    descripcion: [''],
    precio: [0, Validators.required]
  });

  save(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.productoService
      .create(this.form.getRawValue() as any)
      .subscribe(() => {

        alert('Producto registrado');
        if (this.dialogRef) {

          this.dialogRef.close(true);

          return;
        }

        this.router.navigate([
          '/productos'
        ]);
      });
  }

  cancelar(): void {

    if (this.dialogRef) {

      this.dialogRef.close();

      return;
    }

    this.router.navigate([
      '/productos'
    ]);
  }
}