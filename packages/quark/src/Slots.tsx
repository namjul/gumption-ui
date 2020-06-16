import * as React from 'react';
import mergeProps from 'merge-props';
import { ThemedStyle } from './interpolate';

type Slots = { [slot: string]: ThemedStyle };

const SlotContext = React.createContext<Slots | null>(null);

/**
 * Consumes slots props from parents.
 *
 * @example
 * const props =  useSlotProps(props, 'title')
 */
export function useSlotProps<T>(
  props: T & { slot?: string },
  defaultSlot: string,
) {
  const slot = props.slot ?? defaultSlot;
  const { [slot]: slotProps = {} } = React.useContext(SlotContext) || {};
  return mergeProps(slotProps, props);
}

/**
 * Consumes slots styles from parents.
 *
 * @example
 * const styles =  useSlotStyles('title')
 */
export function useSlotStyles(slot: string) {
  const { [slot]: slotStyles = {} } = React.useContext(SlotContext) || {};
  return slotStyles;
}

/**
 * Provides slots for underlying components.
 *
 * @example
 * <SlotProvider slots={{ Title: { color: 'red.5' } }}>
 *  {children}
 * </SlotProvider>
 */
export function SlotProvider({
  slots,
  children,
}: {
  slots: Slots;
  children: React.ReactNode;
}) {
  const parentSlots = React.useContext(SlotContext) || {};
  const value = React.useMemo(() => {
    return Object.keys(parentSlots)
      .concat(Object.keys(slots))
      .reduce((accumulator, current) => {
        return {
          ...accumulator,
          [current]: mergeProps(
            parentSlots[current] || {},
            slots[current] || {},
          ),
        };
      }, {});
  }, [parentSlots, slots]);

  return <SlotContext.Provider value={value}>{children}</SlotContext.Provider>;
}

/**
 * Resets/Clears the slots context.
 *
 * @example
 * <ClearSlots>
 *  {children}
 * </ClearSlots>
 */
export function ClearSlots({ children }: { children: React.ReactNode }) {
  return <SlotContext.Provider value={{}}>{children}</SlotContext.Provider>;
}
