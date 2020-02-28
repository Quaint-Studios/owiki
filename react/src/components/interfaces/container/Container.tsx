import React from 'react';

import './Container.scss';

export default function Container({ className = '', children }: IContainer) {
  return <div className={`container ${className}`}>{children}</div>;
}

interface IContainer {
  children: any;
  className?: string;
}
