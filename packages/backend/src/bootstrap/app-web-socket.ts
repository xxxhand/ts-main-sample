import { Server as SocketServer } from 'socket.io';
import { Server as HttpServer } from 'http';
import { TNullable, LOGGER, defaultContainer } from '@demo/app-common';
import { InjectorCodes } from '../domain/enums/injector-codes';
import { AbstractSocketHandler } from '../application/workflows/abstract-socket-handler';

export class AppWebSocket {
  private _namespaces: Set<string> = new Set();
  private _server: TNullable<SocketServer> = null;

  useHttpServer = (httpServer: HttpServer): AppWebSocket => {
    this._server = new SocketServer(httpServer);
    return this;
  }

  registerNamespace = (handler: AbstractSocketHandler): void => {
    LOGGER.info(`Load namespace ${handler.path}`);
    if (!this._server) {
      throw new Error(`Socket server not initlized...`);
    }
    if (this._namespaces.has(handler.path)) {
      throw new Error(`Duplicated namespace ${handler.path}`);
    }
    
    this._server
      .of(handler.path)
      .use(handler.onAuthorize)
      .on('connection', handler.onConnection);
  }

  loadNamespaces = (): AppWebSocket => {
    const chatRoom = defaultContainer.getNamed<AbstractSocketHandler>(InjectorCodes.ABS_SOCKET_HANDLER, InjectorCodes.CHAT_ROOM_HANDLER);
    this.registerNamespace(chatRoom);

    return this;
  }

  close = (): void => {
    LOGGER.info('Close socket server...');
    this._server?.close();
  }
}