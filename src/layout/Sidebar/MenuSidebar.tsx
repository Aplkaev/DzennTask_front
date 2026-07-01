import { Box, Link, Button, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const MenuSidebar = ({ menu }) => {
  return (
    <Box>
        <Button as={RouterLink} key={menu.path} to={menu.path} w={"100%"}>
          {menu.label}
        </Button>
    </Box>
  );
};

export default MenuSidebar;
