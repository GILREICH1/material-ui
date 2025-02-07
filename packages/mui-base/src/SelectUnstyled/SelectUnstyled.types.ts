import * as React from 'react';
import { DefaultComponentProps, OverrideProps, Simplify } from '@mui/types';
import {
  SelectOption,
  UseSelectButtonSlotProps,
  UseSelectListboxSlotProps,
} from './useSelect.types';
import PopperUnstyled, { PopperUnstyledProps } from '../PopperUnstyled';
import { SlotComponentProps } from '../utils';

export interface SelectUnstyledRootSlotPropsOverrides {}
export interface SelectUnstyledListboxSlotPropsOverrides {}
export interface SelectUnstyledPopperSlotPropsOverrides {}

export interface SelectUnstyledCommonProps {
  /**
   * If `true`, the select element is focused during the first mount
   * @default false
   */
  autoFocus?: boolean;
  children?: React.ReactNode;
  className?: string;
  /**
   * If `true`, the select is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the select will be initially open.
   * @default false
   */
  defaultListboxOpen?: boolean;
  /**
   * `id` attribute of the listbox element.
   * Also used to derive the `id` attributes of options.
   */
  listboxId?: string;
  /**
   * Controls the open state of the select's listbox.
   * @default undefined
   */
  listboxOpen?: boolean;
  /**
   * Name of the element. For example used by the server to identify the fields in form submits.
   * If the name is provided, the component will render a hidden input element that can be submitted to a server.
   */
  name?: string;
  /**
   * Callback fired when the component requests to be opened.
   * Use in controlled mode (see listboxOpen).
   */
  onListboxOpenChange?: (isOpen: boolean) => void;
}

export interface SelectUnstyledOwnProps<TValue extends {}> extends SelectUnstyledCommonProps {
  /**
   * The default selected value. Use when the component is not controlled.
   */
  defaultValue?: TValue | null;
  /**
   * A function to convert the currently selected value to a string.
   * Used to set a value of a hidden input associated with the select,
   * so that the selected value can be posted with a form.
   */
  getSerializedValue?: (
    option: SelectOption<TValue> | null,
  ) => React.InputHTMLAttributes<HTMLInputElement>['value'];
  /**
   * Callback fired when an option is selected.
   */
  onChange?: (
    e: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
    value: TValue | null,
  ) => void;
  /**
   * A function used to convert the option label to a string.
   * It's useful when labels are elements and need to be converted to plain text
   * to enable navigation using character keys on a keyboard.
   *
   * @default defaultOptionStringifier
   */
  optionStringifier?: (option: SelectOption<TValue>) => string;
  /**
   * Function that customizes the rendering of the selected value.
   */
  renderValue?: (option: SelectOption<TValue> | null) => React.ReactNode;
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<
      'button',
      SelectUnstyledRootSlotPropsOverrides,
      SelectUnstyledOwnerState<TValue>
    >;
    listbox?: SlotComponentProps<
      'button',
      SelectUnstyledListboxSlotPropsOverrides,
      SelectUnstyledOwnerState<TValue>
    >;
    popper?: SlotComponentProps<
      typeof PopperUnstyled,
      SelectUnstyledPopperSlotPropsOverrides,
      SelectUnstyledOwnerState<TValue>
    >;
  };
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: {
    root?: React.ElementType;
    listbox?: React.ElementType;
    popper?: React.ComponentType<SelectUnstyledPopperSlotProps<TValue>>;
  };
  /**
   * The selected value.
   * Set to `null` to deselect all options.
   */
  value?: TValue | null;
}

export interface SelectUnstyledTypeMap<
  TValue extends {},
  P = {},
  D extends React.ElementType = 'button',
> {
  props: P & SelectUnstyledOwnProps<TValue>;
  defaultComponent: D;
}

export type SelectUnstyledProps<
  TValue extends {},
  D extends React.ElementType = SelectUnstyledTypeMap<TValue>['defaultComponent'],
> = OverrideProps<SelectUnstyledTypeMap<TValue, {}, D>, D> & {
  component?: D;
};

// OverridableComponent cannot be used below as SelectUnstyled's props are generic.
export interface SelectUnstyledType {
  <TValue extends {}, C extends React.ElementType>(
    props: {
      /**
       * The component used for the root node.
       * Either a string to use a HTML element or a component.
       */
      component: C;
    } & OverrideProps<SelectUnstyledTypeMap<TValue>, C>,
  ): JSX.Element | null;
  <TValue extends {}>(
    props: DefaultComponentProps<SelectUnstyledTypeMap<TValue>>,
  ): JSX.Element | null;
  propTypes?: any;
}

export interface SelectUnstyledOwnerState<TValue extends {}>
  extends SelectUnstyledOwnProps<TValue> {
  active: boolean;
  disabled: boolean;
  focusVisible: boolean;
  open: boolean;
}

export type SelectUnstyledRootSlotProps<TValue extends {}> = Simplify<
  UseSelectButtonSlotProps & {
    className?: string;
    children?: React.ReactNode;
    ownerState: SelectUnstyledOwnerState<TValue>;
  }
>;

export type SelectUnstyledListboxSlotProps<TValue extends {}> = Simplify<
  UseSelectListboxSlotProps & {
    className?: string;
    children?: React.ReactNode;
    ownerState: SelectUnstyledOwnerState<TValue>;
  }
>;

export type SelectUnstyledPopperSlotProps<TValue extends {}> = {
  anchorEl: PopperUnstyledProps['anchorEl'];
  children?: PopperUnstyledProps['children'];
  className?: string;
  disablePortal: PopperUnstyledProps['disablePortal'];
  open: boolean;
  ownerState: SelectUnstyledOwnerState<TValue>;
  placement: PopperUnstyledProps['placement'];
};
