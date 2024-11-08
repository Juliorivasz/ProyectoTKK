import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import UserDropDown from './UserDropDown';

export default function AuthButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('email');
    setIsLoggedIn(!!email); 
  }, []);

  return (
    <>
      {isLoggedIn ? 
      <UserDropDown/>
       : 
      <Button>
        Iniciar Sesión
      </Button>
      }
    </>
  );
}
