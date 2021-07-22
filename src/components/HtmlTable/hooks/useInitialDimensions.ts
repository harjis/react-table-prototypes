import { Ref, useEffect, useRef, useState } from 'react';

type Dimensions = {
  height: number;
  width: number;
};
type Return<ElementType> = {
  dimensions: Dimensions | null;
  ref: Ref<ElementType>;
};
export const useInitialDimensions = <ElementType extends Element>(): Return<ElementType> => {
  const ref = useRef<ElementType>(null);
  const [dimensions, setDimensions] = useState<Dimensions | null>(null);

  useEffect(() => {
    const { current } = ref;
    if (current instanceof Element) {
      const { width, height } = current.getBoundingClientRect();
      setDimensions({ height, width });
    }
  }, []);

  return { dimensions, ref };
};
