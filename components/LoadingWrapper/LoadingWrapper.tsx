import { PropsWithChildren, ReactNode } from 'react';
import { Loading } from '../../.storybook/stories/Loading';

type LoadingWrapperProps = (
  params: PropsWithChildren<{ isLoading: boolean }>,
) => ReactNode;

export const LoadingWrapper: LoadingWrapperProps = ({
  isLoading,
  children,
}) => {
  if (isLoading) {
    return <Loading />;
  }

  return children;
};
