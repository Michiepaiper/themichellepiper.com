import { useEffect, useRef, useState } from "react";

function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/__(.+?)__/g, "$1")
    .replace(/(^|\s)\*(\S[^*]*\S|\S)\*/g, "$1$2")
    .replace(/(^|\s)_(\S[^_]*\S|\S)_/g, "$1$2")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "• ")
    .replace(/^\s*\d+\.\s+/gm, "")
    .trim();
}
import { MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Msg = { role: "user" | "assistant"; content: string };

const apiBase = `${import.meta.env.BASE_URL.replace(/\/$/, "")}/api`;

const INITIAL_GREETING: Msg = {
  role: "assistant",
  content:
    "Hi, I'm Michelle's Assistant. Ask me about her trainings, prices, services, or how to enrol — I'm here 24/7.",
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
          messages: next.filter((m) => m !== INITIAL_GREETING || next.length > 1).slice(-12),
        }),
      });
      const json = (await res.json()) as { reply?: string };
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: json.reply
            ? stripMarkdown(json.reply)
            : "Sorry, I'm having trouble right now. Please reach Michelle directly on WhatsApp.",
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting. Please try again in a moment, or message Michelle on WhatsApp.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-24 z-50 bg-primary text-primary-foreground p-4 rounded-full shadow-xl hover:scale-110 transition-transform flex items-center gap-2 pl-5 pr-5"
          aria-label="Chat with Michelle's Assistant"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="hidden sm:inline text-xs font-serif tracking-widest uppercase">Ask Me</span>
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[380px] h-[560px] max-h-[80vh] bg-background border border-border shadow-2xl flex flex-col">
          <div className="bg-foreground text-white px-5 py-4 flex items-center justify-between border-b-2 border-primary">
            <div>
              <p className="font-serif font-bold tracking-wide text-cream">Michelle's Assistant</p>
              <p className="text-[10px] uppercase tracking-widest text-primary flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Online · Replies instantly
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-l-2xl rounded-tr-2xl"
                      : "bg-background border border-border rounded-r-2xl rounded-tl-2xl"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start">
                <div className="bg-background border border-border px-4 py-2.5 rounded-r-2xl rounded-tl-2xl text-sm">
                  <span className="inline-flex gap-1">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "120ms" }} />
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "240ms" }} />
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-border bg-background p-3 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Ask about prices, courses, schedule…"
              disabled={sending}
              className="rounded-none border-border focus-visible:ring-primary"
            />
            <Button
              onClick={send}
              disabled={sending || !input.trim()}
              className="rounded-none bg-primary text-primary-foreground hover:bg-foreground"
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
