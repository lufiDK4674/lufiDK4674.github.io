import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export function useRouteScroll() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const scrollPositions = useRef(new Map<string, number>());
  // Address-bar hash navigation may reuse React Router's "default" key.
  // Include the path so one route cannot inherit another route's position.
  const positionKey = `${location.pathname}:${location.key}`;
  const activeLocationKey = useRef(positionKey);
  const previousLocation = useRef(location);
  const initialLocation = useRef(true);

  useEffect(() => {
    // Record while the old document still exists. Reading scrollY after a route
    // replaces it with a shorter page can capture the browser's clamped value.
    const rememberScroll = () =>
      scrollPositions.current.set(activeLocationKey.current, window.scrollY);
    window.addEventListener("scroll", rememberScroll, { passive: true });
    return () => window.removeEventListener("scroll", rememberScroll);
  }, []);

  useLayoutEffect(() => {
    if (initialLocation.current) {
      initialLocation.current = false;
      previousLocation.current = location;
      return;
    }
    const previous = previousLocation.current;
    activeLocationKey.current = positionKey;
    if (navigationType === "POP")
      window.scrollTo(0, scrollPositions.current.get(positionKey) ?? 0);
    else window.scrollTo(0, 0);
    if (previous.pathname !== location.pathname) {
      document.getElementById("main-content")?.focus({ preventScroll: true });
    }
    previousLocation.current = location;
  }, [location, navigationType, positionKey]);
}
