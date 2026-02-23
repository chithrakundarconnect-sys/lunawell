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


export function KikiAvatar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      {...props}
    >
      <g>
        {/* Face */}
        <circle cx="50" cy="50" r="40" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" />
        
        {/* Eyes */}
        <circle cx="38" cy="45" r="4" fill="hsl(var(--foreground))" />
        <circle cx="62" cy="45" r="4" fill="hsl(var(--foreground))" />
        
        {/* Smile */}
        <path d="M 40 60 Q 50 70 60 60" stroke="hsl(var(--foreground))" strokeWidth="2" fill="none" strokeLinecap="round" />
        
        {/* Blush */}
        <circle cx="30" cy="55" r="5" fill="hsl(var(--primary))" opacity="0.6" />
        <circle cx="70"cy="55" r="5" fill="hsl(var(--primary))" opacity="0.6" />

        {/* Flower */}
        <g transform="translate(68, 25) rotate(20)">
            <circle cx="0" cy="0" r="5" fill="white"/>
            <path d="M0,0 L-4,-4 L0,-8 L4,-4 Z" fill="hsl(var(--primary))" />
            <path d="M0,0 L4,-4 L8,0 L4,4 Z" fill="hsl(var(--primary))" />
            <path d="M0,0 L4,4 L0,8 L-4,4 Z" fill="hsl(var(--primary))" />
            <path d="M0,0 L-4,4 L-8,0 L-4,-4 Z" fill="hsl(var(--primary))" />
        </g>
      </g>
    </svg>
  )
}

export function Avatar1(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g>
        <circle cx="50" cy="50" r="40" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" />
        <path d="M 35 42 C 40 35, 60 35, 65 42" stroke="hsl(var(--foreground))" strokeWidth="2" fill="none" />
        <circle cx="50" cy="60" r="5" fill="hsl(var(--foreground))" />
        <path d="M 40 70 A 10 10 0 0 0 60 70" stroke="hsl(var(--foreground))" strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
}

export function Avatar2(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g>
        <circle cx="50" cy="50" r="40" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" />
        <circle cx="38" cy="45" r="3" fill="hsl(var(--foreground))" />
        <circle cx="62" cy="45" r="3" fill="hsl(var(--foreground))" />
        <path d="M 45 65 L 55 65" stroke="hsl(var(--foreground))" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 20 25 A 30 30 0 0 1 50 20 A 30 30 0 0 1 80 25" stroke="hsl(var(--foreground))" strokeWidth="2" fill="none"/>
      </g>
    </svg>
  );
}

export function Avatar3(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g>
        <circle cx="50" cy="50" r="40" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" />
        <path d="M 35 48 L 45 40 L 35 32" stroke="hsl(var(--foreground))" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 65 48 L 55 40 L 65 32" stroke="hsl(var(--foreground))" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 40 65 Q 50 55 60 65" stroke="hsl(var(--foreground))" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function UserAvatar1(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g>
        <circle cx="50" cy="50" r="40" fill="hsl(var(--secondary))" />
        <path d="M 50 80 C 60 90, 70 90, 80 80 L 80 90 L 20 90 L 20 80 C 30 90, 40 90, 50 80" fill="hsl(var(--primary))" />
        <circle cx="40" cy="50" r="5" fill="hsl(var(--foreground))" />
        <circle cx="60" cy="50" r="5" fill="hsl(var(--foreground))" />
        <path d="M 45 65 Q 50 70, 55 65" stroke="hsl(var(--foreground))" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function UserAvatar2(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g>
        <circle cx="50" cy="50" r="40" fill="hsl(var(--accent))" />
        <path d="M 20 60 C 20 40, 80 40, 80 60" stroke="hsl(var(--primary))" strokeWidth="4" fill="none"/>
        <circle cx="38" cy="55" r="4" fill="hsl(var(--foreground))" />
        <circle cx="62" cy="55" r="4" fill="hsl(var(--foreground))" />
        <path d="M 40 70 L 60 70" stroke="hsl(var(--foreground))" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}


export function UserAvatar3(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g>
        <circle cx="50" cy="50" r="40" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2" />
        <path d="M 30 30 C 40 20, 60 20, 70 30" stroke="hsl(var(--primary))" strokeWidth="4" fill="none" />
        <path d="M 30 30 C 20 40, 20 60, 30 70" stroke="hsl(var(--primary))" strokeWidth="4" fill="none" />
        <path d="M 70 30 C 80 40, 80 60, 70 70" stroke="hsl(var(--primary))" strokeWidth="4" fill="none" />
        <path d="M 40 45 L 45 50 L 40 55" stroke="hsl(var(--foreground))" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 60 45 L 55 50 L 60 55" stroke="hsl(var(--foreground))" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 45 65 Q 50 60, 55 65" stroke="hsl(var(--foreground))" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function UserAvatar4(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g>
        <circle cx="50" cy="50" r="40" fill="hsl(var(--secondary))" />
        <path d="M 50 10 C 20 40, 20 70, 50 90" stroke="hsl(var(--primary))" strokeWidth="4" fill="none" />
        <path d="M 50 10 C 80 40, 80 70, 50 90" stroke="hsl(var(--primary))" strokeWidth="4" fill="none" />
        <circle cx="42" cy="50" r="3" fill="hsl(var(--foreground))" />
        <circle cx="58" cy="50" r="3" fill="hsl(var(--foreground))" />
        <path d="M 45 65 C 50 70, 50 70, 55 65" stroke="hsl(var(--foreground))" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function UserAvatar5(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g>
        <circle cx="50" cy="50" r="40" fill="hsl(var(--accent))" />
        <circle cx="50" cy="50" r="30" fill="hsl(var(--card))" />
        <path d="M 50 30 C 40 20, 60 20, 50 30" stroke="hsl(var(--primary))" fill="hsl(var(--primary))"/>
        <path d="M 70 50 C 80 40, 80 60, 70 50" stroke="hsl(var(--primary))" fill="hsl(var(--primary))"/>
        <path d="M 30 50 C 20 40, 20 60, 30 50" stroke="hsl(var(--primary))" fill="hsl(var(--primary))"/>
        <path d="M 50 70 C 40 80, 60 80, 50 70" stroke="hsl(var(--primary))" fill="hsl(var(--primary))"/>
        <circle cx="42" cy="50" r="4" fill="hsl(var(--foreground))" />
        <circle cx="58" cy="50" r="4" fill="hsl(var(--foreground))" />
        <path d="M 45 60 Q 50 65, 55 60" stroke="hsl(var(--foreground))" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}
