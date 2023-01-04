//PREGUNTAS Y RESPUESTAS------------------------------------------------------------------------------------------------------
//Matematica
import {questionMath} from './preguntasMat.js'

//Lengua
import {questionLiterature} from './preguntasLeng.js'
/* 
//Informatica   
import {questionComputing} from './preguntasMat.js'

//Biologia
import {questionMBiology} from './preguntasMat.js'

//Geografia
import {questionGeografy} from './preguntasMat.js'*/

//----------------------------------------------------------------------------------------------------------------------------

//FUNCIONES-------------------------------------------------------------------------------------------------------------------
/*Al hacer click en la flecha, esta da una vuelta de 360 grados. Solo se puede hacer una vez para que los usuarios no jueguen*/
const imagenGirar = document.querySelector('.tema img').addEventListener('mouseover',() => {
        imagenGirar.className = 'girar img-girar'
})


/*Al ingresar te aparece un contenedor que te pregunta que juego deseas jugar*/
const enterToGame = (i,arrayDePreguntas) => {
    const btnJugar = document.querySelectorAll(".welcomeToGame p")
    btnJugar[i].addEventListener('click', () => {
        
        const alerta = document.querySelector('.welcomeToGame').className = 'welcomeToGame desAnimacion'
        setTimeout( () => {
            const contenedor = document.querySelector('.welcomeToGame-cont')
            contenedor.className = 'desaparecer'
            alerta.className = 'desaparecer'
            
          }, 700 )
        setTimeout( () => {
            const contenedorJuego = document.querySelector('.contenedor-juego')
            contenedorJuego.className = 'contenedor-juego apaAnimacion'
          }, 800 )})
        
    searchQuestion(arrayDePreguntas)
} 

/*Elige la pregunta dependiendo del tema elegido*/
const searchQuestion = (array) => {
    const numeroRandom = Math.round(Math.random()*10);
    
    //Buscamos la pregunta y opciones en el array
    const pregunta = array[numeroRandom].question

    const choice0 = array[numeroRandom].choice[0]
    const choice1 = array[numeroRandom].choice[1]
    const choice2 = array[numeroRandom].choice[2]
    const choice3 = array[numeroRandom].choice[3]

    const desordenarOpciones = [
        choice0,
        choice1,
        choice2,
        choice3
    ]
    desordenarOpciones.sort(()=>Math.random()-0.5)
    
    //MODIFICAR PREGUNTA DEL DOM
    const modificarPreguntaDOM = document.querySelector('.pregunta-juego h2')
    modificarPreguntaDOM.innerText =  pregunta

    //MODIFICAR CADA OPCION
    const modificarOpcionesDOM = document.querySelectorAll('#opciones')
    modificarOpcionesDOM[0].innerText = desordenarOpciones[0]

    modificarOpcionesDOM[1].innerText = desordenarOpciones[1]

    modificarOpcionesDOM[2].innerText = desordenarOpciones[2]

    modificarOpcionesDOM[3].innerText = desordenarOpciones[3]

    const validarRespuesta = () => {
    const validarBtns = document.querySelectorAll('#opciones')
    for(let i = 0; i < 4;i++){
        validarBtns[i].addEventListener('click',()=>{
            if(desordenarOpciones[i] == array[numeroRandom].answer) {
                validarBtns[i].style.backgroundColor = '#228b22'
                const puntosCont = document.querySelector('.puntos h3')
                

                setTimeout( () => {
                    validarBtns[i].style.backgroundColor = 'white'
                    searchQuestion(array)
                    const puntos = 0
                    puntosCont.innerText = puntos + 100
                }, 1500 )
                
            }
            else {
                validarBtns[i].style.backgroundColor = '#cb3234'
                
                setTimeout( () => {
                    validarBtns[i].style.backgroundColor = 'white'
                    searchQuestion(array)
                    const puntos = 0
                    puntosCont.innerText = puntos - 100
                }, 1500 )
            }
        })
    }
    }
validarRespuesta()
}




enterToGame(0,questionMath)
enterToGame(1)
enterToGame(2)
enterToGame(3)
enterToGame(4)
enterToGame(5)



//----------------------------------------------------------------------------------------------------------------------------