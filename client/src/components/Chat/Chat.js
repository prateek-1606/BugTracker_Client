import React from 'react';
import { ChatEngine } from 'react-chat-engine';

export function Chat() {
	return (
		<ChatEngine
			height='100vh'
			userName='Prateek Varshney'
			userSecret='test123'
			projectID='ea57ee46-da6a-4903-85b1-79c299cf3806'
		/>
	);
}

export default Chat;