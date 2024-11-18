import Swal from 'sweetalert2';

// Función para mapear códigos de estado a mensajes personalizados
const getErrorMessage = (statusCode) => {
  switch (statusCode) {
    case 400:
      return 'Solicitud incorrecta. Verifica los datos ingresados.';
    case 401:
      return 'No estás autorizado para realizar esta acción.';
    case 403:
      return 'Acceso prohibido. No tienes permiso para acceder a este recurso.';
    case 404:
      return 'Recurso no encontrado.';
    case 409:
      return 'El email ya está registrado. Intenta con otro.';
    case 500:
      return 'Error interno del servidor. Inténtalo de nuevo más tarde.';
    default:
      return 'Ocurrió un error inesperado. Inténtalo nuevamente.';
  }
};

export const handleRegisterClient = async (nombre, apellido, email, telefono, password) => {
  const datosClientes = {
    nombre,
    apellido,
    email,
    telefono,
    password
  };

  try {
    const response = await fetch(`http://localhost:8080/cliente/registrar`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosClientes),
    });

    if (!response.ok) {
      // Llama a la función para obtener el mensaje de error según el código de estado
      const errorMessage = getErrorMessage(response.status);

      Swal.fire({
        icon: 'error',
        title: 'Error en el registro',
        text: errorMessage,
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    
    const data = await response.text();
    
    const dataUser = {
      email: email,
      status: data
    }

    console.log('desde registro: ', dataUser)
    // Modal de éxito
    Swal.fire({
      icon: 'success',
      title: 'Registro exitoso',
      text: '¡Te has registrado correctamente!',
      confirmButtonText: 'Aceptar',
      timer: 3000
    });
    return dataUser;

  } catch (error) {
    // Modal de error en caso de problemas de red u otros errores no capturados
    Swal.fire({
      icon: 'error',
      title: 'Error en el registro',
      text: 'Ocurrió un problema al registrarte. Intenta nuevamente.',
      confirmButtonText: 'Aceptar',
    });

    console.log('Hubo un problema: ', error);
    throw new Error('Error en la solicitud de registro');
  }
};

export const handleLogin = async (email, password) => {
  const datosLogin = {
    email,
    password
  };

  try {
    const response = await fetch('http://localhost:8080/cliente/inicioDeSesion', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosLogin),
    });

    if (!response.ok) {
      // Llama a la función para obtener el mensaje de error según el código de estado
      const errorMessage = getErrorMessage(response.status);

      Swal.fire({
        icon: 'error',
        title: 'Error en el login',
        text: errorMessage,
        confirmButtonText: 'Aceptar',
      });
      return null;
    }

    const data = await response.json();  // Suponiendo que la respuesta es un JSON con los datos del usuario

    // tiene el email del usuario logueado y la respuesta de la peticion
    const dataUser = {
      email: email,
      status: JSON.stringify(data)
    }
    
    // Guardamos el usuario en el localStorage
    localStorage.setItem('user', dataUser);

    // Modal de éxito
    Swal.fire({
      icon: 'success',
      title: 'Login exitoso',
      text: '¡Bienvenido!',
      confirmButtonText: 'Aceptar',
      timer: 3000
    });

    return dataUser;

  } catch (error) {
    // Modal de error en caso de problemas de red u otros errores no capturados
    Swal.fire({
      icon: 'error',
      title: 'Error en el login',
      text: 'Ocurrió un problema al iniciar sesión. Intenta nuevamente.',
      confirmButtonText: 'Aceptar',
    });

    console.log('Hubo un problema: ', error);
    throw new Error('Error en la solicitud de login');
  }
};





