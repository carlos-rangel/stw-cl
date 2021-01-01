import React, { FunctionComponent } from 'react';

import styles from './input.module.scss';

interface Props {
  [rest: string]: unknown; // ...rest property
};

const Input: FunctionComponent<Props> = ({
  ...rest
}) => {
  return (
    <div className={styles['input-wrapper']} {...rest}>
      Input
    </div>
  );
};

export default Input;
