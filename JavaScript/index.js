//FUNCIONES-------------------------------------------------------------------------------------------------------------------

/*Cuando clickeamos 'Jugar', se despliega el menu con las diversas tematicas*/
let i = 0
const aparecerMenu = () => {
    menuJugar = document.querySelector(".menu-jugar-nav")
    menuJugar.className = 'menu-juegos-activado menu-jugar-nav'
    i++
    if((i % 2) !== 0) {
        menuJugar.className = 'desaparecerAnimacion menu-jugar-nav'

        setTimeout( () => {
        menuJugar.className= 'desaparecer menu-jugar-nav'
    }, 400 )
    }
}

/*Click en + info, se despliega para abajo y muestra diversos datos*/
let a = 0
let b = 0
let c = 0
const infoDesarrolladores = (div,letra) => {
    desarrolladorBoton = document.querySelector(div + ' button')
    desarrolladorBoton.onclick = () => {
        
        contenedor = document.querySelector('.contenedor-desarrolladores')
        letra++
        if((letra % 2) !== 0) {
            /*MODIFICAR EL CONTENEDOR PARA QUE SE AGRANDE*/
            contenedor.className = 'contenedor-desarrolladores extenderContenedorD'
            desarrolladorInd = document.querySelector(div).className = 'desarrollador extenderDesarrollador'
            desarrolladorInfo = document.querySelector(div + ' div').className = 'expandirse aparecer'
        }
        else if ((letra % 2) == 0){
            /*MODIFICAR EL CONTENEDOR PARA QUE SE AGRANDE*/
            contenedor.className = 'contenedor-desarrolladores achicarContenedorD'
            desarrolladorInd = document.querySelector(div).className = 'desarrollador achicarDesarrollador'

            //Si uno se achique, se ahiquen todos (Para que no quede contenedor + chico que la info)


            //Desaparezca el div con info
            desarrolladorInfo = document.querySelector(div + ' div')

            desarrolladorInfo.className = 'desaparecer expandirse'
            setTimeout( () => {
                desarrolladorInfo.className= 'noexpandirse expandirse positionAbsolute'
            }, 200 )
        }    
    }
}
infoDesarrolladores('#desarrollador-1',a)
infoDesarrolladores('#desarrollador-2',b)
infoDesarrolladores('#desarrollador-3',c)

//INCORPORANDO FETCH---------------------------------------------------------------------------------------------------------
//Funcion que verifica e ingresa la data del archivo desarrolladores.json en el HTML
const datos = (data) => {
    for(i = 0; i < 4; i++){
        nombre = data[i].nombreCompleto
        telefono = data[i].telefono
        edad = data[i].edad
        rol = data[i].rol

        const pasarInfo = (nombre,telefono,edad,rol,i) => {
            console.log(nombre,telefono,edad,rol,i)
            nombreEnHTML = document.querySelectorAll('.desarrollador h5')
            AgregarHTML  = document.querySelectorAll('.info-exp')

            nombreEnHTML[i].innerText = nombre
            AgregarHTML[i].innerHTML = '<h6 id="h6-1"> CEL: +54 '+ telefono  + '</h6>' +
            '<h6 id="h6-2"> EDAD: ' + edad + ' AÑOS<h6>' + 
            '<h6 id="h6-3"> ROL: <br> <span>' + rol + '</span></h6>'
        }
        pasarInfo(nombre,telefono,edad,rol,i) 
    }
}


fetch('./Json/desarrolladores.json')
    .then( (resp) => resp.json())
    .then( (data) => {
         datos(data)   
    }
)