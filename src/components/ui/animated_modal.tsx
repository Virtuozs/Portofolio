import { AnimatePresence, motion } from "framer-motion";
import {
    type ReactNode,
    useEffect,
    useRef,
    useState,
} from "react";
import { mergeClass } from "../../libs/utils";
import { ScrollArea } from "./scroll_area";
import { FloatingDock } from "./floating_dock";
import type { Skill } from "../../data/projects";
import { ModalContext, useModal, useOutsideClick } from "../../hooks/useModal";

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false);

    return (
        <ModalContext.Provider value={{ open, setOpen }}>
        {children}
        </ModalContext.Provider>
    );
};

export function Modal({ children }: { children: ReactNode }) {
    return <ModalProvider>{children}</ModalProvider>;
}

export const ModalTrigger = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    const { setOpen } = useModal();
    return (
        <button
            className={mergeClass(
                "px-4 py-2 rounded-md text-primary text-center relative overflow-hidden",
                className
            )}
            onClick={() => setOpen(true)}
        >
        {children}
        </button>
    );
};

export const ModalBody = ({
  children,
  className,
  thumbnailUrl,
  Skills = [],
}: {
  children: ReactNode;
  className?: string;
  thumbnailUrl: string;
  Skills?: Skill[];
}) => {
  const { open, setOpen } = useModal();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [setOpen]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  useOutsideClick(modalRef, () => setOpen(false));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          className="fixed inset-0 z-50 flex h-full w-full items-center justify-center [perspective:800px] [transform-style:preserve-3d]"
        >
          <Overlay />
          <motion.div
            ref={modalRef}
            className={mergeClass(
              "md:rounded-2xl relative z-50 flex h-[90%] w-full max-w-[90%] md:max-w-[40%] flex-col overflow-hidden bg-background border",
              className
            )}
            initial={{ opacity: 0, scale: 0.5, rotateX: 40, y: 40 }}
            animate={{ opacity: 0.95, scale: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateX: 10 }}
            transition={{ type: "spring", stiffness: 260, damping: 15 }}
          >
            <CloseIcon />

            <div className="relative h-[40%] min-h-[200px] w-full">
              <img
                src={thumbnailUrl}
                alt="Project thumbnail"
                className="h-full w-full object-cover"
              />

              <div className="absolute left-5 bottom-5 space-y-1">
                {Skills.length > 0 && (
                  <FloatingDock items={Skills} />
                )}
              </div>
            </div>

            <ScrollArea className="flex-1 w-full">{children}</ScrollArea>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};



export const ModalContent = ({
    children,
    className,
    }: {
    children: ReactNode;
    className?: string;
    }) => {
    return (
        <div className={mergeClass("flex flex-col flex-1 p-3 md:p-10", className)}>
        {children}
        </div>
    );
    };

    export const ModalFooter = ({
    children,
    className,
    }: {
    children: ReactNode;
    className?: string;
    }) => {
    return (
        <div
        className={mergeClass(
            "flex justify-end p-4 bg-gray-100 dark:bg-neutral-900",
            className
        )}
        >
        {children}
        </div>
    );
    };

const Overlay = ({ className }: { className?: string }) => {
    const { setOpen } = useModal();
    return (
        <motion.div
        initial={{
            opacity: 0,
        }}
        animate={{
            opacity: 1,
            backdropFilter: "blur(10px)",
        }}
        exit={{
            opacity: 0,
            backdropFilter: "blur(0px)",
        }}
        className={`modal-overlay fixed inset-0 h-full w-full bg-background/60 bg-opacity- z-50 ${className}`}
        onClick={() => setOpen(false)}
        >

        </motion.div>
    );
};

const CloseIcon = () => {
    const { setOpen } = useModal();
    return (
        <button
        onClick={() => setOpen(false)}
        className="absolute top-4 right-4 group z-[9999]"
        >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-background h-4 w-4 group-hover:scale-125 group-hover:rotate-3 transition duration-200"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
        </svg>
        </button>
    );
};