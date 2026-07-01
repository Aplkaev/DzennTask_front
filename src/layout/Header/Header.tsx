import { Avatar, Box } from "@chakra-ui/react";
import { useUser } from "@/store/auth/useAuthStore";

export default function Header() {
  const email = useUser()?.email;

  return (
    <Box
      position="fixed"
      top={2}
      right={2}
      zIndex="overlay"
    >
      <Avatar.Root
        size="lg"
        cursor="pointer"
      >
        <Avatar.Fallback name={email} />
      </Avatar.Root>
    </Box>
  );
}