import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { WidgetButton } from './WidgetButton.jsx'
import { ChatPanel } from '../../shared/components/Chat/ChatPanel.jsx'
import { ChatFull } from '../../shared/components/Chat/ChatFull.jsx'
import { useChat } from '../../shared/hooks/useChat.js'

export default function Widget() {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const { messages, isResponding, sendMessage } = useChat({ persist: false })

  const cssVars = `
    :host {
      --bg-deep: #080c10;
      --bg-surface: #0d1520;
      --accent-teal: #00e5c4;
      --accent-warm: #f0c060;
      --text-primary: #e8f4f0;
      --text-muted: #4a7a70;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=DM+Mono:wght@300;400;500&display=swap');
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-thumb { background: rgba(0,229,196,0.2); border-radius: 2px; }
  `

  return (
    <>
      <style>{cssVars}</style>
      <WidgetButton isOpen={isOpen} onClick={() => setIsOpen((v) => !v)} />
      <AnimatePresence>
        {isOpen && (
          isMobile ? (
            <ChatFull
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              messages={messages}
              isResponding={isResponding}
              onSend={sendMessage}
            />
          ) : (
            <ChatPanel
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              messages={messages}
              isResponding={isResponding}
              onSend={sendMessage}
            />
          )
        )}
      </AnimatePresence>
    </>
  )
}
