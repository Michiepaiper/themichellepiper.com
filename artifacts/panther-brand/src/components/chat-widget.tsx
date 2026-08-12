import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/__(.+?)__/g, "$1")
    .replace(/(^|\s)\*(\S[^*]*\S|\S)\*/g, "$1$2")
    .replace(/(^|\s)_(\S[^_]*\S|\S)_/g, "$1$2")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .trim();
}

type Msg = { role: "user" | "assistant"; content: string };

const apiBase = "/api";

const INITIAL_GREETING: Msg = {
  role: "assistant",
  content:
    "Welcome to The Michelle Piper. I can help with hiring remote talent, joining our talent community, or anything about how we work. What can I help you with?",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([INITIAL_GREETING]);
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setSending(true);
    try {
      const res = await fetch(`${apiBase}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          site: "recruitment",
          messages: next
            .filter((m) => m !== INITIAL_GREETING)
            .slice(-12),
        }),
      });
      const json = (await res.json()) as { reply?: string };
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: json.reply
            ? stripMarkdown(json.reply)
            : "I'm having trouble right now. Please use the contact form or book a consultation directly.",
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting. Please try again in a moment or use the contact form.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  };

  return (
    <>
      {/* Floating trigger */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 shadow-2xl hover:scale-105 transition-transform"
          style={{ background: "hsl(0 0% 4%)", border: "1px solid hsl(43 80% 54%)", color: "hsl(43 80% 54%)" }}
          aria-label="Chat with The Michelle Piper"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-xs font-serif tracking-widest uppercase">Ask Us</span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[380px] h-[540px] max-h-[80vh] flex flex-col shadow-2xl"
          style={{ background: "hsl(0 0% 6%)", border: "1px solid hsl(0 0% 14%)" }}
        >
          {/* Header */}
          <div
            className="px-5 py-4 flex items-center justify-between"
            style={{ background: "hsl(0 0% 4%)", borderBottom: "2px solid hsl(43 80% 54%)" }}
          >
            <div>
              <p className="font-serif font-bold tracking-wide" style={{ color: "hsl(0 0% 94%)" }}>
                The Michelle Piper
              </p>
              <p className="text-[10px] uppercase tracking-widest flex items-center gap-2" style={{ color: "hsl(43 80% 54%)" }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "hsl(142 72% 50%)" }} />
                Talent Advisor · Online
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ color: "hsl(0 0% 55%)" }}
              className="hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3"
            style={{ background: "hsl(0 0% 6%)" }}
          >
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[85%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap"
                  style={
                    m.role === "user"
                      ? {
                          background: "hsl(43 80% 54%)",
                          color: "hsl(0 0% 6%)",
                          borderRadius: "1rem 0 1rem 1rem",
                        }
                      : {
                          background: "hsl(0 0% 11%)",
                          color: "hsl(0 0% 88%)",
                          border: "1px solid hsl(0 0% 18%)",
                          borderRadius: "0 1rem 1rem 1rem",
                        }
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {sending && (
              <div className="flex justify-start">
                <div
                  className="px-4 py-3 text-sm"
                  style={{
                    background: "hsl(0 0% 11%)",
                    border: "1px solid hsl(0 0% 18%)",
                    borderRadius: "0 1rem 1rem 1rem",
                  }}
                >
                  <span className="inline-flex gap-1">
                    {[0, 120, 240].map((delay) => (
                      <span
                        key={delay}
                        className="w-1.5 h-1.5 rounded-full animate-bounce"
                        style={{ background: "hsl(43 80% 54%)", animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div
            className="p-3 flex gap-2"
            style={{ background: "hsl(0 0% 4%)", borderTop: "1px solid hsl(0 0% 14%)" }}
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Ask about hiring, talent, or our process…"
              disabled={sending}
              className="rounded-none text-sm"
              style={{
                background: "hsl(0 0% 10%)",
                border: "1px solid hsl(0 0% 20%)",
                color: "hsl(0 0% 90%)",
              }}
            />
            <Button
              onClick={() => void send()}
              disabled={sending || !input.trim()}
              className="rounded-none shrink-0"
              style={{ background: "hsl(43 80% 54%)", color: "hsl(0 0% 6%)" }}
              aria-label="Send"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
