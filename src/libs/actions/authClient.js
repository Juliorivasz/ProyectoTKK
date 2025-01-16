import { supabase } from "./supabaseClient";

export const handleRegister = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
  
    if (error) {
      console.error("Error al registrarse:", error.message);
    } else {
      console.log("Usuario registrado:", data);
    }
  };
  
export const handleLogin = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
  
    if (error) {
      console.error("Error al iniciar sesión:", error.message);
    } else {
      console.log("Usuario autenticado:", data);
    }
  };

  export const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
  
    if (error) {
      console.error("Error al cerrar sesión:", error.message);
    } else {
      console.log("Usuario desconectado");
    }
  };

export const user = supabase.auth.user();

supabase.auth.onAuthStateChange((event, session) => {
  console.log(event, session);
});

if (!user) {
  // Redirige a la página de login
  window.location.href = '/login';
}

export const handlePasswordReset = async (email) => {
    const { data, error } = await supabase.auth.api.resetPasswordForEmail(email);
  
    if (error) {
      console.error("Error al recuperar la contraseña:", error.message);
    } else {
      console.log("Correo de recuperación enviado:", data);
    }
  };
  

