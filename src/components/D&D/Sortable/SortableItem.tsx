import React, { createContext, LegacyRef, ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { Button } from '@components/ui';
import { ObjectWithUniqueIdentifier } from '@components/D&D/Sortable/SortableList';
import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { cn } from '@/utils';

type SortableItemContextType = {
  ref(el: HTMLElement | LegacyRef<HTMLElement>): void;
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap;
};

const SortableItemContext = createContext<SortableItemContextType>({
  ref() {},
  attributes: undefined,
  listeners: undefined,
});

type SortableItemProps<T extends ObjectWithUniqueIdentifier> = {
  item: T;
  renderItem(item: T, sortable: ReturnType<typeof useSortable>): ReactNode;
};

export default function SortableItem<T extends ObjectWithUniqueIdentifier>({ item, renderItem }: SortableItemProps<T>) {
  const sortable = useSortable({
    id: item.id,
  });

  const { attributes, listeners, setActivatorNodeRef } = sortable;

  return (
    <SortableItemContext.Provider value={{ ref: setActivatorNodeRef, attributes, listeners }}>
      {renderItem(item, sortable)}
    </SortableItemContext.Provider>
  );
}

type DragHandleProps = {
  className?: string;
};

export function DragHandle({ className }: DragHandleProps) {
  const { attributes, listeners, ref } = React.useContext(SortableItemContext);

  return (
    <Button ref={ref} {...attributes} {...listeners} className={cn('touch-none', className)}>
      <RxDragHandleDots2 />
    </Button>
  );
}
