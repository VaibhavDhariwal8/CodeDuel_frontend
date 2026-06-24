import { useState } from "react";
import { MessageCircle, X, ArrowLeft } from "lucide-react";
import { useEscToClose } from "../lib/useEscToClose";

const TOPICS = [
  {
    id: "start",
    label: "Getting started",
    answer:
      "Hit Quick Match, or generate a Custom Duel link from your Dashboard to challenge someone directly.",
  },
  {
    id: "duel",
    label: "How a duel works",
    answer:
      "You and your opponent get the exact same problem and a synced countdown timer. Use Run to test against sample cases anytime — Submit grades against the full hidden test suite.",
  },
  {
    id: "win",
    label: "How winning works",
    answer:
      "First to pass every hidden test wins. If time runs out, whoever passed more tests wins. Equal scores at time-out is a draw.",
  },
  {
    id: "rating",
    label: "Ratings & ranks",
    answer:
      "Every duel adjusts your rating with an Elo-style system, scaled by your opponent's strength. Climb the tiers from Bronze up to Grandmaster.",
  },
  {
    id: "coach",
    label: "What is AI Coach?",
    answer:
      "After any match, open the AI Coach tab on your Result screen for a personalized breakdown of your approach — it guides you with hints, it never just hands you the corrected code.",
  },
];

export default function WalkthroughWidget() {
  const [open, setOpen] = useState(false);
  const [activeTopic, setActiveTopic] = useState(null);
  useEscToClose(open, () => setOpen(false));

  function close() {
    setOpen(false);
    setActiveTopic(null);
  }
  const topic = TOPICS.find((t) => t.id === activeTopic);

  return (
    <>
      {open && (
        <div className="fixed bottom-40 right-6 w-80 max-h-96 bg-base-900 border border-base-700 rounded-lg shadow-xl z-40 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-base-700 shrink-0">
            <p className="font-display font-semibold text-sm">How it works</p>
            <button onClick={close} className="text-ink-400 hover:text-ink-100">
              <X size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto slim-scroll p-3 flex flex-col gap-2">
            {!topic ? (
              <>
                <div className="bg-base-800 rounded-lg px-3 py-2 text-sm self-start max-w-[90%]">
                  👋 New here? Pick a topic below.
                </div>
                {TOPICS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTopic(t.id)}
                    className="self-start border border-brand-500/40 text-brand-400 hover:bg-brand-500/10 rounded-full px-3 py-1.5 text-xs transition-colors text-left"
                  >
                    {t.label}
                  </button>
                ))}
              </>
            ) : (
              <>
                <div className="bg-brand-500/15 border border-brand-500/30 rounded-lg px-3 py-2 text-sm self-end max-w-[85%]">
                  {topic.label}
                </div>
                <div className="bg-base-800 rounded-lg px-3 py-2 text-sm self-start max-w-[90%]">
                  {topic.answer}
                </div>
                <button
                  onClick={() => setActiveTopic(null)}
                  className="self-start flex items-center gap-1 text-xs text-ink-400 hover:text-ink-100 mt-1"
                >
                  <ArrowLeft size={12} /> Back to topics
                </button>
              </>
            )}
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-24 right-6 w-12 h-12 rounded-full bg-brand-500 hover:bg-brand-400 flex items-center justify-center shadow-lg z-40 transition-colors"
      >
        <MessageCircle size={20} className="text-base-950" />
      </button>
    </>
  );
}
