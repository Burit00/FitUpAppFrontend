import React, { ReactNode, useMemo, useState } from 'react';
import { Active, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableOverlay from '@components/D&D/Sortable/SortableOverlay';
import SortableItem, { DragHandle } from '@components/D&D/Sortable/SortableItem';

export type ObjectWithUniqueIdentifier = {
  id: string | number;
};

type SortableProviderProps<T extends ObjectWithUniqueIdentifier> = {
  items: T[];
  onChange?(items: T[]): void;
  onOrderChange?({ active, over }: { active: T; over: T }): void;
  renderItem(item: T, sortable: ReturnType<typeof useSortable>): ReactNode;
};

export default function SortableList<T extends ObjectWithUniqueIdentifier>({
  items,
  onChange,
  onOrderChange,
  renderItem,
}: SortableProviderProps<T>) {
  const [active, setActive] = useState<Active | null>(null);
  const activeItem = useMemo(() => items.find((item) => item.id === active?.id), [active, items]);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 300,
        tolerance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => setActive(active)}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over?.id) {
          const activeIndex = items.findIndex(({ id }) => id === active.id);
          const overIndex = items.findIndex(({ id }) => id === over.id);

          if (onChange) onChange(arrayMove(items, activeIndex, overIndex));
          if (onOrderChange) onOrderChange({ active: items[activeIndex], over: items[overIndex] });
        }
        setActive(null);
      }}
      onDragCancel={() => {
        setActive(null);
      }}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((item: T) => (
          <SortableItem key={item.id} renderItem={renderItem} item={item} />
        ))}
      </SortableContext>
      <SortableOverlay>
        {activeItem ? <SortableItem renderItem={renderItem} item={activeItem} /> : null}
      </SortableOverlay>
    </DndContext>
  );
}

SortableList.DragHandle = DragHandle;
