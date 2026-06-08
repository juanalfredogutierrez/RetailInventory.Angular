import { VentaDetalle } from "./venta-request.model";

export interface VentaRequest {
  observacion: string;
  detalles: VentaDetalle[];
}