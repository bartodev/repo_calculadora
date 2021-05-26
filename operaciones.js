class Calculadora {
    constructor(upperTextElement, bottomTextElement){
        this.upperTextElement = upperTextElement
        this.bottomTextElement = bottomTextElement
        this.clear()
    }

    clear() {
        this.bottom = ''
        this.upper = ''
        this.cuenta= undefined
    }

    borrar() {
        this.bottom = this.bottom.toString().slice(0, -1)
    }
    
    agregarNumeros(numero) {
        if(numero == '.' && this.bottom.includes('.')) return
        this.bottom = this.bottom.toString() + numero.toString()
    }

    elegirOperacion(cuenta) {
        if(this.bottom === '') return
        if(this.upper !== '') {
            this.calcular()
        }
        this.cuenta = cuenta
        this.upper = this.bottom
        this.bottom = ''
    }
    
    calcular() {
        const upp = parseFloat(this.upper)
        const bott = parseFloat(this.bottom)
        if (isNaN(upp) || isNaN(bott)) return
        let resultado = ''; 
        const Operaciones = {
            '+': resultado = upp + bott,
            '-': resultado = upp - bott,
            '÷': resultado = upp / bott,
            'x': resultado = upp * bott
        }
        const default_Cuenta = ''
        const res = (Operaciones[this.cuenta] || default_Cuenta)
        this.upper = ''
        this.bottom = res
        this.cuenta = undefined
    }
    
    numeroPutuacion(num) {
        const txtNum = num.toString();
        const intNum = parseFloat(txtNum.split('.')[0])
        const floatNum = txtNum.split('.')[1]
        let intDisplay
        if(isNaN(intNum)){
            intDisplay = 0
        } else {
            intDisplay = intNum.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if(floatNum != null) {
            return `${intDisplay}.${floatNum}`
        }else {
            return intDisplay
        }
    }


    updateDisplay() {
        this.bottomTextElement.innerText = this.numeroPutuacion(this.bottom)
        if(this.cuenta != null) {
            this.upperTextElement.innerText = `${this.numeroPutuacion(this.upper)} ${this.cuenta}`
        } else {
            this.upperTextElement.innerText = ''
        }
        
    }
}

const numero = document.querySelectorAll('[medio-numero]')
const operacion = document.querySelectorAll('[medio-operacion]')
const igual = document.querySelector('[medio-igual]')
const suprimir = document.querySelector('[medio-suprimir]')
const allClear = document.querySelector('[medio-all-clear]')
const upperTextElement = document.querySelector('[medio-upper]')
const bottomTextElement = document.querySelector('[medio-bottom]')

const calculadora = new Calculadora(upperTextElement, bottomTextElement)

numero.forEach(button => {
    button.addEventListener('click', () => {
        calculadora.agregarNumeros(button.innerText)
        calculadora.updateDisplay()
    })
})

operacion.forEach(button => {
    button.addEventListener('click', () => {
        calculadora.elegirOperacion(button.innerText)
        calculadora.updateDisplay()
    })
})

igual.addEventListener('click', button => {
    calculadora.calcular()
    calculadora.updateDisplay()
})

allClear.addEventListener('click', button => {
    calculadora.clear()
    calculadora.updateDisplay()
})

suprimir.addEventListener('click', button => {
    calculadora.borrar()
    calculadora.updateDisplay()
})