import {
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { DecimalPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { CompraService } from '../services/compra.service';
import { ProductoService } from '../../productos/services/producto.service';
import { ProductoFormComponent } from '../../productos/pages/producto-form/producto-form.component';

@Component({
  selector: 'app-compra-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    DecimalPipe
  ],
  templateUrl: './compra-form.component.html',
  styleUrl: './compra-form.component.scss'
})
export class CompraFormComponent implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly productoService = inject(ProductoService);
  private readonly compraService = inject(CompraService);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);

  productos = signal<any[]>([]);
  detalles = signal<any[]>([]);

  form = this.fb.group({
    productoId: [0, Validators.required],
    cantidad: [1, [Validators.required, Validators.min(1)]],
    precioUnitario: [0, [Validators.required, Validators.min(0.01)]],
    observacion: ['']
  });

  ngOnInit(): void {

    this.cargarProductos();

    this.form.controls.productoId
      .valueChanges
      .subscribe(productoId => {

        const producto = this.productos()
          .find(x =>
            x.productoId === Number(productoId));

        if (producto) {

          this.form.patchValue({
            precioUnitario: producto.precio
          });
        }
      });
  }

  private cargarProductos(): void {

    this.productoService
      .getAll()
      .subscribe(response => {

        this.productos.set(response.data);

        if (response.data.length > 0) {

          const producto =
            response.data[
              response.data.length - 1
            ];

          this.form.patchValue({
            productoId: producto.productoId,
            precioUnitario: producto.precio
          });
        }
      });
  }

  get productoSeleccionado(): any {

    return this.productos()
      .find(x =>
        x.productoId ===
        Number(this.form.value.productoId));
  }

  get subtotalActual(): number {

    return Number(
      (
        (this.form.value.cantidad ?? 0)
        *
        (this.form.value.precioUnitario ?? 0)
      ).toFixed(2)
    );
  }

  get totalGeneral(): number {

    return Number(
      this.detalles()
        .reduce(
          (s, x) => s + x.total,
          0
        )
        .toFixed(2)
    );
  }

  agregarProducto(): void {

    const value =
      this.form.getRawValue();

    const producto =
      this.productoSeleccionado;

    if (!producto) {

      alert(
        'Debe seleccionar un producto'
      );

      return;
    }

    const cantidad =
      value.cantidad ?? 0;

    const precioUnitario =
      value.precioUnitario ?? 0;

    if (cantidad <= 0) {

      alert(
        'La cantidad debe ser mayor a cero'
      );

      return;
    }

    const existe = this.detalles()
      .find(x =>
        x.productoId ===
        producto.productoId);

    if (existe) {

      alert(
        'El producto ya fue agregado'
      );

      return;
    }

    const total = Number(
      (
        cantidad *
        precioUnitario
      ).toFixed(2)
    );

    this.detalles.update(items => [

      ...items,

      {
        productoId:
          producto.productoId,

        nombre:
          producto.nombre,

        cantidad,

        precioUnitario,

        total
      }
    ]);

    this.form.patchValue({
      cantidad: 1
    });
  }

  eliminar(index: number): void {

    this.detalles.update(items =>
      items.filter(
        (_, i) => i !== index
      )
    );
  }

  abrirModalProducto(): void {

    const dialogRef =
      this.dialog.open(
        ProductoFormComponent,
        {
          width: '700px',
          disableClose: true
        });

    dialogRef
      .afterClosed()
      .subscribe(result => {

        if (result) {

          this.cargarProductos();
        }
      });
  }

  save(): void {

    if (
      this.detalles().length === 0
    ) {

      alert(
        'Debe agregar al menos un producto'
      );

      return;
    }

    const value =
      this.form.getRawValue();

    const request = {

      observacion:
        value.observacion ?? '',

      detalles:
        this.detalles().map(x => ({

          productoId:
            x.productoId,

          cantidad:
            x.cantidad,

          precioUnitario:
            x.precioUnitario
        }))
    };

    console.log(
      'COMPRA REQUEST',
      request
    );

    this.compraService
      .create(request)
      .subscribe({

        next: () => {

          alert(
            'Compra registrada'
          );

          this.router.navigate([
            '/dashboard'
          ]);
        },

        error: error => {

          console.error(error);

          alert(
            'Error al registrar la compra'
          );
        }
      });
  }
} 