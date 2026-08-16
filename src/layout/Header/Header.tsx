import { Box } from "@chakra-ui/react";
import { useUser } from "@/store/auth/useAuthStore";
import UserAvatar from "@/components/User/UserAvatar";

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