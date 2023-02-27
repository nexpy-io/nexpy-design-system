import type { UseFormRegisterReturn } from 'react-hook-form'

import Inputmask from 'inputmask'
import flowright from 'lodash.flowright'

export const withHookFormMask = (
  registerReturn: UseFormRegisterReturn,
  mask: Inputmask.Options['mask'],
  options?: Inputmask.Options
) => {
  let newRef

  if (registerReturn) {
    const { ref } = registerReturn

    const maskInput = Inputmask({
      mask,
      jitMasking: true,
      ...options,
    })

    newRef = flowright(ref, _ref => {
      if (_ref) maskInput.mask(_ref)
      return _ref
    })
  }

  return {
    ...registerReturn,
    ref: newRef,
  }
}

export const withMask =
  (mask: Inputmask.Options['mask'], options?: Inputmask.Options) =>
  (input: HTMLElement | HTMLInputElement | null) => {
    //
    const maskInput = Inputmask({
      mask,
      ...options,
    })

    if (input) {
      maskInput.mask(input)
    }

    return input
  }
