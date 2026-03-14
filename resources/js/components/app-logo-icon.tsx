import type { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap">      
        <path d="M22 10L12 5 2 10l10 5 10-5z"/>
      <path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/>
    </svg>
    );
}
