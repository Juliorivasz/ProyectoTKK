import { UserAuth } from "../../context/AuthContext";
import Layout from "../../components/layouts/Layout";

export default function Login() {
  const { signInWithGoogle } = UserAuth();

  return (
    <Layout>
        <button onClick={signInWithGoogle}>Iniciar con Google</button>
    </Layout>
  );
}