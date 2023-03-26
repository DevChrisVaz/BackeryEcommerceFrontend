import { wrapper } from '@/features/store';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
		const mainScript = document.createElement("script");
		mainScript.src = "js/main.js";
		setTimeout(() => {
      document.body.appendChild(mainScript);
    }, 500);
	});

  return <Component {...pageProps} />
}

export default wrapper.withRedux(App);