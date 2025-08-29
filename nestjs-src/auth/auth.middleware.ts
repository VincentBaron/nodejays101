import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as cookie from 'cookie';

export interface AuthenticatedRequest extends Request {
  user?: {
    authorization?: string;
    spotifyAuthorization?: string;
    userId?: string;
  };
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const cookieHeader = req.headers.cookie;

    if (!cookieHeader) {
      req.user = null;
      return next();
    }

    // Parse the cookies
    const cookies = cookie.parse(cookieHeader);

    // Extract values from the cookies
    const authorization = cookies.Authorization || null;
    const spotifyAuthorization = cookies.SpotifyAuthorization || null;
    const userId = cookies.UserID || null;

    // Attach the extracted values to the request object
    req.user = {
      authorization,
      spotifyAuthorization,
      userId,
    };

    next();
  }
}
