import { Header } from '@components/shared/Header';
import { StyledGlobalPageWrapper, StyledPageWrapper } from '@components/styled/base';
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_default')({
  component: RouteComponent,
})

function RouteComponent() {
  return(
    <>
      <Header />
      <StyledGlobalPageWrapper>
        <StyledPageWrapper>
          <Outlet />
        </StyledPageWrapper>
      </StyledGlobalPageWrapper>
    </>
  );
}
