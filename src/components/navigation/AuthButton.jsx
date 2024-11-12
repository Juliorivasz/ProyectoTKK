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
       <div className='flex gap-x-2'>
      <Button size='small' className='text-white' href={'/auth/login'}>
        Iniciar Sesión
      </Button>
      <Button size='small' className='text-white' variant="contained" href={'/auth/login'}>
        Registrarse
      </Button>
      </div>
      }
    </>
  );
}
