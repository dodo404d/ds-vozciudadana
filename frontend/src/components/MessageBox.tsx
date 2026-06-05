import type { ReactNode } from 'react';

interface MessageBoxProps {
  type?: 'success' | 'error' | 'info';
  children: ReactNode;
}

export function MessageBox({ type = 'info', children }: MessageBoxProps) {
  return <div className={`message-box ${type}`}>{children}</div>;
}
