import { useEffect, useState } from 'react'

export function useOrientation() {
  const [orientation, setOrientation] = useState(
    window.matchMedia('(orientation: landscape)').matches ? 'landscape' : 'portrait'
  )

  useEffect(() => {
    const mql = window.matchMedia('(orientation: landscape)')
    const handler = (e) => setOrientation(e.matches ? 'landscape' : 'portrait')
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  return orientation
}
