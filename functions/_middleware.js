const LEGACY_HOST = "product-one.pages.dev";
const PRIMARY_ORIGIN = "https://cosmicpaw.net";

export async function onRequest(context) {
  const requestUrl = new URL(context.request.url);

  if (requestUrl.hostname !== LEGACY_HOST) {
    return context.next();
  }

  const destination = new URL(
    `${requestUrl.pathname}${requestUrl.search}`,
    PRIMARY_ORIGIN,
  );

  return Response.redirect(destination.toString(), 301);
}
