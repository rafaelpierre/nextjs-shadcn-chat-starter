/**
 * Scrollable container component for displaying list of messages.
 * Handles auto-scrolling to bottom when new messages arrive.
 * Renders MessageBubble components and TypingIndicator when loading.
 * 
 * Features:
 * - Auto-scroll to latest message
 * - Smooth scrolling behavior
 * - Renders typing indicator during AI generation
 * - Maintains scroll position when resizing
 * 
 * @param {Object} props - Component props
 * @param {Message[]} props.messages - Array of message objects to display
 * @param {boolean} props.isLoading - Whether to show typing indicator
 * @returns {JSX.Element} Scrollable message list container
 */