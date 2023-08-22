import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events.module';
import { ConfigModule } from '@nestjs/config';
import broadcastConfig from './config/broadcast';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [broadcastConfig],
    }),
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
