import React, { RefCallback, useCallback, useEffect, useRef } from 'react';

type Dimensions = {
  height: number;
  width: number;
};
type ReturnType<ElementType> = [React.Ref<ElementType>, Dimensions];
export const useResizeObserver = <ElementType extends Element>(): ReturnType<ElementType> => {
  const observerRef = useRef<ResizeObserver | null>(null);
  const [dimensions, setDimensions] = React.useState({ height: 0, width: 0 });
  const elementRef = React.useRef<ElementType | null>(null);

  const unobserve = useCallback(() => {
    observerRef.current?.disconnect();
    observerRef.current = null;
  }, []);

  const observe = useCallback(() => {
    const pixelToInteger = (pixel: string) => parseFloat(pixel.slice(0, -2));
    const { current } = elementRef;
    if (current) {
      observerRef.current = new ResizeObserver(([element]) => {
        // https://alligator.io/js/resize-observer/
        // Unlike with an element’s getBoundingClientRect, contentRect’s values for width and height don’t
        // include padding values. contentRect.top is the element’s top padding
        // and contentRect.left is the element’s left padding.
        const width = element.contentRect.left + element.contentRect.right;
        const height = element.contentRect.top + element.contentRect.bottom;
        const borderTop = pixelToInteger(window.getComputedStyle(element.target).borderTopWidth);
        const borderBottom = pixelToInteger(
          window.getComputedStyle(element.target).borderBottomWidth,
        );
        const borderLeft = pixelToInteger(window.getComputedStyle(element.target).borderLeftWidth);
        const borderRight = pixelToInteger(
          window.getComputedStyle(element.target).borderRightWidth,
        );

        setDimensions({
          height: height + borderTop + borderBottom,
          width: width + borderLeft + borderRight,
        });
      });

      observerRef.current?.observe(current);
    }
  }, []);

  useEffect(() => {
    return (): void => {
      unobserve();
    };
  }, [unobserve]);

  const init = useCallback(() => {
    unobserve();
    observe();
  }, [observe, unobserve]);

  const elementRefCallBack: RefCallback<ElementType> = useCallback(
    (node) => {
      elementRef.current = node;
      init();
    },
    [init],
  );

  return [elementRefCallBack, dimensions];
};
