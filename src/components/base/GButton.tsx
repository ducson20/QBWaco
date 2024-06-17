/* eslint-disable */

import * as React from 'react';

import { Button } from 'native-base';

export interface IGButtonProps {
  size?: string;
  colorScheme?: string;
  variant?: string;
  _text?: any;
  _stack?: any;
  children: JSX.Element | any;
}

export default function GButton({
  size = 'md',
  colorScheme = 'primary',
  variant = 'solid',
  _text = {},
  _stack = {},
  children,
  ...restProps
}: IGButtonProps | any) {
  return (
    <Button
      size={size}
      colorScheme={colorScheme}
      variant={variant}
      _text={{
        color: '#ffffff',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 600,
        ..._text,
      }}
      _stack={_stack}
      {...restProps}
    >
      {children}
    </Button>
  );
}
