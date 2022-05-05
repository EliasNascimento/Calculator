import { Component, OnInit } from '@angular/core';
import { CalculadoraService } from '../services/calculadora.service';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {


  private number1: string;
  private number2: string;
  private result: number;
  private operation: string;

  constructor(private calculadoraService: CalculadoraService) { }

  ngOnInit(): void {
    this.toClean();
  }

  /**
   * Start the operation to default value;
   *
   * @return void
   */
  toClean(): void {
    this.number1 = '0';
    this.number2 = null;
    this.result = null;
    this.operation = null;
  }

  /**
   * Add the selected number for later calculation
   *
   * @param string number
   * @return void
   */
  addNumber(number: string): void {
    if(this.operation == null) {
      this.number1 = this.concatNumber(this.number1, number);
    }else{
      this.number2 = this.concatNumber(this.number2, number);
    }
  }

  /**
   * Returns concatenated value. Handle the decimal separator
   *
   * @param string currentNumber
   * @param string concatNumber
   * @return string
   */
  concatNumber(currentNumber: string, concatNumber: string): string {

    //if it contains only '0' or null, reset the value
    if(currentNumber === '0' || currentNumber === null){
      currentNumber = '';
    }

    //The first digit is '.', concat '0' before the point
    if(concatNumber === '.' && currentNumber === ''){
      return '0.';
    }

    //case '.' is digited and have a '.', just return
    if(concatNumber === '.' && currentNumber.indexOf('.') > -1){
      return currentNumber;
    }

    return currentNumber + concatNumber;
  }

  /**
   * Executa lógica quando um operador for selecionado.
   * Caso já possua uma operação selecionada, executa a
   * operação anterior, e define a nova operação.
   *
   * @param string operation
   * @return void
   */
   setOperation(operation: string): void {
    // apenas define a operação caso não exista uma
  	if (this.operation === null) {
      this.operation = operation;
      return;
  	}

    /* caso operação definida e número 2 selecionado,
       efetua o cálculo da operação */
  	if (this.number2 !== null) {
  		this.result = this.calculadoraService.calcular(
  			parseFloat(this.number1),
  			parseFloat(this.number2),
  			this.operation);
  		this.operation = operation;
  		this.number1 = this.result.toString();
  		this.number2 = null;
  		this.result = null;
  	}
  }

  /**
   * Efetua o cálculo de uma operação.
   *
   * @return void
   */
  toCalculate(): void {
  	if (this.number2 === null) {
  		return;
  	}

  	this.result = this.calculadoraService.calcular(
  		parseFloat(this.number1),
  		parseFloat(this.number2),
  		this.operation);
  }

  /**
   * Retorna o valor a ser exibido na tela da calculadora.
   *
   * @return string
   */
  get display(): string {
  	if (this.result !== null) {
  		return this.result.toString();
  	}
  	if (this.number2 !== null) {
  		return this.number2;
  	}
  	return this.number1;
  }

}
