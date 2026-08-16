import { Avatar, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { useUser } from "@/store/auth/useAuthStore";
import Settings from "./Settings";

export default function UserAvatar() {
    const user = useUser();
    const [open, setOpen] = useState(false);
    return (
        <>
            <HStack>
                <Avatar.Root
                    size="lg"
                    cursor="pointer"
                    onClick={() => setOpen(true)}
                >
                    <Avatar.Fallback name={user?.email} />
                </Avatar.Root>
            </HStack>

            <Settings
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
}