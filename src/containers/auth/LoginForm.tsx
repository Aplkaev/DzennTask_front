import AuthForm from "./AuthForm"
import RegForm from "./RegForm"
import { Box } from "@chakra-ui/react";
import { authStore } from "@/store/auth/auth";

export default function LoginForm() {
  const login = authStore((state) => state.login);
  
  const handleSubmit = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      
      const { token, user } = await response.json();
      
      login(token, {
        user_id: user.id,
        email: user.email,
        avatar_url: user.avatar
      });
      
    } catch (error) {
      console.error('Login failed', error);
    }
  };
  return (
    <Box p={4} appearance="light">
      <AuthForm></AuthForm>
      <RegForm></RegForm>
    </Box>
  )
}