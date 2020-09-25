import { useEffect, useRef } from 'react'

export const useKey = (key, cb) => {
  const callbackRef = useRef(cb)

  useEffect(() => {
    callbackRef.current = cb
  })

  useEffect(() => {
    function handle(event) {
      if (event.code === key) {
        callbackRef.current(event)
      }
    }

    document.addEventListener('keypress', handle)

    return () => {
      document.removeEventListener('keypress', handle)
    }
  }, [key])
}

export const handleEnter = () => {}
export const handleArrowUp = () => {}
export const handleArrowDown = () => {}
