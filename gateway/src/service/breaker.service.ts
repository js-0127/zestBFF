import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import CircuitBreaker from 'opossum';

@Injectable()
export class BreakerService {
  breaker: CircuitBreaker;
  constructor(private readonly configService: ConfigService) {
    this.breaker = new CircuitBreaker(async (url: string) => {
      return fetch(url).then((res) => res.json());
    }, this.configService.get('breaker'));
  }

  async fire(upstream: any) {
    return this.breaker.fire(upstream);
  }
}
