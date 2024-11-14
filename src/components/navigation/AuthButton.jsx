import { Button } from '@mui/material';
import UserDropDown from './UserDropDown';
import { useUser } from '../../context/UserContext';

export default function AuthButton() {
  const { user } = useUser();

 console.log({user})

  return (
    <>
      {user ? 
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
