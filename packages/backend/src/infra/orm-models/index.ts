import { IMongooseClient } from '@demo/app-common';
import { IClientCredentialDocument, clientCredentialModelName, clientCredentialSchema } from './client-credential';
import { IChatRoomDocument, chatRoomModelName, chatRoomSchema } from './chat-room';
import { ITokenDocument, tokenModelName, tokenSchema } from './token';
import { IUserDocument, userSchema, usesrModelName } from './user';

export function load(client?: IMongooseClient): void {
	if (!client) {
		throw new Error('Mongo client is null, terminated....');
	}
	client.registerModel<IClientCredentialDocument>(clientCredentialModelName, clientCredentialSchema);
	client.registerModel<IChatRoomDocument>(chatRoomModelName, chatRoomSchema);
	client.registerModel<ITokenDocument>(tokenModelName, tokenSchema);
	client.registerModel<IUserDocument>(usesrModelName, userSchema);
}


export {
	IClientCredentialDocument,
	IChatRoomDocument,
	ITokenDocument,
};
