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
import {
  motion,
  AnimatePresence,
  TargetAndTransition,
  VariantLabels,
  Transition,
} from 'framer-motion'

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
  customAnimation?: {
    initial?: TargetAndTransition | VariantLabels | boolean
    transition?: Transition
    in?: TargetAndTransition | VariantLabels | boolean
    out?: TargetAndTransition | VariantLabels
  }
  render: (params: ModalFunctionNotation) => ReactNode
  onClickOutside?: () => void
  children?: (params: ModalFunctionNotation) => ReactNode
  externalIsOpen?: boolean
  backgroundProps?: FlexProps
  motionContainerProps?: Record<string, unknown>
  disableUseOnClickOutside?: boolean
} & Omit<CardProps, 'children'>

const ModalBase = ({
  customAnimation,
  render,
  onClickOutside,
  externalIsOpen,
  children,
  backgroundProps,
  motionContainerProps = {
    style: {
      position: 'fixed',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      zIndex: '10',
    },
  },
  disableUseOnClickOutside = false,
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
    if (onClickOutside) {
      onClickOutside()
    }

    if (disableUseOnClickOutside) {
      return
    }

    setIsOpen(false)
  }, [disableUseOnClickOutside, onClickOutside])

  useOnClickOutside(modalMainRef, clickOutsideHandler, excludeRef)

  return (
    <>
      {children && children({ isOpen: modalIsOpen, setIsOpen, excludeRef })}

      <ModalPortalDedupleProvider>
        <Portal enabled={!hasParentModal}>
          <AnimatePresence>
            {modalIsOpen ? (
              <motion.div
                {...motionContainerProps}
                initial={
                  customAnimation?.initial ? customAnimation.initial : { opacity: 0 }
                }
                animate={customAnimation?.in ? customAnimation.in : { opacity: 1 }}
                exit={customAnimation?.out ? customAnimation.out : { opacity: 0 }}
                transition={
                  customAnimation?.transition
                    ? customAnimation.transition
                    : {
                        default: { duration: 0.3 },
                      }
                }
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

const Modal = memo(ModalBase)

export { Modal }
