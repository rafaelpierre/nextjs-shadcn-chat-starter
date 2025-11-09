/**
 * localStorage abstraction layer for chat persistence.
 * Provides type-safe methods for storing and retrieving conversations.
 * 
 * Features:
 * - Conversation-specific key prefixing
 * - JSON serialization/deserialization
 * - Error handling for quota exceeded and parse errors
 * - List all conversations functionality
 * 
 * Functions:
 * - saveConversation: Persists conversation messages to localStorage
 * - getConversation: Retrieves conversation messages from localStorage
 * - listConversations: Returns array of all conversation IDs
 * - deleteConversation: Removes conversation from localStorage
 */
