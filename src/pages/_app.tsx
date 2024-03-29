import { wrapper } from '@/features/store';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { Hearts } from 'react-loader-spinner';

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

  return loading ?
    <div style={{ minWidth: "100vww", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Hearts
        height={120}
        width={120}
        color="#573c30"
        ariaLabel="hearts-loading"
        visible={true}
      />
    </div>
    : <Component {...pageProps} />
}

export default wrapper.withRedux(App);