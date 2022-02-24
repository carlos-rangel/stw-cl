import React from 'react'
import Skeleton from './index'
import { render, screen } from '@testing-library/react'

describe('Skeleton Component', () => {
  it('renders the appropriate skeleton type', () => {
    const { container, rerender } = render(<Skeleton />)
    screen.getByText((_content, element) => {
      return element.tagName.toLowerCase() === 'span' && element.classList.contains('text')
    })
    expect(screen.queryByText((_content, element) => {
      return element.tagName.toLowerCase() === 'span' && element.classList.contains('image')
    })).not.toBeInTheDocument()
    expect(screen.queryByText((_content, element) => {
      return element.tagName.toLowerCase() === 'span' && element.classList.contains('button')
    })).not.toBeInTheDocument()
    expect(screen.queryByText((_content, element) => {
      return element.tagName.toLowerCase() === 'span' && element.classList.contains('button-secondary')
    })).not.toBeInTheDocument()

    rerender(<Skeleton type="image" />)
    expect(container.querySelector('.text')).not.toBeInTheDocument()
    expect(container.querySelector('.image')).toBeInTheDocument()
    expect(container.querySelector('.button')).not.toBeInTheDocument()
    expect(container.querySelector('.button-secondary')).not.toBeInTheDocument()

    rerender(<Skeleton type="button" />)
    expect(container.querySelector('.text')).not.toBeInTheDocument()
    expect(container.querySelector('.image')).not.toBeInTheDocument()
    expect(container.querySelector('.button')).toBeInTheDocument()
    expect(container.querySelector('.button-secondary')).not.toBeInTheDocument()

    rerender(<Skeleton type="button-secondary" />)
    expect(container.querySelector('.text')).not.toBeInTheDocument()
    expect(container.querySelector('.image')).not.toBeInTheDocument()
    expect(container.querySelector('.button')).toBeInTheDocument()
    expect(container.querySelector('.button-secondary')).toBeInTheDocument()
  })

  it('renders a circle skeleton', () => {
    const { container } = render(<Skeleton circle />)
    expect(container.querySelector('.circle')).toBeInTheDocument()
  })

  it('renders the skeleton with correct width and height units', () => {
    const { container, rerender } = render(<Skeleton width="10" height="10" />)
    expect(container.querySelector('.pulse')).toHaveStyle({
      width: '10px',
      height: '10px'
    })

    rerender(<Skeleton type="button-secondary" width={10} height={10} />)
    expect(container.querySelector('.pulse')).toHaveStyle({
      width: '10px',
      height: '10px'
    })

    rerender(<Skeleton type="button-secondary" width="10em" height="10em" />)
    expect(container.querySelector('.pulse')).toHaveStyle({
      width: '10em',
      height: '10em'
    })

    rerender(<Skeleton type="button-secondary" width="10%" height="10%" />)
    expect(container.querySelector('.pulse')).toHaveStyle({
      width: '10%',
      height: '10%'
    })

    rerender(<Skeleton type="button-secondary" width="" height="" />)
    expect(container.querySelector('.pulse')).toHaveStyle({
      width: '',
      height: ''
    })
  })
})
