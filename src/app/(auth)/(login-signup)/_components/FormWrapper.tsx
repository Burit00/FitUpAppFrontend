import React, { FC } from 'react';

type FormWrapperProps = {
  children: React.ReactNode;
  direction?: 'normal' | 'reverse';
};

export const FormWrapper: FC<FormWrapperProps> = ({ children, direction = 'normal' }: FormWrapperProps) => {
  const className = 'w-full max-w-[450px] lg:w-2/5 flex flex-col gap-2';

  return (
    <>
      {direction === 'normal' && <div className={className}> {children}</div>}
      <div className={'hidden lg:block w-full max-w-[450px] lg:w-2/5'}></div>
      {direction === 'reverse' && <div className={className}> {children}</div>}
    </>
  );
};
