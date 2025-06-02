import RegForm from "./RegForm"
import { Box } from "@chakra-ui/react";
import { authStore } from "@/store/auth/auth";
import LoginForm from "./LoginForm";
import { api } from "@/shared/api/apiClient";


export default function AuthForm() {
  const handleSubmitRegister = async (email: string, password: string) => {
    const { data } = await api.post('/users/register', {
      email: email,
      password: password
    });
    console.log('response register',data);
  };
    const handleSubmitLogin = async (email: string, password: string) => {
    const { data } = await api.post('/login', {
      username: email,
      password: password
    });
    authStore.getState().login(data.token)
  };

  return (
    <Box p={4} appearance="light">
      {authStore.getState().token}
      
      <LoginForm onSuccess={(email, password) => handleSubmitLogin(email, password)}></LoginForm>
      <RegForm onSuccess={(email, password) => handleSubmitRegister(email, password)}></RegForm>
    </Box>
  )
}