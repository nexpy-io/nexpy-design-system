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
import { motion, AnimatePresence } from 'framer-motion'

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
          <AnimatePresence>
            {modalIsOpen ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  default: { duration: 0.3 },
                }}
              >
                <ModalBackground variant='center' {...backgroundProps}>
                  <ModalCard ref={modalMainRef} {...props}>
                    {render({ isOpen: modalIsOpen, setIsOpen, excludeRef })}
                  </ModalCard>
                </ModalBackground>
              </motion.div>
            ) : null}
          </AnimatePresence>
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
