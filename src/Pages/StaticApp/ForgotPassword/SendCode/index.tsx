import React from 'react';
import styled from 'styled-components';
import { Formik, Form as FormikForm, FormikProps } from 'formik';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { arrowRight2 } from 'react-icons-kit/icomoon/arrowRight2';
import { ic_mail as mail } from 'react-icons-kit/md/ic_mail';
import { useLazyQuery } from '@apollo/client';

import { ValidateMailSchema } from '../Validation';
import { PASSWORD_RECOVERY, PasswordRecoveryResponse } from '../../../../api';

import Heading from '../../../../ui/Heading';
import Input from '../../../../ui/Input';
import Button from '../../../../ui/Button';
import Loader from '../../../../ui/Loader';

type Props = {
  onClick: (step: number) => void;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 4rem 0;

  @media (min-width: 1500px) {
    width: 80%;
    margin: 6rem 0;
  }
`;

const Description = styled.div`
  text-align: center;
  font-size: 17px;
  font-weight: 400;
  margin: 1rem 0;

  @media (min-width: 1500px) {
    margin: 2rem 0;
    font-size: 18px;
  }
`;

const FormWrapper = styled(FormikForm)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 20px 0 50px;

  @media (min-width: 1500px) {
    margin: 50px 0 70px;
  }
`;

const InputLabel = styled.label`
  font-size: 16px;
  font-weight: 500;
  margin: 15px 5px;
`;

const StyledButton = styled(Button)`
  width: 170px;
  height: 40px;
`;

const SendCode = ({ onClick }: Props): JSX.Element => {
  const { push } = useHistory();
  const { t } = useTranslation();

  const [passwordRecovery, { loading }] = useLazyQuery<
    PasswordRecoveryResponse,
    { email: string }
  >(PASSWORD_RECOVERY, {
    onCompleted: () => {
      push('/forgot-password/reset');
      onClick(2);
    },
    onError: () => null,
  });

  const handleSubmit = ({ email }: { email: string }) => {
    passwordRecovery({ variables: { email } });
  };

  return (
    <Container>
      <Heading level={1}>{t('SendCode.Title')}</Heading>
      <Description>{t('SendCode.Description')}</Description>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={ValidateMailSchema}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<{ email: string }>) => (
          <FormWrapper>
            <InputWrapper>
              <InputLabel>{t('SendCode.MailAddress')}</InputLabel>
              <Input
                name="email"
                type="text"
                placeholder="John.cena@gmail.com"
                value={props.values.email}
                onChange={(e) => {
                  props.handleChange(e);
                }}
                errorText={
                  props.errors.email && props.touched.email
                    ? props.errors.email
                    : undefined
                }
                icon={mail}
              />
            </InputWrapper>
            <ButtonWrapper>
              <StyledButton
                type="submit"
                label={
                  loading ? (
                    <Loader loaderStyle="white" />
                  ) : (
                    t('SendCode.Button')
                  )
                }
                btnStyle="primary"
                shadow
                iconEnd={arrowRight2}
                disabled={loading}
                data-testid="reset-button"
              />
            </ButtonWrapper>
          </FormWrapper>
        )}
      </Formik>
    </Container>
  );
};

export default SendCode;
