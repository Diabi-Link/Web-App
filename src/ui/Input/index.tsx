import React, { useState, useEffect, forwardRef } from 'react';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';

type Props = {
  value: string;
  type: string;
  placeholder?: string;
  icon?: JSX.Element;
  errorText?: string;
  helperText?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => any;
  onFocus?: () => any;
  onClick?: () => any;
  content?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'>;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div<{
  focused: Boolean;
  errorText?: String;
  disabled?: Boolean;
  content: Props['content'];
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => {
    if (props.disabled) return props.theme.main.grayLight;
    return props.theme.main.grayLighter;
  }};
  border-radius: 10px;
  border-bottom: 3px solid
    ${(props) => {
      if (props.errorText) return props.theme.main.error;
      if (props.focused) return props.theme.main.primaryLight;
      return 'transparent';
    }};
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  color: ${(props) => props.theme.main.gray};
  position: relative;

  ${({ content, theme }) =>
    content &&
    `
      &:after {
        content: 'g/L';
        color: ${theme.main.dark};
        font-size: 4rem;
        position: absolute;
        right: 0.875rem;
      }
    `}
`;

const InputElement = styled.input`
  width: 100%;
  height: 45px;
  padding: 0 10px;
  background-color: transparent;
  border: none;
  font-size: 15px;
  font-weight: 400;
  color: ${(props) => props.theme.main.dark}
  ::placeholder {
    color: ${(props) => props.theme.main.gray};
  }
  :focus {
    outline: none;
  }
`;

const IconElement = styled(Icon)<{
  selected: boolean;
}>`
  margin-right: 0.7rem;
  cursor: ${({ selected }) => {
    if (selected) return 'pointer';
    return 'default';
  }};
`;

const HelperElement = styled.span`
  font-size: 12px;
  font-style: italic;
  font-weight: 300;
  text-align: left;
  color: ${(props) => props.theme.main.darkLight};
  margin-top: 5px;
`;

const ErrorElement = styled.span`
  font-size: 14px;
  font-weight: 300;
  color: ${(props) => props.theme.main.error};
  margin-top: 3px;
`;

const Input = forwardRef(
  (
    {
      onBlur,
      onFocus,
      onChange,
      onClick,
      value,
      type,
      errorText,
      helperText,
      disabled,
      icon,
      content,
      ...props
    }: Props,
    ref,
  ): JSX.Element => {
    const [focused, setFocused] = useState(false);
    const [delayedValue, setDelayedValue] = useState(value || '');

    useEffect(() => {
      setDelayedValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <Container>
        <InputWrapper
          focused={focused}
          errorText={errorText}
          disabled={disabled}
          content={content}
        >
          <InputElement
            {...props}
            ref={ref as React.RefObject<HTMLInputElement>}
            value={delayedValue}
            autoComplete="off"
            type={type}
            onFocus={(e) => {
              if (onFocus) onFocus(e);
              setFocused(true);
            }}
            onBlur={(e) => {
              if (onBlur) onBlur(e);
              setFocused(false);
            }}
            onChange={(e) => {
              setDelayedValue(e.target.value);
              handleChange(e);
            }}
            disabled={disabled}
          />
          {icon && (
            <IconElement
              icon={icon}
              size={20}
              onClick={onClick}
              selected={!!onClick}
            />
          )}
        </InputWrapper>
        {helperText && <HelperElement>{helperText}</HelperElement>}
        {errorText && <ErrorElement>{errorText}</ErrorElement>}
      </Container>
    );
  },
);

Input.defaultProps = {
  onBlur: undefined,
  onFocus: undefined,
  onChange: undefined,
  onClick: undefined,
  icon: undefined,
  placeholder: undefined,
  errorText: undefined,
  helperText: undefined,
  disabled: false,
  content: '',
};

export default Input;
