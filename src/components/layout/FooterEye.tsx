import Image from "next/image";

/**
 * Decorative eye (Union.svg) anchored to the bottom-center of the page.
 * Sits 50 % inside / 50 % outside the viewport edge, behind the fixed footer.
 * Use only on pages that need it (works, contact).
 */
export default function FooterEye() {
  return (
    <div
      aria-hidden="true"
      className="
        hidden lg:block
        pointer-events-none
        fixed bottom-0 left-1/2
        -translate-x-1/2 translate-y-1/64
        z-10
        w-[clamp(280px,38.3vw,736px)]
      "
    >
      <Image
        src="/Union.svg"
        alt=""
        width={736}
        height={190}
        priority={false}
        className="w-full h-auto select-none"
      />
    </div>
  );
}
