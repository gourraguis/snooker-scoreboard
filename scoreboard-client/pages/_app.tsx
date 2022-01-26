import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { RecoilRoot } from 'recoil'

function SafeHydrate({ children }: { children: JSX.Element }) {
  return <div suppressHydrationWarning>{typeof window === 'undefined' ? null : children}</div>
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SafeHydrate>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SafeHydrate>
  )
}

export default MyApp
