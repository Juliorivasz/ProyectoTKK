import { useState, useEffect } from 'react';
import { Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const UserDropDown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userImage, setUserImage] = useState(null); // Estado para la imagen del usuario
  const { logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const email = JSON.parse(localStorage.getItem("user"))?.email; // Obtiene el email del usuario desde localStorage
      if (!email) return;

      try {
        const response = await fetch("http://localhost:8080/cliente/obtenerDatos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }), // Enviamos el email en el cuerpo de la solicitud
        });

        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario");
        }

        const data = await response.json();
        if (data.imagen) {
          setUserImage(data.imagen); // Asigna la URL de la imagen al estado
          localStorage.setItem("userImage", data.imagen); // Guarda la imagen en localStorage
        }
      } catch (error) {
        console.error("Error al obtener la imagen del usuario:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddressesClick = () => {
    handleClose();
    navigate('/auth/direcciones');
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem('user');
    localStorage.removeItem('email'); 
    localStorage.removeItem('userImage'); // Limpia la imagen al cerrar sesión
    navigate('/auth/login');
  };

  const handlePerfil = () => {
    navigate("/auth/perfil");
  };

  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <Avatar
          src={userImage || undefined}
          sx={{
            width: 40, // Ajusta el tamaño del Avatar
            height: 40, // Ajusta el tamaño del Avatar
            '& img': {
              objectFit: 'cover', // Asegura que la imagen se recorte correctamente
              objectPosition: 'top', // Posiciona la imagen en la parte superior
            },
          }}
        >
          {!userImage && "U"} {/* Muestra una inicial si no hay imagen */}
        </Avatar>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handlePerfil}>Perfil</MenuItem>
        <MenuItem onClick={handleAddressesClick}>Direcciones</MenuItem>
        <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
      </Menu>
    </div>
  );
};

export default UserDropDown;
