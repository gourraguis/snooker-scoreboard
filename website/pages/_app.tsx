import type { AppProps } from 'next/app'
import '../styles/antd.less'

function SafeHydrate({ children }: { children: JSX.Element }) {
  return <div suppressHydrationWarning>{typeof window === 'undefined' ? null : children}</div>
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SafeHydrate>
      <Component {...pageProps} />
    </SafeHydrate>
  )
}

export default MyApp
