//Constructores

function Seguro (marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;


}
//Realiza cotizacion
Seguro.prototype.cotizarSeguro = function () {
    
    let cantidad;
    const basico = 2000;

    
    switch (this.marca) {
        case '1':
            cantidad = basico * 1.15;
            break;
        case '2':
            cantidad = basico * 1.05;
            break;
        case '3':
            cantidad = basico * 1.35;
            break;
        default:
            break;
    }

    //Leer año
    const diferencia = new Date().getFullYear() - this.year;
    
    //Cada año el costo va a redurcirse 3%
    cantidad -= ((diferencia * 3) * cantidad) / 100;

    //Basico se multiplica por 30% mas
    //Completo se multiplica por 50% mas

    if(this.tipo === 'basico'){
        cantidad *= 1.30;
    }else{
        cantidad *= 1.50;

    }
    return cantidad;


    console.log(cantidad);
}


function UI() {}

//LLena las opciones de los años

UI.prototype.llenarOpciones = () =>{
    const max = new Date().getFullYear();
          min = max - 20;

          const selectYear = document.querySelector('#year');

          for(let i = max; i > min; i--){
            let option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            selectYear.appendChild(option);

          }
}

//Mostar alertas

UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement ('div');



    if (tipo === 'error'){
        div.classList.add('mensaje', 'error')
    }else{
        div.classList.add('mensaje', 'correcto');
    }


    div.classList.add('mensake', 'mt-10')
    div.textContent = mensaje;
    
    //Insertar en el HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000);


}

UI.prototype.mostrarResultado = (total, seguro) => {
    
    const {marca, year, tipo} = seguro;
    
    let textoMarca;
    
    
    switch(marca){
        case '1':
            textoMarca ='Americano' 
            break;
        case '2':
            textoMarca ='Asiatico' 
            break;
        case '3':
            textoMarca ='Europeo' 
            break; 

        default:
            break;
    }
    
    //Crear resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');
    div.innerHTML = `
    <p class='header'>Tu resumen</p>
    <p class="font-bold">Marca:<span class="font-normal"> ${textoMarca}</p>
    <p class="font-bold">Año:<span class="font-normal"> ${year}</p>
    <p class="font-bold">Tipo:<span class="font-normal capitalize"> ${tipo}</p>
    <p class="font-bold">Total:<span class="font-normal"> $${total}</p>
   
    
    `;

    const resultadoDiv = document.querySelector('#resultado');
    

    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';
    setTimeout(() => {
        spinner.style.display = 'none';//Se borra spinner
        resultadoDiv.appendChild(div);//Se muestra resultado
    }, 3000);
    

}


//Instanciar UI

const ui = new UI ();


document.addEventListener('DOMContentLoaded', ()=>{
    ui.llenarOpciones();//LLena el select

})


eventListeners();

function eventListeners() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);

}

function cotizarSeguro(e){
    e.preventDefault();

    //Leer marca seleccionada
    const marca = document.querySelector('#marca').value;
   
    //Leer año
    const year = document.querySelector('#year').value;
    
    //Leer tipo de cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    
    if(marca === ''|| year === '' || tipo === '') {
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }
    ui.mostrarMensaje('Cotizando...', 'exito');

    //Ocultar cotizaciones previas
    const resultados = document.querySelector('#resultado div');
    if(resultados != null){
        resultados.remove();
    }


    //Instanciar el seguro
    const seguro = new Seguro (marca, year, tipo);
    const total = seguro.cotizarSeguro();

    //Utilizar el prototype a cotizar
    ui.mostrarResultado(total, seguro);

}