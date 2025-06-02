import { Button, Field, Input, Stack, Box, Text, Link } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { PasswordInput } from "@/components/ui/password-input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { authStore } from "@/store/auth/auth";

const registerSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
  passwordConfirm: z.string()
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Пароли не совпадают",
  path: ["passwordConfirm"]
});

type FormValues = z.infer<typeof registerSchema>;

export default function RegForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log('onSubmit call', data);
    try {

      toaster.create({
        title: "Регистрация успешна",
        type: "success",
        duration: 5000
      });
      authStore.getState().registered(data.email, data.password);

      navigate("/login");
    } catch (error) {
      console.error(error);
      toaster.create({
        description: error instanceof Error ? error.message : "Неизвестная ошибка",
        title: "Ошибка регистрации",
        type: "error",
        duration: 5000
      });
    }
  });

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
        <Field.Root invalid={!!errors.email}>
          <Field.Label>Почта</Field.Label>
          <Input
            {...register("email")}
            type="email"
            placeholder="example@mail.com"
          />
          <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.password}>
          <Field.Label>Пароль</Field.Label>
          <PasswordInput
            {...register("password")}
            appearance="light"
            placeholder="Не менее 6 символов"
          />
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.passwordConfirm}>
          <Field.Label>Подтвердить пароль</Field.Label>
          <PasswordInput
            {...register("passwordConfirm")}
            appearance="light"
            placeholder="Повторите пароль"
          />
          <Field.ErrorText>{errors.passwordConfirm?.message}</Field.ErrorText>
        </Field.Root>

        <Button type="submit" isLoading={isSubmitting} w="full" colorScheme="blue">
          Зарегистрироваться
        </Button>

        <Text fontSize="sm" textAlign="center">
          Уже есть аккаунт?{" "}
          <Link as={RouterLink} to="/login" color="blue.500">
            Войти
          </Link>
        </Text>
      </Stack>

      <Toaster />
    </Box>
  );
}