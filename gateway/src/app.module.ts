import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule } from '@nestjs/throttler';
import { BreakerService } from './service/breaker.service';
import config from './config';
import { HttpProxyMiddleWare } from './middleware/http-proxy-middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [...config],
      isGlobal: true,
    }),
    // CacheModule.registerAsync({
    //   inject: [ConfigService],
    //   useFactory(config: ConfigService) {
    //     const cacheConfig = config.get('cacheConfig');
    //     console.log(JSON.stringify(cacheConfig), '111111');
    //     return cacheConfig;
    //   },
    // }),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ...config.get('throttlerConfig'),
      }),
    }),
  ],

  controllers: [AppController],
  providers: [AppService, BreakerService, ConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpProxyMiddleWare).forRoutes('*');
  }
}
