export const testRunnerHtml = testFramework => `
<!DOCTYPE html>
<html lang="es-ES">
  <head>
    <title>testing template</title>
    <meta charset='utf-8'/>
    <meta http-equiv='x-ua-compatible' content='IE=edge,chrome=1'/>
    <meta
      name='viewport'
      content='width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0, viewport-fit=cover'
      />
    <style>
      html,
      body {
        margin: 0;
      }
    </style>
  </head>
  <body>
    <script src="/node_modules/@webcomponents/scoped-custom-element-registry/scoped-custom-element-registry.min.js"></script>
    <script type='module' src='${testFramework}'></script>
  </body>
</html>
`;
