import type { AppProps } from 'next/app'
import '../styles/antd.less'
import { RecoilRoot } from 'recoil'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { getDisablePWA } from '../services/config'
import { MDPromptPWA } from '../components/MDPromptPWA/MDPromptPWA'

function SafeHydrate({ children }: { children: JSX.Element }) {
  return <div suppressHydrationWarning>{typeof window === 'undefined' ? null : children}</div>
}

function MyApp({ Component, pageProps }: AppProps) {
  const [isPWAInstalled, setPWAInstalled] = useState(false)

  useEffect(() => {
    setPWAInstalled(window.matchMedia('(display-mode: standalone)').matches)
  })

  return (
    <RecoilRoot>
      <Head>
        <title>Jawad Club</title>
      </Head>
      <SafeHydrate>{getDisablePWA() || isPWAInstalled ? <Component {...pageProps} /> : <MDPromptPWA />}</SafeHydrate>
    </RecoilRoot>
  )
}

export default MyApp
