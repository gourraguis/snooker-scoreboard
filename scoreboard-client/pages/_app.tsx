import type { AppProps } from 'next/app'
import '../styles/antd.less'
import { RecoilRoot } from 'recoil'

function SafeHydrate({ children }: { children: JSX.Element }) {
  return <div suppressHydrationWarning>{typeof window === 'undefined' ? null : children}</div>
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <SafeHydrate>
        <Component {...pageProps} />
      </SafeHydrate>
    </RecoilRoot>
  )
}

export default MyApp
