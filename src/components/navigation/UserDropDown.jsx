import { useState } from 'react';
import { Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext'; // Asegúrate de importar el hook useUser

const UserDropDown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout } = useUser(); // Obtienes el método logout del contexto
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddressesClick = () => {
    handleClose();
    navigate('/direcciones'); // Cambia '/direcciones' a la ruta que desees
  };

  const handleLogout = () => {
    logout(); // Llama a la función logout para cerrar sesión
    localStorage.removeItem('user'); // Elimina los datos del usuario del localStorage
    navigate('/auth/login'); // Redirige al login o página deseada después de cerrar sesión
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
        <Avatar>
          <FaUserCircle />
        </Avatar>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Perfil</MenuItem>
        <MenuItem onClick={handleAddressesClick}>Direcciones</MenuItem>
        <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
      </Menu>
    </div>
  );
};

export default UserDropDown;

