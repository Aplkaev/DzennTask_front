// import { VStack, Text } from '@chakra-ui/react';
import { Button, ButtonGroup, EmptyState, VStack } from "@chakra-ui/react"
import { HiColorSwatch } from "react-icons/hi"
import DetailsTask from "./DetailsTask"

interface EmptyTaskProps {
  title: string,
  buttonCreateTitle: string,
  clickCreate: () => void
}

export default function EmptyTask({ title='Задач нет', buttonCreateTitle= 'Создать задачу', clickCreate }: EmptyTaskProps) {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <HiColorSwatch />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>{title}</EmptyState.Title>
        </VStack>
        <ButtonGroup>
          <Button onClick={clickCreate}>{buttonCreateTitle}</Button>
        </ButtonGroup>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
