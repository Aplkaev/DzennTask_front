import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";
import Topbar from "./Topbar/Topbar";
import ProtectedRoute from "@/containers/auth/ProtectedRoute";

export default function HomePage() {
  return (
    <Flex>
      <ProtectedRoute >
        <Sidebar />
        <Box flex="1">
          <Box p={4}>
            <Outlet />
          </Box>
        </Box>
      </ProtectedRoute>
    </Flex>
  )
}