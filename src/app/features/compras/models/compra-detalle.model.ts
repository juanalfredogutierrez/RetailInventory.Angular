import { CompraDetalle } from "./compra-request.model";

export interface CompraRequest {
  observacion: string;
  detalles: CompraDetalle[];
}