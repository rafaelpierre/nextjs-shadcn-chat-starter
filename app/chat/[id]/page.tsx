/**
 * Chat conversation page displaying message history and AI responses.
 * Loads conversation from localStorage based on URL parameter [id].
 * Handles user input submission and displays streaming AI responses.
 * 
 * Features:
 * - Loads persisted conversation messages from localStorage
 * - Displays message bubbles with animations
 * - Shows typing indicator while AI is generating response
 * - Auto-scrolls to latest message
 * - Sticky input area at bottom
 * 
 * @returns {JSX.Element} Full-height chat interface with messages and input
 */