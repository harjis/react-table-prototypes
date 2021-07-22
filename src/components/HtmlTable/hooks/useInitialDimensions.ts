import { Ref, useEffect, useRef, useState } from "react";
import { pixelToInteger } from "../utils/pixelToInteger";

type Dimensions = {
  height: number;
  width: number;
};
type Return<ElementType> = {
  dimensions: Dimensions | null;
  ref: Ref<ElementType>;
};
export const useInitialDimensions = <
  ElementType extends Element
>(): Return<ElementType> => {
  const ref = useRef<ElementType>(null);
  const [dimensions, setDimensions] = useState<Dimensions | null>(null);

  useEffect(() => {
    const { current } = ref;
    if (current instanceof Element) {
      const { width, height } = current.getBoundingClientRect();
      const paddingTop = pixelToInteger(
        window.getComputedStyle(current).paddingTop
      );
      const paddingBottom = pixelToInteger(
        window.getComputedStyle(current).paddingBottom
      );
      const paddingLeft = pixelToInteger(
        window.getComputedStyle(current).paddingLeft
      );
      const paddingRight = pixelToInteger(
        window.getComputedStyle(current).paddingRight
      );
      const borderTop = pixelToInteger(
        window.getComputedStyle(current).borderTopWidth
      );
      const borderBottom = pixelToInteger(
        window.getComputedStyle(current).borderBottomWidth
      );
      const borderLeft = pixelToInteger(
        window.getComputedStyle(current).borderLeftWidth
      );
      const borderRight = pixelToInteger(
        window.getComputedStyle(current).borderRightWidth
      );
      setDimensions({
        height: height - paddingTop - paddingBottom - borderTop - borderBottom,
        width: width - paddingLeft - paddingRight - borderLeft - borderRight,
      });
    }
  }, []);

  return { dimensions, ref };
};
