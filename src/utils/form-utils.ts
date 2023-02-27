import type { UseFormRegisterReturn } from 'react-hook-form'

import type Inputmask from 'inputmask'
import flowright from 'lodash.flowright'

export const withHookFormMask = (
  InputmaskFunction: typeof Inputmask,
  registerReturn: UseFormRegisterReturn,
  mask: Inputmask.Options['mask'],
  options?: Inputmask.Options
) => {
  let newRef

  if (registerReturn) {
    const { ref } = registerReturn

    const maskInput = InputmaskFunction({
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
  (
    InputmaskFunction: typeof Inputmask,
    mask: Inputmask.Options['mask'],
    options?: Inputmask.Options
  ) =>
  (input: HTMLElement | HTMLInputElement | null) => {
    //
    const maskInput = InputmaskFunction({
      mask,
      ...options,
    })

    if (input) {
      maskInput.mask(input)
    }

    return input
  }

export type WithMaskPattern = Inputmask.Options['mask']
export type WithMaskOptions = Inputmask.Options
