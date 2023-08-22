import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisIOAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;

  constructor(app, private readonly configService: ConfigService) {
    super(app);
  }

  async connectToRedis(): Promise<void> {
    const driver = this.configService.get<string>('broadcast.driver');
    const redisHost = this.configService.get<string>('broadcast.redisHost');
    const redisPort = this.configService.get<string>('broadcast.redisPort');
    const redisPassword = this.configService.get<string>('broadcast.redisPassword');

    const url = `${driver}://${redisHost}:${redisPort}`;

    // Creating a Redis client
    const pubClient = createClient({
      url,
      password: redisPassword,
    });

    // Create a duplicate Redis client from the `pubClient`client
    const subClient = pubClient.duplicate();
    // awaiting the resolution of both `pubClient.connect()` and `subClient.connect()
    await Promise.all([pubClient.connect(), subClient.connect()]);
    // Create an instance of the Redis adapter
    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  /**
   * Create an IO server using the specified port and options.
   * @param {number} port
   * @param {ServerOptions} [options]
   * @returns the created server object
   */
  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);
    return server;
  }
}
