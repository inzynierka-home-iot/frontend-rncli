import React, { FC, PropsWithChildren } from 'react';
import { Loading } from '../../.storybook/stories/Loading';

type LoadingWrapperProps = {
  isLoading: boolean;
};

export const LoadingWrapper: FC<PropsWithChildren<LoadingWrapperProps>> = ({
  isLoading,
  children,
}) => {
  if (isLoading) {
    return <Loading />;
  }

  return <>{children || null}</>;
};
