import { Box } from "@chakra-ui/react";
import { useUser } from "@/features/auth/useAuthStore";
import UserAvatar from "@/features/auth/components/UserAvatar";

export default function Header() {
  const email = useUser()?.email;
  return (
    <Box
      position="fixed"
      top={2}
      right={2}
      zIndex="overlay"
    >
      <UserAvatar />
    </Box>
  );
}