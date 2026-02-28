import { Heart, Moon } from 'lucide-react';
import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      className="h-6 w-6"
      {...props}
    >
      <path fill="none" d="M0 0h256v256H0z" />
      <path
        fill="currentColor"
        d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Z"
        opacity=".2"
      />
      <path
        fill="currentColor"
        d="M211.53 155.53a88.13 88.13 0 0 1-119.06 44A88.13 88.13 0 0 1 48.47 80.47a88.13 88.13 0 0 1 119.06-44 88.13 88.13 0 0 1 44 119.06Z"
      />
    </svg>
  );
}

/* ---------- CHATBOT ICON (DO NOT REMOVE) ---------- */
export function KikiAvatar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Face */}
      <circle cx="50" cy="50" r="40" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2"/>

      {/* Eyes */}
      <circle cx="38" cy="45" r="4" fill="hsl(var(--foreground))" />
      <circle cx="62" cy="45" r="4" fill="hsl(var(--foreground))" />

      {/* Smile */}
      <path d="M 35 60 Q 50 75 65 60" stroke="hsl(var(--foreground))" strokeWidth="2" fill="none" strokeLinecap="round"/>

      {/* Blush */}
      <circle cx="30" cy="55" r="5" fill="hsl(var(--primary))" opacity="0.5"/>
      <circle cx="70" cy="55" r="5" fill="hsl(var(--primary))" opacity="0.5"/>
    </svg>
  );
}

/* ---------- USER PROFILE AVATAR ---------- */
export function KikiUserAvatar() {
  return (
    <div className="h-full w-full rounded-full bg-gradient-to-br from-pink-400 via-rose-400 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">
      LW
    </div>
  );
}

/* ================= USER AVATAR OPTIONS ================= */


export function Avatar1(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" {...props}>
      <circle cx="50" cy="50" r="40" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2"/>
      <circle cx="40" cy="45" r="4" fill="hsl(var(--foreground))"/>
      <circle cx="60" cy="45" r="4" fill="hsl(var(--foreground))"/>
      <path d="M35 60 Q50 70 65 60" stroke="hsl(var(--foreground))" strokeWidth="2" fill="none"/>
    </svg>
  );
}

export function Avatar2(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" {...props}>
      <circle cx="50" cy="50" r="40" fill="hsl(var(--secondary))"/>
      <circle cx="38" cy="48" r="3" fill="hsl(var(--foreground))"/>
      <circle cx="62" cy="48" r="3" fill="hsl(var(--foreground))"/>
      <path d="M40 65 L60 65" stroke="hsl(var(--foreground))" strokeWidth="2"/>
    </svg>
  );
}

export function Avatar3(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" {...props}>
      <circle cx="50" cy="50" r="40" fill="hsl(var(--accent))"/>
      <circle cx="40" cy="45" r="4" fill="hsl(var(--foreground))"/>
      <circle cx="60" cy="45" r="4" fill="hsl(var(--foreground))"/>
      <path d="M40 65 Q50 55 60 65" stroke="hsl(var(--foreground))" strokeWidth="2" fill="none"/>
    </svg>
  );
}