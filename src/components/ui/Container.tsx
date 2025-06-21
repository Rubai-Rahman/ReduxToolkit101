import type { ReactNode } from 'react';

type TContainerProps = {
  children: ReactNode;
};
const Container = ({ children }: TContainerProps) => {
  return (
    <div className="w-full mx-auto space-y-3 p-4 md:max-w-5xl h-screen">
      {children}
    </div>
  );
};

export default Container;
