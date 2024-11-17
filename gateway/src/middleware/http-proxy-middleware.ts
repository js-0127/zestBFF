import { Injectable, NestMiddleware } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';
import type { Request, Response, NextFunction } from 'express';
@Injectable()
export class HttpProxyMiddleWare implements NestMiddleware {
  private proxy = createProxyMiddleware({
    target: 'http://127.0.0.1:3000',
    pathRewrite: {
      '/pc': '',
    },
    secure: false,
  });

  use(req: Request, res: Response, next: NextFunction) {
    this.proxy(req, res, next);
  }
}
