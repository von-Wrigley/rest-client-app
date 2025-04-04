"use client";

import { useTransition, useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import Image from "next/image";
import styles from "./index.module.scss";

type LocaleOption = {
  value: string;
  label: string;
  flagSrc: string;
};

type Props = Readonly<{
  defaultValue: string;
  children: readonly LocaleOption[];
}>;

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const current = children.find((item) => item.value === defaultValue);

  const handleChange = (value: string) => {
    setOpen(false);
    startTransition(() => {
      router.replace({ pathname }, { locale: value });
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.selectWrapper} ref={wrapperRef}>
      <button
        type="button"
        className={styles.selectButton}
        onClick={() => setOpen((prev) => !prev)}
        disabled={isPending}
      >
        <Image
          src={current?.flagSrc ?? "/flags/en.png"}
          alt={current?.label ?? "Language"}
          width={20}
          height={15}
        />
        <span>{current?.label}</span>
        <span className={styles.arrow} />
      </button>

      {open && (
        <ul className={styles.dropdown}>
          {children.map((item) => (
            <li
              key={item.value}
              className={styles.option}
              onClick={() => handleChange(item.value)}
            >
              <Image
                src={item.flagSrc}
                alt={item.label}
                width={20}
                height={15}
              />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
