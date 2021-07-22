import React, { useCallback, useEffect, useState } from 'react';

import { useResizeObserver } from './useResizeObserver';
import {useDocumentEventListener} from "./useDocumentEventListener";

export type Offset = {
  x: number;
  y: number;
};
type Dimensions = {
  height: number;
  width: number;
};
type Return<ElementType> = {
  ref: React.Ref<ElementType>;
  dimensions: Dimensions;
  startResize: (event: React.MouseEvent) => void;
};
export const useResizable = <ElementType extends Element>(): Return<ElementType> => {
  // TODO usage of ResizeObserver is not the most optimal one. We would like to measure the element
  // dimensions once after mount. Currently the dimensions are measured constantly on resize
  // which is not needed.
  const [ref, initialDimensions] = useResizeObserver<ElementType>();
  const [offset, setOffset] = useState<Offset | null>(null);
  const [dimensions, setDimensions] = useState<Dimensions>(initialDimensions);

  useEffect(() => {
    setDimensions(initialDimensions);
  }, [initialDimensions]);

  const startResize = useCallback((event: React.MouseEvent) => {
    const { pageX, pageY } = event;
    setOffset({ x: pageX, y: pageY });
  }, []);

  const stopResize = useCallback(() => {
    setOffset(null);
  }, []);

  const resize = useCallback(
    (event: MouseEvent) => {
      if (offset === null) {
        return;
      }
      const xDiff = offset.x - event.pageX;
      const yDiff = offset.y - event.pageY;
      setOffset({ x: event.pageX, y: event.pageY });
      setDimensions((prevDimensions) => {
        return {
          width: prevDimensions.width - xDiff,
          height: prevDimensions.height - yDiff,
        };
      });
    },
    [offset],
  );

  useDocumentEventListener('mousemove', resize);
  useDocumentEventListener('mouseup', stopResize);

  return {
    ref,
    dimensions,
    startResize,
  };
};
