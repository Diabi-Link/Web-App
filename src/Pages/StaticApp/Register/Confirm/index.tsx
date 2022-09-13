import React, { useContext } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Formik, Form, FormikProps } from 'formik';
import { arrowRight2 } from 'react-icons-kit/icomoon/arrowRight2';
import { send } from 'react-icons-kit/fa/send';

import { RegisterContext } from '../../../../contexts/RegisterContext';
import { useVerifEmail, useVerifEmailLink } from '../../../../api';

import { Heading } from '../../../../ui/Heading';
import Button from '../../../../ui/Button';
import Loader from '../../../../ui/Loader';

const Confirm = (): JSX.Element => {
  const { t } = useTranslation();
  const {
    state: { user },
  } = useContext(RegisterContext);

  const [verifEmail, { loading }] = useVerifEmail();
  const [verifEmailLink] = useVerifEmailLink();

  const handleSubmit = ({ code }: { code: string[] }) => {
    verifEmailLink({
      variables: {
        secretId: code.toString(),
      },
    });
  };

  return (
    <Container>
      <Heading level={1}>{t('Register.Confirm.Title')}</Heading>
      <Description>{t('Register.Confirm.Desc')}</Description>
      <Formik
        initialValues={{ code: ['', '', '', '', '', ''] }}
        // validationSchema={ValidatePasswordSchema}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<{ code: string[] }>) => (
          <Wrapper>
            <TileWrapper>
              {props.values.code.map((c, index) => (
                <CodeTile
                  name="code"
                  maxLength={1}
                  // && !props.values.code[index - 1]
                  // disabled={!!c}
                  value={c}
                  ref={(el) =>
                    !c && !!props.values.code[index - 1] && el?.focus()
                  }
                  // ref={(el) => !!props.values.code[0] && el?.focus()}
                  onChange={(e) => {
                    props.setFieldValue(
                      'code',
                      props.values.code.map((d, idx) =>
                        idx === index ? e.target.value : d,
                      ),
                    );
                  }}
                />
              ))}
            </TileWrapper>
            <ButtonWrapper>
              <StyledButton
                type="submit"
                label={t('Register.Confirm.Validate')}
                btnStyle="primary"
                shadow
                iconEnd={arrowRight2}
              />
              <StyledButton
                type="button"
                label={
                  loading ? (
                    <Loader loaderStyle="white" />
                  ) : (
                    t('Register.Confirm.ResendButton')
                  )
                }
                btnStyle="primary"
                outlined
                shadow
                iconEnd={send}
                disabled={loading}
                onClick={() =>
                  verifEmail({
                    variables: { email: user.email },
                  })
                }
              />
            </ButtonWrapper>
          </Wrapper>
        )}
      </Formik>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 4rem 0;

  @media (min-width: 1500px) {
    width: 80%;
    margin: 3rem 0;
  }
`;

const Description = styled.div`
  text-align: justify;
  font-size: 17px;
  font-weight: 400;
  margin: 3rem 3.5rem 0 0;

  @media (min-width: 1500px) {
    font-size: 18px;
  }
`;

const Wrapper = styled(Form)`
  width: 100%;
  flex: 1;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const StyledButton = styled(Button)`
  width: 200px;
  height: 40px;
  margin: 10px auto;
`;

const TileWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const CodeTile = styled.input`
  width: 30px;
  height: 50px;
  border: 1px solid black;
  border-radius: 10px;
  background-color: white;
  margin: 30px 10px;
  text-align: center;
  font-size: 17px;
  font-weight: 700;
  color: ${(props) => props.theme.main.dark};
`;

export default Confirm;
