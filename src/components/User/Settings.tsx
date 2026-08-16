import {
    Avatar,
    Button,
    CloseButton,
    Dialog,
    Field,
    Input,
    Stack,
    Switch,
} from "@chakra-ui/react";
import { useUser, requestUser,  } from "@/store/auth/useAuthStore";
import { toaster } from '@/components/ui/toaster';

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function Settings({ open, onClose }: Props) {
    const user = useUser();
    const save = async () => {
        try {
            await requestUser(user);

            toaster.create({
                title: 'Сохранение выполнено!',
                type: 'success',
                duration: 5000,
            });
        } catch (error) {
            console.log(error);

            toaster.create({
                description:
                error instanceof Error ? error.message : 'Неизвестная ошибка',
                title: 'Ошибка сохранения',
                type: 'error',
                duration: 5000,
            });
        }
    };
    return (
        <Dialog.Root open={open} onOpenChange={(e) => !e.open && onClose()}>
            <Dialog.Backdrop />

            <Dialog.Positioner>
                <Dialog.Content>

                    <Dialog.Header>
                        <Dialog.Title>
                            Настройки пользователя
                        </Dialog.Title>

                        <Dialog.CloseTrigger asChild>
                            <CloseButton />
                        </Dialog.CloseTrigger>
                    </Dialog.Header>

                    <Dialog.Body>

                        <Stack gap={6}>

                            <Avatar.Root size="2xl" alignSelf="center">
                                <Avatar.Fallback name={user?.email} />
                            </Avatar.Root>

                            <Field.Root>
                                <Field.Label>Email</Field.Label>
                                <Input
                                    value={user?.email ?? ""}
                                    readOnly
                                />
                            </Field.Root>

                            <Field.Root>
                                <Field.Label>Telegram</Field.Label>
                                <Input
                                    value={user?.telegram ?? ""}
                                    placeholder="@username"
                                />
                            </Field.Root>

                            <Field.Root>
                                <Field.Label>Телефон</Field.Label>
                                <Input
                                    value={user?.phone ?? ""}
                                    placeholder="+7..."
                                />
                            </Field.Root>

                            <Field.Root>
                                <Field.Label>Часовой пояс</Field.Label>
                                <Input 
                                    value={user?.timezone ?? ""}
                                    placeholder="Europe/Moscow" 
                                />
                            </Field.Root>

                        </Stack>

                    </Dialog.Body>

                    <Dialog.Footer>

                        <Button
                            variant="outline"
                            onClick={save}
                        >
                            Отмена
                        </Button>

                        <Button colorPalette="blue">
                            Сохранить
                        </Button>

                    </Dialog.Footer>

                </Dialog.Content>
            </Dialog.Positioner>

        </Dialog.Root>
    );
}