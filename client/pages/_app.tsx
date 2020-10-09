import Router from 'next/router'
import NProgress from 'nprogress'
import { AudioProvider } from '../context/Audio'
import '../styles/nprogress.css'
import '../styles/globals.css'

NProgress.configure({ showSpinner: false })

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function App({ Component, pageProps }) {
  return (
    <AudioProvider>
      <Component {...pageProps} />
    </AudioProvider>
  )
}

export default App
