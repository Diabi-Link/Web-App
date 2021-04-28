import React from 'react';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { arrowLeft2 } from 'react-icons-kit/icomoon/arrowLeft2';

import { ReactComponent as Logo404 } from '../../assets/images/404.svg';
import Heading from '../../ui/Heading';
import Link from '../../ui/Link';

const Container = styled.main`
  width: 100vw;
  height: auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
  margin-top: 10.5rem;
`;

const StyledLogo404 = styled(Logo404)`
  height: 11rem;
  width: auto;
  margin-bottom: 1.8rem;
`;

const StyledHeading = styled(Heading)`
  margin-bottom: 2.14rem;
`;

const StyledIcon = styled(Icon)`
  margin-right: 0.3rem;
`;

const Page404 = (): JSX.Element => {
  return (
    <Container>
      <Wrapper>
        <StyledLogo404 />
        <StyledHeading level={1}>
          Il semblerait que vous vous soyez perdu !
        </StyledHeading>
        <Link to="/" linkStyle="primary" bold>
          <StyledIcon icon={arrowLeft2} size={20} />
          Revenir à l&apos;écran d&apos;accueil
        </Link>
      </Wrapper>
    </Container>
  );
};

export default Page404;
