import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  clients: Socket[] = [];

  handleConnection(client: Socket, ...args: any[]) {
    this.clients.push(client);
    console.log('Client connected: ');
  }

  handleDisconnect(client: Socket) {
    this.clients = this.clients.filter((c) => c !== client);
    console.log('Client disconnected: ', client.id);

    this.server.emit('cursorRemoved', client.id);
  }

  @SubscribeMessage('mouseMove')
  handleMousePosition(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: object,
  ): void {
    // Get the client id
    const clientId = client.id;

    // Broadcast the mouse position to the clients
    client.broadcast.emit('mousePosition', { ...data, id: clientId });
  }
  // modeler update
  @SubscribeMessage('modelerUpdate')
  handleModelerUpdate(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: object,
  ): void {
    // Get the client id
    const clientId = client.id;
    // Broadcast the mouse position to the clients
    client.broadcast.emit('modelerUpdateClient', {
      xml: data,
      id: clientId,
    });
  }
}