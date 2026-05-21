import React, { useEffect, useState } from "react";
import { ShieldAlert } from "lucide-react";

export function ProtectionLayer({ children }: { children: React.ReactNode }) {
  const [devtoolsWarning, setDevtoolsWarning] = useState(false);

  useEffect(() => {
    // 1. Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextMenu);

    // 2. Block F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S, Ctrl+A
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i")) ||
        (e.ctrlKey && (e.key === "U" || e.key === "u")) ||
        (e.ctrlKey && (e.key === "S" || e.key === "s")) ||
        (e.ctrlKey && (e.key === "A" || e.key === "a"))
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    // 3. Detect devtools via size diff
    const detectDevTools = () => {
      const threshold = 160;
      const widthDiff = window.outerWidth - window.innerWidth > threshold;
      const heightDiff = window.outerHeight - window.innerHeight > threshold;
      if (widthDiff || heightDiff) {
        setDevtoolsWarning(true);
      } else {
        setDevtoolsWarning(false);
      }
    };
    window.addEventListener("resize", detectDevTools);
    // Initial check
    detectDevTools();

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", detectDevTools);
    };
  }, []);

  if (devtoolsWarning) {
    return (
      <div className="min-h-screen w-full bg-black flex items-center justify-center relative z-[99999]">
        <div className="text-center font-mono p-8 border border-red-500 bg-red-950/20 max-w-2xl">
          <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-red-500 mb-4">ОБНАРУЖЕНО ВМЕШАТЕЛЬСТВО</h1>
          <p className="text-red-400 text-lg">
            Доступ к инструментам разработчика запрещен политикой безопасности. Закройте консоль для продолжения.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
