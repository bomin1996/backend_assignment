import {
  Controller,
  All,
  Req,
  Res,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpProxyService } from './http.service';

@Controller()
@Injectable()
export class AppController {
  constructor(private readonly proxy: HttpProxyService) {}

  @All('*')
  async handleAll(@Req() req: Request, @Res() res: Response) {
    console.log('Request URL:', req.url);
    console.log('Needs Auth:', this.needsAuth(req.url));
    try {
      const targetUrl = this.mapUrl(req);

      const headers: Record<string, string> = {};
      if (this.needsAuth(req.url)) {
        if (!req.headers.authorization) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        headers['Authorization'] = req.headers.authorization;
      }

      const response = await this.proxy.forwardRequest(
          req.method,
          targetUrl,
          req.body,
          headers,
      );

      res.status(response.status).json(response.data);
    } catch (err) {
      console.error('[Proxy Error]', err?.response?.data || err.message);
      res
          .status(err.response?.status || HttpStatus.INTERNAL_SERVER_ERROR)
          .json(err.response?.data || { message: 'Internal Server Error' });
    }
  }

  private mapUrl(req: Request): string {
    const isTestEnv = process.env.NODE_ENV === 'test';

    const authHost = isTestEnv
        ? 'http://localhost:3001'
        : 'http://auth-server:3000';
    const eventHost = isTestEnv
        ? 'http://localhost:3002'
        : 'http://event-server:3000';

    const baseUrl = req.url.startsWith('/auth') ? authHost : eventHost;
    return `${baseUrl}${req.url}`;
  }

  private needsAuth(path: string): boolean {
    const publicPaths = ['/auth/register', '/auth/login'];
    return !publicPaths.some(p => path.startsWith(p));
  }
}
