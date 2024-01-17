type URI = {
  label: string,
  logo: string;
  docUrl: string
}
export const getWebviewContent = (uri: URI) => {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <style>
    body, html
      {
        margin: 0; padding: 0; height: 100%; overflow: hidden; background-color: #fff;
      }
  </style>
    <link rel="icon" href="${uri.logo}" type="image/png">
    <title>${uri.label}</title>
  </head>
  <body>
    <iframe width="100%" height="100%" src="${uri.docUrl}" frameborder="0">
      <p>Can't load ${uri.label}</p>
    </iframe>
  </body>
  </html>
  `;
  return html;
};
