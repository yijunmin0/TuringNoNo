import {useCallback, useState} from 'react';
import type {LayoutChangeEvent, LayoutRectangle} from 'react-native';

export const useLayout = (): [
  LayoutRectangle,
  (e: LayoutChangeEvent) => void,
] => {
  const [DomLayout, setDomLayout] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const {layout} = e.nativeEvent;
    setDomLayout(layout);
  }, []);
  return [DomLayout, onLayout];
};
