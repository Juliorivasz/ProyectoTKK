import { useState, useEffect } from 'react';
import {
  Typography, Button, TextField, List, ListItem, ListItemText,
  IconButton, Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const DireccionesPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentAddress, setCurrentAddress] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  // Cargar direcciones desde localStorage al cargar el componente
  useEffect(() => {
    const savedAddresses = JSON.parse(localStorage.getItem('addresses')) || [];
    setAddresses(savedAddresses);
  }, []);

  // Guardar direcciones en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem('addresses', JSON.stringify(addresses));
  }, [addresses]);

  const handleAddAddress = () => {
    if (editIndex !== null) {
      const updatedAddresses = [...addresses];
      updatedAddresses[editIndex] = currentAddress;
      setAddresses(updatedAddresses);
      setEditIndex(null);
    } else {
      setAddresses([...addresses, currentAddress]);
    }
    setCurrentAddress('');
    setOpenDialog(false);
  };

  const handleEditAddress = (index) => {
    setCurrentAddress(addresses[index]);
    setEditIndex(index);
    setOpenDialog(true);
  };

  const handleDeleteAddress = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
      <Typography variant="h4" className="text-2xl font-bold my-6 text-center text-gray-800">
        Mis Direcciones
      </Typography>

      <List className="w-full max-w-md bg-white rounded-lg shadow-lg p-4 space-y-3 mb-6">
        {addresses.map((address, index) => (
          <ListItem
            key={index}
            className="flex justify-between items-center border-b border-gray-200 pb-2"
          >
            <ListItemText primary={address} className="pr-4" />
            <div>
              <IconButton edge="end" onClick={() => handleEditAddress(index)} className="text-blue-500">
                <Edit />
              </IconButton>
              <IconButton edge="end" onClick={() => handleDeleteAddress(index)} className="text-red-500">
                <Delete />
              </IconButton>
            </div>
          </ListItem>
        ))}
      </List>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenDialog(true)}
        className="mb-6"
      >
        Agregar Dirección
      </Button>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle className="text-center">{editIndex !== null ? 'Editar Dirección' : 'Agregar Dirección'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Dirección"
            type="text"
            fullWidth
            variant="outlined"
            value={currentAddress}
            onChange={(e) => setCurrentAddress(e.target.value)}
          />
        </DialogContent>
        <DialogActions className="flex justify-center">
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleAddAddress} color="primary">
            {editIndex !== null ? 'Guardar Cambios' : 'Agregar'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DireccionesPage;
