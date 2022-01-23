import type { AppProps } from 'next/app'
import '../styles/antd.less'
import '../styles/index.css'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default MyApp
