/* eslint-disable react/jsx-no-useless-fragment */

import React, { useEffect, useState, memo, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

import { ROOT_DESIGN_SYSTEM_PORTALS_CONTAINER_ID } from 'constants/elements'

type PortalProps = {
  enabled?: boolean
}

const PortalBase = ({ children, enabled }: PropsWithChildren<PortalProps>) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    return () => setMounted(false)
  }, [])

  if (!enabled) {
    return <>{children}</>
  }

  return mounted
    ? createPortal(
        children,
        document.querySelector(`#${ROOT_DESIGN_SYSTEM_PORTALS_CONTAINER_ID}`) as Element
      )
    : null
}

PortalBase.defaultProps = {
  enabled: true,
}

const Portal = memo(PortalBase)

export { Portal }
