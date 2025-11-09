/**
 * Main chat orchestration hook managing conversation state and AI interactions.
 * Handles message persistence, API calls, loading states, and error handling.
 * 
 * Features:
 * - Loads conversation from localStorage on mount
 * - Sends messages to AI API
 * - Manages loading and error states
 * - Persists messages to localStorage after each update
 * - Triggers AI response fetch for new conversations
 * 
 * @param {string} conversationId - Unique identifier for the conversation
 * @returns {Object} Chat state and methods
 * @returns {Message[]} return.messages - Array of conversation messages
 * @returns {boolean} return.isLoading - Whether AI is generating response
 * @returns {string | null} return.error - Error message if request failed
 * @returns {(content: string) => Promise<void>} return.sendMessage - Function to send new message
 */
