import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIOAdapter } from './redis.adapter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Add Redis adapter
  const configService = app.get(ConfigService);
  const redisIOAdapter = new RedisIOAdapter(app, configService);
  await redisIOAdapter.connectToRedis();

  app.useWebSocketAdapter(redisIOAdapter);

  await app.listen(3000);
}
bootstrap();
