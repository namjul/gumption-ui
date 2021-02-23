import * as React from 'react';
import { ThemedStyle } from '@gumption-ui/interpolate';
import { mergeProps } from '@gumption-ui/utils';

type Slots = { [slot: string]: ThemedStyle };
type SlotContextProps = Slots | null;

const SlotContext = React.createContext<SlotContextProps>(null);

/**
 * Consumes slots props from parents.
 *
 * @example
 * const props =  useSlotProps(props, 'title')
 */
export function useSlotProps<T>(
  props: T & { slot?: string },
  defaultSlot: string,
): ThemedStyle {
  const slot = props.slot ?? defaultSlot;
  const { [slot]: slotProps = {} } = React.useContext(SlotContext) || {};
  return mergeProps(slotProps, props) as ThemedStyle;
}

/**
 * Consumes slots styles from parents.
 *
 * @example
 * const styles =  useSlotStyles('title')
 */
export function useSlotStyles(slot: string): ThemedStyle {
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
}): JSX.Element {
  // parentSlots is always the memoized `value`, therefore won't trigger unnecessary re-renders.
  const parentSlots = React.useContext(SlotContext) || {}; // eslint-disable-line react-hooks/exhaustive-deps
  const value = React.useMemo(
    () =>
      Object.keys(parentSlots)
        .concat(Object.keys(slots))
        .reduce(
          (accumulator, current) => ({
            ...accumulator,
            [current]: mergeProps(
              parentSlots[current] || {},
              slots[current] || {},
            ),
          }),
          {},
        ),
    [parentSlots, slots],
  );

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
export function ClearSlots({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <SlotContext.Provider value={{}}>{children}</SlotContext.Provider>;
}
