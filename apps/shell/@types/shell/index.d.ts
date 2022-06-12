declare module NodeJS {
  interface ProcessEnv {
    PORT: string
    APPLICATION_POSTS_BASE_URL: string
    APPLICATION_AUTH_BASE_URL: string
  }
}
interface FragmentAttributes {
  id: string
  url: string
  async?: boolean
  fallbackUrl?: string
  primary?: boolean
  public?: boolean
}

// declare class Tailor {
//   constructor(options?: {
//     amdLoaderUrl?: string
//     fetchContext?: (req: IncomingMessage) => Promise<object>
//     fetchTemplate?: (req: Request, parseTemplate: (path: string) => string) => Promise<any>
//     filterRequestHeaders?: (attributes: Attributes, req: IncomingMessage) => object
//     filterResponseHeaders?: (attributes: Attributes, res: ServerResponse) => object
//     fragmentTag?: string
//     handledTags?: string[]
//     handleTag?: (request: IncomingMessage, tag: object, options: object, context: object) => Stream | string
//     maxAssetLinks?: number
//     pipeAttributes?: (attributes: Attributes) => object
//     pipeInstanceName?: string
//     requestFragment?: (
//       filterHeaders: (attributes: Attributes, req: IncomingMessage) => object,
//       url: Url,
//       attributes: Attributes,
//       req: IncomingMessage,
//       span?: Span
//     ) => Promise<ServerResponse>
//     templatesPath?: string
//     tracer?: Tracer
//   })

//   requestHandler(request: IncomingMessage, response: ServerResponse): void
// }
