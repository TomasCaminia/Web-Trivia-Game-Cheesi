//SWEET ALERT-----------------------------------------------------------------------------------------------------------------
const firstAlert = () => {
  Swal.fire({
      background: 'rgb(100,33,0)',
      color:'white',
      title: '<strong style="font-family: Poppins">¡NO SE HAN GUARDADO TUS DATOS!</strong>',
      html: '<strong style="font-family: Poppins;font-size:22px">¿Tienes cuenta?</strong>',
      showDenyButton: true,
      confirmButtonText: '<strong style="font-family: Poppins">INICIAR SESION</strong>',
      denyButtonText: `<strong style="font-family: Poppins">REGISTRARME</strong>`,
      allowOutsideClick: false,
      width:'450px'
    })
    .then((result) => {

      if (result.isConfirmed) {
        iniciarSesion = document.querySelector('.iniciar-sesion');
        iniciarSesion.className = 'iniciar-sesion aparecer'
      } 
      else if (result.isDenied) {
        registrarse = document.querySelector('.registrarse')
        registrarse.className = 'registrarse aparecer'
      }
  })
}
firstAlert()

const alertErrorIS = () => {
  Swal.fire({
    icon: 'error', 
    background: 'rgb(100,33,0)',
    color:'white',
    title: '<strong style="font-family: Poppins">MAIL O CONTRASEÑA INCORRECTOS</strong>',
    html: '<strong style="font-family: Poppins;font-size:22px">Intente de nuevo</strong>',
    width:'450px',
    showConfirmButton: false,
    timer: 2000
})
}

const alertIngresado = (title) => {
  Swal.fire({
    icon: 'success', 
    background: 'rgb(100,33,0)',
    color:'white',
    title: title,
    width:'450px',
    showConfirmButton: false,
    timer: 1500
})
}
//----------------------------------------------------------------------------------------------------------------------------


//FUNCIONES-------------------------------------------------------------------------------------------------------------------
//Al pasar el cursor por encima de la flecha, esta realiza un giro. Esta configurado para que solo lo realice una vez
/*Al pasar el cursor por encima de la flecha ubicada en la esquina izquierda superior, esta realiza un giro de
360 grados. Solo se puede hacer una vez (Para que el usuario no juegue con esta)*/
const girar = () => {
  imagen = document.querySelector('.botonVolver img')
  imagen.className = 'girar img-girar'
}


/*Al apretar el boton INICIAR SESION, hacemos que el contenedor de Iniciar Sesion desaparezca aparezca 
el contenedor de REGISTRARSE. Y viceversa.*/
//Cambio de I.S a Reg
const desaparece = (claseCont,clases1,clases2) => {
  contenedor = document.querySelector(claseCont);
  contenedor.className = clases1
  //desaparecerAnimacion es por si el otro contenedor esta presente
  //aparecer es la animacion para que aparezca el Registrarse

  setTimeout( () => {
    contenedor.className = clases2
  }, 100 ) //desaparece el contenedor
} 
const aparece = (claseCont,clases1) => {
  setTimeout( () => {
    document.querySelector(claseCont).className = clases1
  }, 100) //aparece el nuevo
}

const changeIS = () => {                                    
  desaparece('.iniciar-sesion','aparecer iniciar-sesion desaparecerAnimacion','desaparecer iniciar-sesion')
  aparece('.registrarse','registrarse aparecer')
}
const changeREG = () => {                                    
  desaparece('.registrarse','aparecer registrarse desaparecerAnimacion','desaparecer registrarse')
  aparece('.iniciar-sesion','iniciar-sesion aparecer')
}


/*Cuando se apriete el boton enviar en Iniciar Sesion ,chequear si los datos ingresados coinciden 
con los del Local Storage*/
const logInForm = document.querySelector('#logIn-form').addEventListener('submit',(event) => {
  event.preventDefault() //Lo que logramos aca es que cuando se aprite el boton submit, no se recargue la pagina

    const inputsIniciarSesion = document.querySelectorAll('#logIn-form input')
    //Creamos un bucle para recorrer el Local Storage
    
    let usuario
    for(let i = 0; i < localStorage.length ; i++) {
      let key = localStorage.key(i)
      let datosEnJSON = localStorage.getItem(key)
      let datos = JSON.parse(datosEnJSON)
      let contraseña = datos.password
      
      if(key == inputsIniciarSesion[0].value && contraseña == inputsIniciarSesion[1].value) {
        usuario = true
        if (usuario == true) {
          desaparece('.iniciar-sesion','aparecer iniciar-sesion desaparecerAnimacion','desaparecer iniciar-sesion')
          alertIngresado('<strong style="font-family: Poppins">HA INICIADO SESION CORRECTAMENTE</strong>')
          mostrarDatos(datos)
          break
        }
      }
      else {
        usuario = false
        if (usuario == false) {
          alertErrorIS()
        }
      } 
    }

    
    
})


//Algoritmo para crear nuevos usuarios
class usuario {
  constructor(name,surname,mail,password) {
    this.name = name
    this.surname = surname
    this.mail = mail
    this.password = password
  }
}

const newUser = (nombre,apellido,mail,contraseña) => {
  const user = new usuario(nombre,apellido,mail,contraseña)
  const userJSON = JSON.stringify(user)

  //Ahora lo pasamos a Local Storage
  localStorage.setItem(mail,userJSON)
} 

const mostrarDatos = (datos) => {
  setTimeout( () => {
    //hacemos aparecer las letras
    miCuenta = document.querySelector('.contenedor-cuenta').className = 'contenedor-cuenta aparece apareceOpacityAnimacion'
  
    //insertamos la info de usuario en cada seccion
    info = document.querySelectorAll('#infoUsuario')
    info[0].innerText = datos.name.toUpperCase()
    info[1].innerText = datos.surname.toUpperCase()
    info[2].innerText = datos.mail.toUpperCase()
    
  }, 1500 ) //aparece la info
}

const register = document.querySelector('#register-form').addEventListener('submit',(event) => {
  event.preventDefault() //Lo que logramos aca es que cuando se aprite el boton submit, no se recargue la pagina

  const registerInputs = document.querySelectorAll('#register-form input')
  
  nombre = registerInputs[0].value
  apellido = registerInputs[1].value
  mail = registerInputs[2].value
  contraseña = registerInputs[3].value

  newUser(nombre,apellido,mail,contraseña) //Toma los valores de los inputs, los pasa a JSON y Local Storage
  desaparece('.registrarse','aparecer registrarse desaparecerAnimacion','desaparecer registrarse') //Desaparece el contenedor
  alertIngresado('<strong style="font-family: Poppins">HA INICIADO SESION CORRECTAMENTE</strong>') //Muestra un alerta
  aparece('.iniciar-sesion','iniciar-sesion aparecer') //aparece el Log In para que compruebe datos
})
  