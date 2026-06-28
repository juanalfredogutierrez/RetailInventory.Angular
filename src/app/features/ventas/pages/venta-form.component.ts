import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { DecimalPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { ProductoService } from '../../productos/services/producto.service';
import { VentaService } from '../services/venta.service';
import { InventarioService } from '../../kardex/services/inventario.service';

@Component({
  selector: 'app-venta-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    DecimalPipe
  ],
  templateUrl: './venta-form.component.html',
  styleUrl: './venta-form.component.scss'
})
export class VentaFormComponent implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly productoService = inject(ProductoService);
  private readonly ventaService = inject(VentaService);
  private readonly inventarioService = inject(InventarioService);
  private readonly router = inject(Router);

  productos = signal<any[]>([]);
  detalles = signal<any[]>([]);
  stockDisponible = signal(0);

  form = this.fb.group({
    productoId: [0, Validators.required],
    cantidad: [1, [Validators.required, Validators.min(1)]],
    observacion: ['']
  });

  ngOnInit(): void {

    this.productoService
      .getAll()
      .subscribe(response => {

        this.productos.set(response.data);

        if (response.data.length > 0) {

          const productoId =
            response.data[0].productoId;

          this.form.patchValue({
            productoId
          });

          this.cargarStock(productoId);
        }
      });

    this.form.controls.productoId
      .valueChanges
      .subscribe(productoId => {

        if (productoId) {

          this.cargarStock(
            Number(productoId)
          );
        }
      });
  }

  cargarStock(productoId: number): void {

    this.inventarioService
      .getStock(productoId)
      .subscribe({

        next: response => {

          this.stockDisponible.set(
            response.data
          );
        },

        error: error => {
          this.stockDisponible.set(0);
        }
      });
  }

  get productoSeleccionado(): any {

    return this.productos()
      .find(x =>
        x.productoId ===
        Number(this.form.value.productoId));
  }

  get precioSeleccionado(): number {

    return this.productoSeleccionado?.precio ?? 0;
  }

  get subtotalActual(): number {

    return Number(
      (
        (this.form.value.cantidad ?? 0)
        * this.precioSeleccionado
      ).toFixed(2)
    );
  }

  get igvActual(): number {

    return Number(
      (
        this.subtotalActual * 0.18
      ).toFixed(2)
    );
  }

  get totalActual(): number {

    return Number(
      (
        this.subtotalActual +
        this.igvActual
      ).toFixed(2)
    );
  }

  get subtotalGeneral(): number {

    return Number(
      this.detalles()
        .reduce((s, x) => s + x.subtotal, 0)
        .toFixed(2)
    );
  }

  get igvGeneral(): number {

    return Number(
      this.detalles()
        .reduce((s, x) => s + x.igv, 0)
        .toFixed(2)
    );
  }

  get totalGeneral(): number {

    return Number(
      this.detalles()
        .reduce((s, x) => s + x.total, 0)
        .toFixed(2)
    );
  }

  agregarProducto(): void {

    const value = this.form.getRawValue();

    const producto = this.productoSeleccionado;

    if (!producto) {

      alert('Debe seleccionar un producto');

      return;
    }

    const cantidad = value.cantidad ?? 0;

    if (cantidad <= 0) {

      alert(
        'La cantidad debe ser mayor a cero'
      );

      return;
    }

    if (cantidad > this.stockDisponible()) {

      alert(
        `La cantidad no debe ser mayor al stock disponible (${this.stockDisponible()})`
      );

      return;
    }

    const existe = this.detalles()
      .find(x =>
        x.productoId === producto.productoId);

    if (existe) {

      alert(
        'El producto ya fue agregado'
      );

      return;
    }

    const subtotal = Number(
      (cantidad * producto.precio)
        .toFixed(2)
    );

    const igv = Number(
      (subtotal * 0.18)
        .toFixed(2)
    );

    const total = Number(
      (subtotal + igv)
        .toFixed(2)
    );

    this.detalles.update(items => [

      ...items,

      {
        productoId: producto.productoId,
        nombre: producto.nombre,
        precioUnitario: producto.precio,
        cantidad,
        subtotal,
        igv,
        total
      }
    ]);

    this.form.patchValue({
      cantidad: 1
    });
  }

  eliminar(index: number): void {

    this.detalles.update(
      items => items.filter(
        (_, i) => i !== index
      )
    );
  }

  save(): void {

    if (this.detalles().length === 0) {

      alert(
        'Debe agregar al menos un producto'
      );

      return;
    }

    const value = this.form.getRawValue();

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



    this.ventaService
      .create(request)
      .subscribe({

        next: () => {

          alert(
            'Venta registrada'
          );

          this.router.navigate([
            '/dashboard'
          ]);
        },

        error: error => {

          if (
            error?.error?.errors?.length > 0
          ) {

            alert(
              error.error.errors
                .map((x: any) => x.message)
                .join('\n')
            );

            return;
          }

          alert(
            'Error al registrar la venta'
          );
        }
      });
  }
}