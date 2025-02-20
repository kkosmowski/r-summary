import { ChangeEvent, KeyboardEvent, forwardRef, InputHTMLAttributes } from 'react';

import { CheckIcon } from '~/icons/CheckIcon';
import { cn } from '~/utils/cn';

import styles from './TextField.module.scss';

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  id?: string;
  label?: string;
  labelledBy?: string;
  isSuccess?: boolean;
  isError?: boolean;
  onChange: (value: string) => void;
  onEnter?: VoidFunction;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    { value, id, label, labelledBy, autoFocus, onChange, onEnter, isSuccess, isError, className, ...inputProps },
    ref,
  ) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.code === 'Enter') {
        onEnter?.();
      }
    };

    return (
      <span className={cn(styles.wrapper, isSuccess && styles.ok, isError && styles.notOk)}>
        <div className={cn(styles.inputWrapper, !!label && styles.withLabel, className)}>
          {!labelledBy && label && (
            <label htmlFor={id} className="overlay-label">
              {label}
            </label>
          )}
          <input
            id={id}
            ref={ref}
            type="text"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            aria-labelledby={labelledBy}
            {...inputProps}
          />
        </div>
        {isSuccess && <CheckIcon color="success" className={styles.icon} />}
      </span>
    );
  },
);
