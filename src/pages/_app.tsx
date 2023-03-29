import { wrapper } from '@/features/store';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
		const mainScript = document.createElement("script");
		mainScript.src = "js/main.js";
		setTimeout(() => {
      document.body.appendChild(mainScript);
    }, 2000);
    setLoading(false);
	});

  useEffect(() => {
		const modalScript = document.createElement("script");
		modalScript.src = "js/comment.modal.js";
		document.body.appendChild(modalScript);
	}, []);

  return loading ? <>Loading...</> : <Component {...pageProps} />
}

export default wrapper.withRedux(App);