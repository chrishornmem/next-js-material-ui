import React from 'react';

const LoadScript = (props) => {

  const { onLoad, scriptId, src, defer = true, async = true } = props;

  React.useEffect(() => {
    const existingScript = document.getElementById(scriptId);

    if (!existingScript) {
      const script = document.createElement('script');
      script.defer = defer;
      script.async = async;
      script.src = src; // URL for the third-party library being loaded.
      script.id = scriptId; // e.g., googleMaps or stripe
      document.body.appendChild(script);

      script.onload = () => {
        if (onLoad) onLoad();
      };
    }

    if (existingScript && onLoad) onLoad();
  }, []);

  return null;
};

export default LoadScript;
