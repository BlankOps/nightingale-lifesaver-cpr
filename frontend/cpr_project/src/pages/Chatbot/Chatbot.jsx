import React, { useEffect, useRef, useState } from 'react';
import "./chatbot.css";
import axios from "axios";

const Chatbot = () => {
	const [enableAnalytics, setEnableAnalytics] = useState(false);
	const [showAnalyticsPopup, setShowAnalyticsPopup] = useState(true);
	const [isConnected, setIsConnected] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [userMessageCount, setUserMessageCount] = useState(0);
	const [message, setMessage] = useState('');
	const [chatMessages, setChatMessages] = useState([]);
	const chatroomRef = useRef(null);
	const initialMessageSent = useRef(false);
	const DOMAIN = "http://localhost:5005";
	const URL = "/webhooks/rest/webhook";

	// Test connexion
	useEffect(() => {
		testConnection();
	}, []);

	const testConnection = async () => {
		try {
			const response = await axios.get(DOMAIN + '/');
			setIsConnected(true);
			console.log('Connected to the chatbot server');
		} catch (error) {
			setIsConnected(false);
			console.error('Failed to connect to chatbot server:', error);
		}
	};

	const sendMessage = async (message) => {
		if (!message.trim() || isLoading) return;

		setIsLoading(true);
		setUserMessageCount(userMessageCount + 1);
		const userMessage = { 
			sender: "You", 
			message, 
			analytics: enableAnalytics, 
			conv_position: userMessageCount 
		};

		try {
			setChatMessages(prevMessages => [...prevMessages, { sender: "You", text: message }]);
			setMessage('');

			const response = await axios.post(DOMAIN + URL, userMessage, {
				headers: {
					'Content-Type': 'application/json',
				},
			});

			for (const botMessage of response.data) {
				botMessage.text.split("\n\n").forEach(message => {
					if (!message.trim()) return;
					setChatMessages(prevMessages => [...prevMessages, { sender: "Chatbot", text: message }]);
				});

				if (botMessage.buttons) {
					setChatMessages((prevMessages) => [
						...prevMessages,
						{ sender: "Chatbot", buttons: botMessage.buttons },
					]);
				}
			}
		} catch (error) {
			console.error('Erreur lors de l\'envoi du message:', error);
			setChatMessages(prevMessages => [...prevMessages, { 
				sender: "System", 
				text: "Sorry, Connection problem. Please try again." 
			}]);
		} finally {
			setIsLoading(false);
		}
	};

	const prepareAndSendMessage = async () => {
		if (!message.trim() || isLoading) return;
		sendMessage(message);
	};

	const handleKeyPress = (event) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			prepareAndSendMessage();
		}
	};

	const handleButtonClick = (buttonMessage) => {
		sendMessage(buttonMessage);
	};

	useEffect(() => {
		if (chatroomRef.current) {
			chatroomRef.current.scrollTop = chatroomRef.current.scrollHeight;
		}
	}, [chatMessages, isLoading]);

	useEffect(() => {
		if (!initialMessageSent.current && isConnected) {
			sendMessage("Hello!");
			initialMessageSent.current = true;
		}
	}, [isConnected]);

	const handlePopupResponse = (response) => {
		setEnableAnalytics(response);
		setShowAnalyticsPopup(false);
	};

	const formatMessage = (text) => {
		return text
			.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
			.replace(/\n/g, '<br/>');
	};

	return (

		<div><div className="emergency-banner">
				<span className="emergency-text">
					🚨 EMERGENCY! 🚨 In case of a serious problem, call immediately by clicking here:
				</span>
				<a href="tel:112" className="emergency-number">112</a>
			</div>
		<div className='box'>
			{showAnalyticsPopup && (
				<div className='popup'>
					<div className='popup-content'>
						<h3>🔒 Privacy</h3>
						<p>
							<strong>Do you accept that we keep your conversation with the chatbot in our database 
							for purely analytical purposes and to improve the chatbot's responses? 
							Conversations are completely anonymous and cannot be linked to you in any way.
							</strong>
						</p>
						<div className="popup-buttons">
							<button onClick={() => handlePopupResponse(true)}>Yes</button>
							<button onClick={() => handlePopupResponse(false)}>No</button>
						</div>
					</div>
				</div>
			)}

			<div className='chatroom-wrapper'>
				<div className='chatroom-header'>
					<h3>
						🤖 Virtual Assistant
					</h3>
					<div className={`status ${isConnected ? 'connected' : 'disconnected'}`}>
						<span className="status-dot"></span>
						{isConnected ? 'Online' : 'Offline'}
					</div>
				</div>

				<div className='chatroom' ref={chatroomRef}>
					{chatMessages.length === 0 && !isLoading && (
						<div className="welcome-message">
							<h4>Welcome to Virtual Assistant!</h4>
							<p><strong>I can help you learn about:</strong></p>
							<div className="welcome-features">
								<div className="feature-item">
									<span className="feature-icon">❤️</span>
									<span>CPR procedures and techniques</span>
								</div>
								<div className="feature-item">
									<span className="feature-icon">⚠️</span>
									<span>Cardiac arrest symptoms</span>
								</div>
								<div className="feature-item">
									<span className="feature-icon">⚡</span>
									<span>AED (defibrillator) usage</span>
								</div>
							</div>
							<p><strong>Or ask me anything about CPR and emergency procedures!</strong></p>
						</div>
					)}

					{chatMessages.map((msg, index) => (
						<React.Fragment key={index}>
							{msg.text && (
								<div className={msg.sender === 'You' ? 'user-message' : msg.sender === 'System' ? 'system-message' : 'bot-message'}>
									<div 
										dangerouslySetInnerHTML={{ 
											__html: formatMessage(msg.text) 
										}}
									/>
								</div>
							)}

							{msg.buttons && (
								<div className='bot-message'>
									<div className='buttons-container'>
										{msg.buttons.map((button, idx) => (
											<button
												key={idx}
												className='chat-button'
												onClick={() => handleButtonClick(button.title)}
											>
												{button.title}
											</button>
										))}
									</div>
								</div>
							)}
						</React.Fragment>
					))}

					{isLoading && (
						<div className="typing-indicator">
							<div className="typing-dots">
								<span></span>
								<span></span>
								<span></span>
							</div>
						</div>
					)}
				</div>

				<div className='input-area'>
					<textarea
						type="text"
						className='message-input'
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						onKeyDown={handleKeyPress}
						placeholder="Ask your question about CPR..."
						disabled={isLoading || !isConnected}
						rows="1"
					/>
					<button 
						className='send-message-button' 
						onClick={prepareAndSendMessage}
						disabled={!message.trim() || isLoading || !isConnected}
					>
						{isLoading ? (
							<span className="icon-send-button">⏳</span>
						) : (
							<svg xmlns="http://www.w3.org/2000/svg" className='icon-send-button' width="1em" height="1em" viewBox="0 0 24 24">
								<path fill="currentColor" d="m3 3l3 9l-3 9l19-9Zm3 9h16"></path>
							</svg>
						)}
					</button>
				</div>
			</div>
		</div>
		</div>
	)
}

export default Chatbot