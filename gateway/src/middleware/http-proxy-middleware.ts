import { Injectable, NestMiddleware } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';
import type { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HttpProxyMiddleWare implements NestMiddleware {
  private proxies: any[] = [];

  constructor(private readonly config: ConfigService) {
    const proxyConfig = this.config.get('proxyConfig');
    this.proxies = proxyConfig.map((proxy) => {
      return {
        prefix: proxy.prefix,
        middleware: createProxyMiddleware({
          target: proxy.target,
          pathRewrite: (path) =>
            path.replace(proxy.prefix, proxy.rewritePrefix),
          changeOrigin: true,
          secure: false,
        }),
      };
    });
  }

  use(req: Request, res: Response, next: NextFunction) {

    const matchingProxy = this.proxies.find((p) =>
      req.baseUrl.startsWith(p.prefix),
    );
    if (matchingProxy) {
      matchingProxy.middleware(req, res, next);
    } else {
      next();
    }
  }
}
