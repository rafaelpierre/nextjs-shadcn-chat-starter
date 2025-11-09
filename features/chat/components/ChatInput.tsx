/**
 * Chat input component with textarea and submit button.
 * Handles user message input with auto-resize, Enter key submission,
 * and disabled state during AI response generation.
 * 
 * Features:
 * - Auto-resizing textarea
 * - Enter to submit (Shift+Enter for new line)
 * - Disabled during loading state
 * - Inline send button
 * 
 * @param {Object} props - Component props
 * @param {string} props.value - Current input value
 * @param {(value: string) => void} props.onChange - Callback when input changes
 * @param {() => void} props.onSubmit - Callback when form is submitted
 * @param {boolean} props.isLoading - Whether AI is currently generating response
 * @returns {JSX.Element} Textarea with submit button
 */