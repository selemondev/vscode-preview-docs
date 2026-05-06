type URI =  {
  label: string;
  logo: string;
  docUrl: string
};

const escapeHtml = (value: string) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");

const getSafeUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : "about:blank";
  } catch {
    return "about:blank";
  }
};

export const getWebviewContent = (uri: URI) => {
  const safeLabel = escapeHtml(uri.label);
  const safeLogo = getSafeUrl(uri.logo);
  const safeDocUrl = getSafeUrl(uri.docUrl);
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; frame-src https:; img-src https: data:; style-src 'unsafe-inline'">
  <style>
    body, html
      {
        margin: 0; padding: 0; height: 100%; overflow: hidden; background-color: #fff;
      }
  </style>
    <link rel="icon" href="${safeLogo}" type="image/png">
    <title>${safeLabel}</title>
  </head>
  <body>
    <iframe width="100%" height="100%" src="${safeDocUrl}" frameborder="0" sandbox="allow-forms allow-popups allow-same-origin allow-scripts" referrerpolicy="no-referrer">
      <p>Can't load the requested documentation preview.</p>
    </iframe>
  </body>
  </html>
  `;
  return html;
};
