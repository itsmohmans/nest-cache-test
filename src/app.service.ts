import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async getHello(): Promise<string> {
    await this.cacheManager.set(
      'hello',
      'world',
      Number(process.env.VERIFICATION_TOKEN_TTL) || 86400000, // ttl in ms
    );
    return await this.cacheManager.get('hello');
    // return 'Hello World!';
  }
}
