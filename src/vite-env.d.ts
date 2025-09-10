/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module "*&as=src" {
  const src: string;
  export default src;
}

declare module "*&as=srcset" {
  const srcset: string;
  export default srcset;
}

declare module "*&as=picture" {
  const picture: string;
  export default picture;
}
