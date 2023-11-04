import React, { PropsWithChildren, ReactNode } from 'react';
import { Loading } from '../../.storybook/stories/Loading';

type LoadingWrapperProps = (
  params: PropsWithChildren<{ isLoading: boolean }>,
) => ReactNode;

export const LoadingWrapper: LoadingWrapperProps = ({
  isLoading,
  children,
}): ReactNode => {
  if (isLoading) {
    return <Loading />;
  }

  return <>{children}</>;
};