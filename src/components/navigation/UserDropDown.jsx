import React, { useState } from 'react';
import { Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UserDropDown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
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
        <MenuItem onClick={handleClose}>Cerrar sesión</MenuItem>
      </Menu>
    </div>
  );
};

export default UserDropDown;
