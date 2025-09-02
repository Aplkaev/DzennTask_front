import { Avatar, HStack } from '@chakra-ui/react';
import { useUser } from '@/store/auth/useAuthStore';

export default function AvatarUser() {
	const email = useUser()?.email
  return (
    <HStack gap="4">
      <Avatar.Root shape="square" size="lg">
        <Avatar.Fallback name={email} />
        {/* <Avatar.Image src="https://bit.ly/dan-abramov" /> */}
      </Avatar.Root>
    </HStack>
  );
}
