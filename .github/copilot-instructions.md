Tailwindcss

app/page.tsx
<main className=”flex flex-col min-h-screen items-center justify-center”>
app/chat/[id]/page.tsx
<main className="flex flex-col min-h-screen">

Architecture & Folder Structure
src/
├── app/                           # NextJS routes
│   ├── page.tsx                   # Homepage
│   └── chat/[id]/
│       ├── _components/           # Private route components
│       └── page.tsx               # Chat page
├── features/
│   └── chat/
│       ├── components/            # Feature-specific UI
│       ├── hooks/                 # useChat, useChatMessages
│       ├── api/                   # chatApi.ts, types.ts
│       ├── lib/                   # storage.ts, conversation.ts
│       └── index.ts               # Public API exports
├── components/ui/                 # Shared UI (shadcn)
├── hooks/                         # Global hooks
└── lib/                          # Utils, constants

Key Principles:
Feature-based organization - group by domain, not type​
Unidirectional dependencies - features can't import other features​
Public APIs - use index.ts barrel exports to control what's exposed​
💾 State Management
Pattern
Use When
Avoid When
useState
Simple append-only messages
Multiple related state updates
useReducer
Complex operations (streaming, errors)
Simple state ​
useRef
DOM refs, non-visual data
Data that affects UI ​
useContext
Cross-route state, 3+ level props
Single route, shallow props ​



localStorage Persistence Pattern
// Initialize from localStorage (lazy init)
const [messages, setMessages] = useState<Message[]>(() => {
  if (typeof window === 'undefined') return []; // SSR check
  const stored = localStorage.getItem('chat-messages');
  return stored ? JSON.parse(stored) : [];
});

// Sync on change
useEffect(() => {
  localStorage.setItem('chat-messages', JSON.stringify(messages));
}, [messages]);

Best Practice: Create usePersistedState hook for reusability​
🎯 Separation of Concerns
Custom Hook Pattern
// features/chat/hooks/useChat.ts
export function useChat(conversationId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const sendMessage = async (content: string) => {
    // Business logic here
  };
  
  return { messages, isLoading, sendMessage };
}
Benefits: Testable logic, reusable, keeps components pure​
API Abstraction Layer
// features/chat/api/chatApi.ts
export const chatApi = {
  sendMessage: async (id: string, content: string) => {
    const response = await apiClient.post('/api/chat', { id, content });
    return transformResponse(response.data);
  },
};
Benefits: Single source of truth, easy mocking, centralized error handling​

Storage Abstraction
// features/chat/lib/storage.ts
export const chatStorage = {
  saveConversation: (id: string, msgs: Message[]) => {
    localStorage.setItem(`conversation-${id}`, JSON.stringify(msgs));
  },
  getConversation: (id: string): Message[] | null => {
    const data = localStorage.getItem(`conversation-${id}`);
    return data ? JSON.parse(data) : null;
  },
};
Benefits: Easy to swap implementations, type-safe, testable​
🐛 Preventing UX Bugs
1. Hydration Mismatch (Blinking)
// Fix localStorage SSR issue
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
  const stored = localStorage.getItem('messages');
  if (stored) setMessages(JSON.parse(stored));
}, []);

if (!mounted) return <ChatSkeleton />; // Prevents flash

Best Practice: Use Suspense + loading states​
2. Unnecessary Re-renders
// Memoize message components
export const MessageBubble = memo(({ message }) => (
  <div>{message.content}</div>
), (prev, next) => prev.message.id === next.message.id);

// Use stable keys
{messages.map((msg) => (
  <MessageBubble key={msg.id} message={msg} /> // Good
  // NOT key={index} - causes re-renders
))}

Rule: React.memo for lists, stable IDs for keys​
3. Animation Flickering
// Use useLayoutEffect for layout calculations
useLayoutEffect(() => {
  scrollToBottom(); // Blocks paint, no flicker
}, [messages]);

// CSS optimization
.message-bubble {
  will-change: transform, opacity;
}

Warning: Only use useLayoutEffect for critical layout changes​
4. Context Re-render Optimization
// Split contexts to prevent unnecessary re-renders
const ChatMessagesContext = createContext<Message[]>([]);
const ChatLoadingContext = createContext<boolean>(false);

// Components only subscribe to what they need
const messages = useContext(ChatMessagesContext); // Won't re-render on loading change

Rule: One value per context for fine-grained subscriptions​
✅ Testing Checklist
 Hard refresh multiple times - check for flashing​
 Throttle to slow 3G - verify loading states​
 React DevTools Profiler - identify wasteful re-renders​
 Lighthouse - check CLS (Cumulative Layout Shift)​
 Test with empty localStorage - ensure no errors​
 Animation timing - no overlapping animations​
🚀 Staff Engineer Signals
Feature-based architecture - shows domain-driven design thinking​
Abstraction layers - API, storage separated from UI​
Custom hooks - business logic extracted and testable​
Public APIs - intentional interface design via barrel exports​
Dependency rules - clear boundaries, no circular deps​
Performance optimization - memo, stable keys, layout effects​​
Type safety - TypeScript throughout, no any​

📝 Quick Wins
// 1. Lazy initialization for localStorage
const [state, setState] = useState(() => expensiveInit());

// 2. Batch state updates with useReducer
dispatch({ type: 'SEND_MESSAGE', payload: { msg, isLoading: true } });

// 3. Skeleton states always
if (!mounted) return <Skeleton />;

// 4. NextJS SSR checks
if (typeof window === 'undefined') return [];

// 5. Fixed dimensions for inputs
<div className="fixed bottom-0 h-24">

Golden Rule: Start simple, measure performance, optimize specific bottlenecks
