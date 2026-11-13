import { Box, HStack, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import UserAvatar from '@/features/auth/components/UserAvatar';
import ProjectSwitcher from '@/features/project/components/ProjectSwitcher';

export default function Header() {
  return (
    <HStack
      as="header"
      position="sticky"
      top={0}
      zIndex="overlay"
      justify="space-between"
      px={4}
      py={2}
      borderBottomWidth="1px"
      bg="bg.panel"
    >
      <HStack gap={4}>
        <Link asChild fontWeight="bold">
          <RouterLink to="/">
            <Text>DzennTask</Text>
          </RouterLink>
        </Link>
        <ProjectSwitcher />
      </HStack>

      <Box>
        <UserAvatar />
      </Box>
    </HStack>
  );
}
