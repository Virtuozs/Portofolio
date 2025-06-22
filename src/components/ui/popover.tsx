import React, { useRef, useState, useEffect } from "react";

interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

export default function Popover({
  trigger,
  children,
  className,
  onClose,
}: PopoverProps) {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setOpen(false);
        onClose?.();
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, open]);

  return (
    <div className="relative inline-block" ref={popoverRef}>
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <div
          className={`absolute left-0 right-10 mx-auto top-full mt-2 z-50 rounded-md border shadow-lg p-4 ${className}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
