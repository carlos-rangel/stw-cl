import React, { FunctionComponent, forwardRef, ElementType } from 'react'
import clsx from 'clsx'

import styles from './button.module.scss'

interface Props {
  buttonType?: 'primary' | 'secondary' | 'tertiary' | 'success'
  /** RBA or HEX value of spinner */
  color?: string
  /** Overrides wrapper DOM element */
  component?: ElementType
  /** Link to leave page. Turns the button into an "a" tag. */
  href?: string
  /** Flag to indicate a rounded button */
  rounded?: boolean
  /** Size of height/width of spinner */
  size?: 'sm' | 'md' | 'lg'
  /** The default type to be applied to the button */
  type?: 'button' | 'submit' | 'reset' | ''
  [rest: string]: unknown
}

const Button: FunctionComponent<Props> = forwardRef<HTMLAnchorElement | HTMLButtonElement, Props>((props, ref) => {
  const {
    buttonType = 'primary',
    children = null,
    className = '',
    href = '',
    loading = false,
    loadingColor = '#fff',
    rounded = false,
    size = 'lg',
    type = 'button',
    value,
    component: Component = 'button',
    ...rest
  } = props

  const load = loading ? styles.loading : ''
  const btnClassName = clsx(styles.btn, styles[size], load, rounded && styles.rounded, styles[buttonType], className)
  const buttonChildren = (
    <div className={styles['btn-flex']}>
      {loading &&
        // <Loading color={loadingColor} style={{ marginRight: "15px" }} />
        'Loading'}
      {children}
    </div>
  )

  if (href) {
    return (
      // @ts-ignore
      <a ref={ref} className={btnClassName} href={href} {...rest}>
        {buttonChildren}
      </a>
    )
  }

  return (
    <Component ref={ref} className={btnClassName} type={type} {...rest}>
      {buttonChildren}
    </Component>
  )
})

export default Button
