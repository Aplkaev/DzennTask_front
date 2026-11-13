import {
    Avatar,
    Button,
    CloseButton,
    Dialog,
    Field,
    Input,
    Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useUser, updateUser } from "../useAuthStore";
import { toaster } from '@/components/ui/toaster';
import type { IUser } from "../types";

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function Settings({ open, onClose }: Props) {
    const user = useUser();
    const [form, setForm] = useState<IUser | null>(user);

    useEffect(() => {
        if (open) setForm(user);
    }, [open, user]);

    const setField = (field: 'telegram' | 'phone' | 'timezone', value: string) =>
        setForm((prev) => (prev ? { ...prev, [field]: value || null } : prev));

    const save = async () => {
        if (!form) return;

        try {
            await updateUser(form);
            onClose();

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
                                <Avatar.Fallback name={form?.email} />
                            </Avatar.Root>

                            <Field.Root>
                                <Field.Label>Email</Field.Label>
                                <Input
                                    value={form?.email ?? ""}
                                    readOnly
                                />
                            </Field.Root>

                            <Field.Root>
                                <Field.Label>Telegram</Field.Label>
                                <Input
                                    value={form?.telegram ?? ""}
                                    onChange={(e) => setField('telegram', e.target.value)}
                                    placeholder="@username"
                                />
                            </Field.Root>

                            <Field.Root>
                                <Field.Label>Телефон</Field.Label>
                                <Input
                                    value={form?.phone ?? ""}
                                    onChange={(e) => setField('phone', e.target.value)}
                                    placeholder="+7..."
                                />
                            </Field.Root>

                            <Field.Root>
                                <Field.Label>Часовой пояс</Field.Label>
                                <Input 
                                    value={form?.timezone ?? ""}
                                    onChange={(e) => setField('timezone', e.target.value)}
                                    placeholder="Europe/Moscow" 
                                />
                            </Field.Root>

                        </Stack>

                    </Dialog.Body>

                    <Dialog.Footer>

                        <Button
                            variant="outline"
                            onClick={onClose}
                        >
                            Отмена
                        </Button>

                        <Button colorPalette="blue" onClick={save}>
                            Сохранить
                        </Button>

                    </Dialog.Footer>

                </Dialog.Content>
            </Dialog.Positioner>

        </Dialog.Root>
    );
}