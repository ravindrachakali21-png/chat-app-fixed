import { useState, useEffect } from 'react'

export const useWindowSize = () => {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  })

  useEffect(() => {
    const handler = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    // Fire immediately in case size changed before effect ran
    handler()
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return size
}

export const useIsMobile = () => {
  const { width } = useWindowSize()
  return width < 768
}
