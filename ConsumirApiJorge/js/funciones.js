const url = 'http://localhost:8088/api/usuario'
const listarUsuarios = async() => {
    let body = document.getElementById('contenido')
    if(body){
        let mensaje = ''
        

        fetch(url)//Permite llamar la API
        .then(res => res.json())
        .then(function (data) {
            let listarUsuarios = data.usuarios
            listarUsuarios.map((usuario) => {
                mensaje += `<tr>
                <td>${usuario.direccion}</td>`+
                `<td>${usuario.latitud}</td>`+
                `<td>${usuario.longitudes}</td>`+
                `<td>${usuario.descripcion}</td>`+
                `<td>${usuario.fechareporte}</td>`+
                `<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(usuario)})'>Editar</a>
                 <a class="waves-effect waves-light btn modal-trigger red" href="#" onclick='eliminar("${usuario._id}")'>Eliminar</a>
                </td></tr>`
                body.innerHTML = mensaje
            }   
            )
        })
    }
}

listarUsuarios()

const registrarUsuario = async() =>{
    //Captura de valores de datos enviados desde el formulario
    let direccion = document.getElementById('direccion').value
    let latitud = document.getElementById('latitud').value
    let longitudes = document.getElementById('longitudes').value
    let descripcion = document.getElementById('descripcion').value
    let fechareporte = document.getElementById('fechareporte').value

    let usuario = {
        direccion: direccion,
        latitud: latitud,
        longitudes: longitudes,
        descripcion: descripcion,
        fechareporte: fechareporte
    }


        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body:JSON.stringify(usuario),
            headers: {"Content-type": "application/json; charset=UTF-8"}     
        })
        .then(response => response.json()) //La respuesta del método POST de la API
        .then(json => {
            console.log(json); // Verificar la respuesta de la API en la consola
           alert(json.mensaje)
        })
    }



const editar = (usuario) =>{
    document.getElementById('_id').value = ''
    document.getElementById('direccion').value = ''
    document.getElementById('latitud').value = ''
    document.getElementById('longitudes').value = ''
    document.getElementById('descripcion').value = ''
    document.getElementById('fechareporte').value = ''

    document.getElementById('_id').value = usuario._id
    document.getElementById('direccion').value = usuario.direccion
    document.getElementById('latitud').value = usuario.latitud
    document.getElementById('longitudes').value = usuario.longitudes
    document.getElementById('descripcion').value = usuario.descripcion
    document.getElementById('fechareporte').value = usuario.fechareporte
}

const actualizarUsuario = async() =>{
    //Captura de valores de datos enviados desde el formulario
    let direccion = document.getElementById('direccion').value
    let latitud = document.getElementById('latitud').value
    let longitudes = document.getElementById('longitudes').value
    let descripcion = document.getElementById('descripcion').value
    let fechareporte = document.getElementById('fechareporte').value

    let usuario = {
        _id: document.getElementById('_id').value,
        direccion: direccion,
        latitud: latitud,
        longitudes: longitudes,
        descripcion: descripcion,
        fechareporte: fechareporte,
        tipoModificacion: 'Unitaria'
    }

        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body:JSON.stringify(usuario),
            headers: {"Content-type": "application/json; charset=UTF-8"}     
        })
        .then(response => response.json()) //La respuesta del método POST de la API
        .then(json => {
           alert(json.mensaje)
        })
    }



const eliminar =(_id) => {
    if(confirm('¿Está seguro de realizar la eliminación?') == true){
            //Captura de valores de datos enviados desde el formulario
    let usuario = {
        _id: _id
    }
    
    //console.log(usuario)

       fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            body:JSON.stringify(usuario),
            headers: {"Content-type": "application/json; charset=UTF-8"}     
        })
        .then(response => response.json()) //La respuesta del método POST de la API
        .then(json => {
           alert(json.mensaje)
        })     
    }
}

if(document.querySelector('#btnRegistrar'))
{
    document.querySelector('#btnRegistrar').addEventListener('click', registrarUsuario)
}

if(document.querySelector('#btnActualizar'))
{
    document.querySelector('#btnActualizar').addEventListener('click', actualizarUsuario)
}


//Installar en la api(backend) los paquetes:
//cors
//body-parser
