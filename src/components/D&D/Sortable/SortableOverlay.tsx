import React from 'react';
import { DragOverlay } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

type SortableOverlayProps = {
  children: React.ReactNode;
};

export default function SortableOverlay(props: SortableOverlayProps) {
  return <DragOverlay modifiers={[restrictToVerticalAxis]}>{props.children}</DragOverlay>;
}
