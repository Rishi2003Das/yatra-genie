
import React from 'react';
import { Plane } from 'lucide-react';
import { ModeToggle } from './ModeToggle';

const Header = () => {
  return (
    <div className="relative flex items-center justify-between w-full py-4 px-6 md:px-10 bg-background border-b border-border">
      <div className="flex items-center gap-2">
        <Plane className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold text-foreground">Yatri Bandhu AI</h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground hidden md:block">by Om Tours</span>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
