import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

const ROUTES = ["/", "/about", "/experience", "/skills", "/projects", "/services", "/contact"];
const COOLDOWN_MS = 1200;
const BOTTOM_THRESHOLD = 6; // px tolerance for "at bottom"
const WHEEL_THRESHOLD = 40; // accumulated delta needed to trigger

function isAtBottom() {
  return (
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - BOTTOM_THRESHOLD
  );
}

function isAtTop() {
  return window.scrollY <= BOTTOM_THRESHOLD;
}

export default function ScrollPageNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const coolingDown = useRef(false);
  const accumulated = useRef(0);
  const [hint, setHint] = useState<"down" | "up" | null>(null);
  const hintTimeout = useRef<ReturnType<typeof setTimeout>>();

  const currentIdx = ROUTES.indexOf(location.pathname);

  const showHint = (dir: "down" | "up") => {
    setHint(dir);
    clearTimeout(hintTimeout.current);
    hintTimeout.current = setTimeout(() => setHint(null), 900);
  };

  const tryNavigate = (dir: "next" | "prev") => {
    if (coolingDown.current) return;
    const target = dir === "next" ? currentIdx + 1 : currentIdx - 1;
    if (target < 0 || target >= ROUTES.length) return;
    coolingDown.current = true;
    accumulated.current = 0;
    navigate(ROUTES[target]);
    window.scrollTo({ top: dir === "next" ? 0 : document.body.scrollHeight, behavior: "instant" });
    setTimeout(() => { coolingDown.current = false; }, COOLDOWN_MS);
  };

  useEffect(() => {
    accumulated.current = 0;

    const onWheel = (e: WheelEvent) => {
      if (coolingDown.current) return;
      const dy = e.deltaY;

      if (dy > 0 && isAtBottom()) {
        accumulated.current += dy;
        if (accumulated.current > WHEEL_THRESHOLD) {
          if (currentIdx < ROUTES.length - 1) tryNavigate("next");
          else accumulated.current = 0;
        } else {
          showHint("down");
        }
      } else if (dy < 0 && isAtTop()) {
        accumulated.current += dy; // negative
        if (accumulated.current < -WHEEL_THRESHOLD) {
          if (currentIdx > 0) tryNavigate("prev");
          else accumulated.current = 0;
        } else {
          showHint("up");
        }
      } else {
        accumulated.current = 0;
      }
    };

    // Touch support
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      if (coolingDown.current) return;
      const dy = touchStartY - e.changedTouches[0].clientY; // positive = swipe up = scroll down
      if (dy > 60 && isAtBottom() && currentIdx < ROUTES.length - 1) tryNavigate("next");
      else if (dy < -60 && isAtTop() && currentIdx > 0) tryNavigate("prev");
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIdx]);

  // Don't render on pages not in the list (e.g. NotFound)
  if (currentIdx === -1) return null;

  const nextLabel = currentIdx < ROUTES.length - 1
    ? ROUTES[currentIdx + 1].replace("/", "") || "Home"
    : null;
  const prevLabel = currentIdx > 0
    ? ROUTES[currentIdx - 1].replace("/", "") || "Home"
    : null;

  return (
    <>
      {/* Bottom hint */}
      {hint === "down" && nextLabel && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex flex-col items-center gap-1 animate-fade-in">
          <div className="glass border border-white/15 rounded-full px-4 py-2 flex items-center gap-2 text-xs text-gray-300 shadow-xl">
            <ChevronDown size={14} className="text-blue-400 animate-bounce" />
            <span>Keep scrolling for <span className="text-white font-semibold capitalize">{nextLabel}</span></span>
          </div>
        </div>
      )}

      {/* Top hint */}
      {hint === "up" && prevLabel && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex flex-col items-center gap-1 animate-fade-in">
          <div className="glass border border-white/15 rounded-full px-4 py-2 flex items-center gap-2 text-xs text-gray-300 shadow-xl">
            <ChevronUp size={14} className="text-blue-400 animate-bounce" />
            <span>Keep scrolling for <span className="text-white font-semibold capitalize">{prevLabel}</span></span>
          </div>
        </div>
      )}
    </>
  );
}
