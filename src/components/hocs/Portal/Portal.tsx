/* eslint-disable react/jsx-no-useless-fragment */

import React, { useEffect, useState, memo, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

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
        document.querySelector('#root-design-system-portals') as Element
      )
    : null
}

PortalBase.defaultProps = {
  enabled: true,
}

const Portal = memo(PortalBase)

export { Portal }
