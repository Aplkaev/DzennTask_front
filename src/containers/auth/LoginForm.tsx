import { Button, Field, Input, Stack, Box, Text, Link } from "@chakra-ui/react"
import { PasswordInput } from "@/components/ui/password-input"
import { useForm } from "react-hook-form"
import { Toaster, toaster } from "@/components/ui/toaster"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { authStore } from "@/store/auth/auth"
import ProtectedRoute from "./ProtectedRoute"

interface FormValues {
  username: string
  password: string
}

export default function LoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit = handleSubmit(async (data) => {
    try { 
      authStore.getState().logining(data.username, data.password);
      toaster.create({
        title: "Авторизация успешна",
        type: "success",
        duration: 5000
      })
      navigate("/");
    } catch(error) { 
      console.log(error);
      
      toaster.create({
        description: error instanceof Error ? error.message : "Неизвестная ошибка",
        title: "Ошибка авторизации",
        type: "error",
        duration: 5000
      })
    }
  })

  return (
    <Box 
      minH="100vh" 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
      as="form" 
      onSubmit={onSubmit} 
      px={4}
    >
      <Stack spacing={6}>
        <Field.Root invalid={!!errors.username}>
          <Field.Label>Username</Field.Label>
          <Input {...register("username")} />
          <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.password}>
          <Field.Label>Password</Field.Label>
          <PasswordInput {...register("password")} appearance="light"/>
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
        </Field.Root>

        <Button type="submit" colorScheme="blue" w="full">
          Войти
        </Button>

        <Text fontSize="sm" textAlign="center">
          Нет аккаунта?{" "}
          <Link as={RouterLink} to="/register" color="blue.500">
            Зарегистрироваться
          </Link>
        </Text>
      </Stack>
      <Toaster />
    </Box>
  )
}