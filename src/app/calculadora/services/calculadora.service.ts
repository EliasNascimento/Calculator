import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculadoraService {
  /* Define as constantes utilizadas para identificar as operações de cálculo*/
  static readonly SUM: string = '+';
  static readonly SUBTRACTION: string = '-';
  static readonly DIVISION: string = '/';
  static readonly MULTIPLICATION: string = '*';

  constructor() {}

  /**
   * Suport to operations sum, subtraction, division and multiplication.
   * @param num1 number
   * @param num2 number
   * @param operation string
   * @returns number result of operation
   */
  calcular(num1: number, num2: number, operation: string): number {
    let result: number;

    switch (operation) {
      case CalculadoraService.SUM:
        result = num1 + num2;
        break;
      case CalculadoraService.SUBTRACTION:
        result = num1 - num2;
        break;
      case CalculadoraService.DIVISION:
        result = num1 / num2;
        break;
      case CalculadoraService.MULTIPLICATION:
        result = num1 * num2;
        break;
      default:
        result = 0;
    }

    return result;
  }
}
