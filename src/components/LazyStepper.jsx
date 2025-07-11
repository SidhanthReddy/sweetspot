import { useRef, useEffect, useState } from "react";
import VerticalProgressStepper from "./VerticalProgressStepper";

export default function LazyStepper() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {active && <VerticalProgressStepper />}
    </div>
  );
}
