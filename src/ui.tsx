import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import type { Vegetable } from "./data";

export function VegetableArt({
  vegetable,
  className = "",
}: {
  vegetable: Vegetable;
  className?: string;
}) {
  // Individual bounds keep neighboring paintings out of each illustration.
  const crops = [
    [22, 35, 356, 304],
    [403, 12, 350, 360],
    [800, 13, 339, 334],
    [1148, 34, 380, 311],
    [29, 367, 351, 277],
    [410, 376, 335, 265],
    [782, 358, 376, 290],
    [1162, 349, 361, 311],
    [23, 649, 357, 354],
    [400, 646, 368, 368],
    [811, 650, 298, 354],
    [1143, 650, 381, 374],
  ];
  const [x, y, width, height] = crops[vegetable.sprite];
  const ratio = width / height;
  return (
    <div
      aria-hidden="true"
      className={`relative aspect-[9/8] w-full mix-blend-darken ${className}`}
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-no-repeat"
        style={{
          width: `${Math.min(1, ratio / (9 / 8)) * 96}%`,
          height: `${Math.min(1, 9 / 8 / ratio) * 96}%`,
          clipPath:
            vegetable.id === "pastanaga"
              ? "polygon(0 0, 100% 0, 100% 88%, 60% 88%, 60% 100%, 0 100%)"
              : vegetable.id === "rave"
                ? "polygon(0 0, 38% 0, 38% 5%, 63% 5%, 63% 0, 100% 0, 100% 100%, 0 100%)"
                : undefined,
          backgroundImage: "url(/images/hortalisses.webp)",
          backgroundSize: `${(1536 / width) * 100}% ${(1024 / height) * 100}%`,
          backgroundPosition: `${(x / (1536 - width)) * 100}% ${(y / (1024 - height)) * 100}%`,
        }}
      />
    </div>
  );
}

export function Modal({
  title,
  children,
  onClose,
  wide = false,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  wide?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const element = dialog.current;
    const previous = document.activeElement as HTMLElement | null;
    element?.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = old;
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      onCancel={(e) => {
        e.preventDefault();
        closeRef.current();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          const r = e.currentTarget.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            closeRef.current();
        }
      }}
      aria-labelledby="dialog-title"
      className={`fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] overflow-y-auto rounded-[28px] border border-ink/10 bg-paper p-6 text-ink shadow-2xl backdrop:bg-[#273e32]/50 sm:p-9 ${wide ? "max-w-4xl" : "max-w-xl"}`}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <h2 id="dialog-title" className="font-hand text-3xl sm:text-4xl">
          {title}
        </h2>
        <button
          autoFocus
          onClick={onClose}
          aria-label="Tanca"
          className="flex size-11 shrink-0 items-center justify-center rounded-full border border-ink/20 hover:bg-ink/10"
        >
          <X size={22} />
        </button>
      </div>
      {children}
    </dialog>
  );
}

export const primaryButton =
  "inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-leaf px-7 py-3 font-extrabold text-paper transition-colors hover:bg-[#294b33] disabled:bg-leaf/60";
