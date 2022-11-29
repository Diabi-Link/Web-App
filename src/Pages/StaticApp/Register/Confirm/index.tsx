import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Formik, Form, FormikProps } from 'formik';
import { arrowRight2 } from 'react-icons-kit/icomoon/arrowRight2';
import { send } from 'react-icons-kit/fa/send';

import { RegisterContext } from '../../../../contexts/RegisterContext';
import {
  ContextActionTypes,
  MainContext,
} from '../../../../contexts/MainContext';
import { useVerifEmail, useVerifEmailLink } from '../../../../api';

import { Heading } from '../../../../ui/Heading';
import Button from '../../../../ui/Button';
import Loader from '../../../../ui/Loader';

const Confirm = (): JSX.Element => {
  const { t } = useTranslation();
  const {
    state: { user },
  } = useContext(RegisterContext);
  const { dispatch: altDispatch } = useContext(MainContext);
  const { push } = useHistory();

  const [verifEmail, { loading }] = useVerifEmail({
    onCompleted: () => {
      altDispatch({
        type: ContextActionTypes.SetNotice,
        payload: {
          label: t('Register.Confirm.LinkSuccess'),
          noticeStyle: 'green',
          persistent: false,
          closeable: true,
          duration: 5000,
        },
      });
    },
    onError: () => {
      altDispatch({
        type: ContextActionTypes.SetNotice,
        payload: {
          label: t('StaticNav.Error'),
          noticeStyle: 'red',
          persistent: false,
          closeable: true,
          duration: 5000,
        },
      });
    },
  });
  const [verifEmailLink] = useVerifEmailLink({
    onCompleted: () => {
      altDispatch({
        type: ContextActionTypes.SetNotice,
        payload: {
          label: t('Register.Confirm.VerifSuccess'),
          noticeStyle: 'green',
          persistent: false,
          closeable: true,
          duration: 5000,
        },
      });
      push('/login');
    },
    onError: () => {
      altDispatch({
        type: ContextActionTypes.SetNotice,
        payload: {
          label: t('StaticNav.Error'),
          noticeStyle: 'red',
          persistent: false,
          closeable: true,
          duration: 5000,
        },
      });
    },
  });

  const handleSubmit = ({ code }: { code: string[] }) => {
    verifEmailLink({
      variables: {
        email: user.email,
        secretId: code.toString().replaceAll(',', ''),
      },
    });
  };

  useEffect(() => {
    verifEmail({
      variables: {
        email: user.email,
      },
    });
  }, []);

  return (
    <Container>
      <Heading level={1}>{t('Register.Confirm.Title')}</Heading>
      <Description>{t('Register.Confirm.Desc')}</Description>
      <Formik
        initialValues={{ code: ['', '', '', '', '', ''] }}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<{ code: string[] }>) => (
          <Wrapper>
            <TileWrapper>
              {props.values.code.map((c, index) => {
                return (
                  <CodeTile
                    name="code"
                    maxLength={1}
                    disabled={
                      !c && !props.values.code[index - 1] && index !== 0
                    }
                    value={c}
                    ref={(el) =>
                      !c && !!props.values.code[index - 1] && el?.focus()
                    }
                    onChange={(e) => {
                      props.setFieldValue(
                        'code',
                        props.values.code.map((d, idx) =>
                          idx === index ? e.target.value : d,
                        ),
                      );
                    }}
                  />
                );
              })}
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
                btnStyle="white"
                outlined
                shadow
                iconEnd={send}
                disabled={loading}
                onClick={() =>
                  verifEmail({
                    variables: {
                      email: user.email,
                    },
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
  text-align: center;

  @media (min-width: 1500px) {
    width: 80%;
    margin: 3rem 0;
  }
`;

const Description = styled.div`
  text-align: justify;
  font-size: 17px;
  font-weight: 400;
  margin: 2rem 0 0 0;

  @media (min-width: 1500px) {
    font-size: 18px;
    margin: 3rem 3.5rem 0;
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
