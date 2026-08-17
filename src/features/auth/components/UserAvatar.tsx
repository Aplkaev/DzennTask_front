import { Avatar, Menu, Portal } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { LuBell, LuLogOut, LuMoon, LuSun, LuUser } from 'react-icons/lu';
import { toaster } from '@/components/ui/toaster';
import { useUser, logout } from '../useAuthStore';
import Settings from './Settings';

export default function UserAvatar() {
  const user = useUser();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const notifyComingSoon = () => {
    toaster.create({
      title: 'Уведомления появятся позже',
      type: 'info',
      duration: 3000,
    });
  };

  return (
    <>
      <Menu.Root>
        <Menu.Trigger asChild>
          <Avatar.Root size="lg" cursor="pointer">
            <Avatar.Fallback name={user?.email} />
          </Avatar.Root>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="profile" onClick={() => setOpen(true)}>
                <LuUser /> Профиль
              </Menu.Item>
              <Menu.Item value="notifications" onClick={notifyComingSoon}>
                <LuBell /> Уведомления
              </Menu.Item>
              <Menu.Item
                value="theme"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              >
                {theme === 'light' ? <LuMoon /> : <LuSun />}
                {theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}
              </Menu.Item>
              <Menu.Separator />
              <Menu.Item value="logout" onClick={handleLogout} color="red.500">
                <LuLogOut /> Выйти
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>

      <Settings open={open} onClose={() => setOpen(false)} />
    </>
  );
}
