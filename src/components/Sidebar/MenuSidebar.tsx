import { Box, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const MenuSidebar = ({ menu }) => {
  return (
    <Box>
      <div className="menu-route-main">
        <Link as={RouterLink} key={menu.path} to={menu.path}>
          {menu.label}
        </Link>
      </div>
    </Box>
  );
};

export default MenuSidebar;
