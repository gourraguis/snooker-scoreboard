import type { AppProps } from 'next/app'
import '../styles/antd.less'
import { RecoilRoot } from 'recoil'
import { useEffect, useState } from 'react'
import { ODPromptPWA } from '../components/ODPromptPWA/ODPromptPWA'
import { getDisablePWA } from '../services/config'

function SafeHydrate({ children }: { children: JSX.Element }) {
  return <div suppressHydrationWarning>{typeof window === 'undefined' ? null : children}</div>
}

function MyApp({ Component, pageProps }: AppProps) {
  const [isPWAInstalled, setPWAInstalled] = useState(false)

  useEffect(() => {
    setPWAInstalled(window.matchMedia('(display-mode: standalone)').matches)
  }, [])

  return (
    <RecoilRoot>
      <SafeHydrate>{getDisablePWA() || isPWAInstalled ? <Component {...pageProps} /> : <ODPromptPWA />}</SafeHydrate>
    </RecoilRoot>
  )
}

export default MyApp
