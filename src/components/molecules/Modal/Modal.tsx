/* eslint-disable @typescript-eslint/no-explicit-any */

import React, {
  useRef,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
  memo,
  RefObject,
  ReactNode,
} from 'react'

import {
  ModalPortalDedupleContext,
  ModalPortalDedupleProvider,
} from 'contexts/ModalPortalDedupleContext'
import { motion } from 'framer-motion'

import { FlexProps } from 'components/atoms'
import { Portal } from 'components/hocs/Portal'
import { CardProps } from 'components/molecules'

import { useOnClickOutside } from 'hooks'

import { ModalBackground, ModalCard } from './styled'

type ModalFunctionNotation = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  excludeRef: RefObject<any>
}

export type ModalProps = {
  render: (params: ModalFunctionNotation) => ReactNode
  children?: (params: ModalFunctionNotation) => ReactNode
  externalIsOpen?: boolean
  backgroundProps?: FlexProps
  disableUseOnClickOutside?: boolean
} & Omit<CardProps, 'children'>

const motionBackgroundVariants = {
  hidden: {
    opacity: 0,
    transitionEnd: {
      display: 'none',
    },
  },
  visible: {
    opacity: 1,
  },
}

const ModalBase = ({
  render,
  externalIsOpen,
  children,
  backgroundProps,
  disableUseOnClickOutside,
  ...props
}: ModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const modalIsOpen = typeof externalIsOpen === 'boolean' ? externalIsOpen : isOpen

  const modalMainRef = useRef(null)

  const excludeRef = useRef(null)

  const hasParentModal = ModalPortalDedupleContext.useSelector(
    state => state.parentModalAlreadyExistsUsingPortal
  )

  const clickOutsideHandler = useCallback(() => {
    if (disableUseOnClickOutside) {
      return
    }

    setIsOpen(false)
  }, [disableUseOnClickOutside])

  useOnClickOutside(modalMainRef, clickOutsideHandler, excludeRef)

  return (
    <>
      {children && children({ isOpen: modalIsOpen, setIsOpen, excludeRef })}

      <ModalPortalDedupleProvider>
        <Portal enabled={!hasParentModal}>
          <motion.div
            variants={motionBackgroundVariants}
            initial='hidden'
            animate={modalIsOpen ? 'visible' : 'hidden'}
            transition={{
              default: { duration: 0.3 },
            }}
            style={{
              ...(modalIsOpen && {
                display: 'block',
              }),
            }}
          >
            <ModalBackground variant='center' {...backgroundProps}>
              <ModalCard ref={modalMainRef} {...props}>
                {render({ isOpen: modalIsOpen, setIsOpen, excludeRef })}
              </ModalCard>
            </ModalBackground>
          </motion.div>
        </Portal>
      </ModalPortalDedupleProvider>
    </>
  )
}

ModalBase.defaultProps = {
  children: undefined,
  externalIsOpen: undefined,
  backgroundProps: undefined,
  disableUseOnClickOutside: false,
}

const Modal = memo(ModalBase)

export { Modal }
