import React from 'react';
import { Loader2 } from 'lucide-react';

const SpiningLoader = ({ size }) => {
  return (
    <Loader2 className="animate-spin text-primary" size={size}  />
  );
};

export default SpiningLoader;