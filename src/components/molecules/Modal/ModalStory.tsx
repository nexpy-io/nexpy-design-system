import React from 'react'

import { Modal } from './Modal'

const ModalStory = () => (
  <div>
    <Modal
      render={({ isOpen, setIsOpen }) => (
        <div>
          <button type='button' onClick={() => setIsOpen(false)}>
            close
          </button>
          <p>I'm a Modal and i'm {isOpen ? 'opened' : 'closed'}</p>
        </div>
      )}
    >
      {({ setIsOpen }) => (
        <div>
          <br />
          <br />
          <br />
          <br />

          <button type='button' onClick={() => setIsOpen(true)}>
            Open
          </button>

          <br />
          <br />
          <br />
          <br />
        </div>
      )}
    </Modal>
  </div>
)

export default ModalStory
