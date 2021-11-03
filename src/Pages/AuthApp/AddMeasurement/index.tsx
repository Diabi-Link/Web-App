import React, { useContext } from 'react';
import styled from 'styled-components';
import { Formik, Form as FormikForm, FormikProps } from 'formik';
import { plus } from 'react-icons-kit/fa/plus';

import { useTranslation } from 'react-i18next';
import { ValidateProfileSchema } from './Validation';
import Heading from '../../../ui/Heading';
import Input from '../../../ui/Input';
import Button from '../../../ui/Button';
import { useAddData } from '../../../api';
import {
  ContextActionTypes,
  MainContext,
  NoticeType,
} from '../../../contexts/MainContext';
import Loader from '../../../ui/Loader';

const AddData = () => {
  const { t } = useTranslation();
  const { dispatch: altDispatch } = useContext(MainContext);

  const [addData, { loading }] = useAddData({
    onCompleted: ({ AddData: { value } }) => {
      let label;
      let noticeStyle: NoticeType['noticeStyle'];

      if (value < 0.7) {
        label =
          'Votre mesure a bien été enregistrée. Attention ! Vous êtes en hypoglycémie.';
        noticeStyle = 'error';
      } else if (value >= 0.7 && value <= 1.25) {
        label = 'Votre mesure a bien été enregistrée.';
        noticeStyle = 'success';
      } else {
        label =
          'Votre mesure a bien été enregistrée. Attention ! Vous êtes en hyperglycémie.';
        noticeStyle = 'error';
      }
      altDispatch({
        type: ContextActionTypes.SetNotice,
        payload: {
          label,
          noticeStyle,
          persistent: false,
          closeable: true,
          duration: 5000,
        },
      });
    },
  });

  const handleSubmit = (
    { bloodSugarLevels }: { bloodSugarLevels: string },
    { resetForm }: { resetForm: () => void },
  ) => {
    addData({
      variables: {
        dataInfo: { value: parseFloat(bloodSugarLevels), date: new Date() },
      },
    });
    resetForm();
  };

  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLTextAreaElement;

    if (!target.value) {
      return;
    }

    if (target.value.length >= 2 && target.value[1] !== '.') {
      target.value = `${target.value.slice(0, 1)}.${target.value.slice(1)}`;
    } else if (
      target.value[target.value.length - 1] < '0' ||
      target.value[target.value.length - 1] > '9' ||
      target.value.length > 4
    ) {
      target.value = target.value.slice(0, target.value.length - 1);
    }
  };

  return (
    <Container>
      <Wrapper>
        <PageTitle level={1}>{t('AddMeasurement.AddMeasurement')}</PageTitle>
        <Formik
          initialValues={{
            bloodSugarLevels: '',
          }}
          validationSchema={ValidateProfileSchema}
          onSubmit={handleSubmit}
        >
          {(
            props: FormikProps<{
              bloodSugarLevels: string;
            }>,
          ) => (
            <FormikForm>
              <MeasureWrapper>
                <MeasureTitle level={2}>
                  {t('AddMeasurement.BloodSugarLevel')}
                </MeasureTitle>
                <MeasureInput
                  name="bloodSugarLevels"
                  type="text"
                  data-testid="bloodSugarLevels-input"
                  placeholder="0.80"
                  content="g/L"
                  value={props.values.bloodSugarLevels}
                  onInput={onInput}
                  onBlur={(e) => {
                    const { setFieldValue } = props;
                    const { target } = e;

                    if (target.value.length === 0) {
                      return;
                    }

                    for (let i = target.value.length; i < 4; i += 1) {
                      if (i === 1) {
                        setFieldValue(
                          'bloodSugarLevels',
                          target.value.concat('.'),
                        );
                        target.value = target.value.concat('.');
                      } else {
                        setFieldValue(
                          'bloodSugarLevels',
                          target.value.concat('0'),
                        );
                        target.value = target.value.concat('0');
                      }
                    }
                  }}
                  onChange={(e) => {
                    props.handleChange(e);
                  }}
                  errorText={
                    props.errors.bloodSugarLevels &&
                    props.touched.bloodSugarLevels
                      ? props.errors.bloodSugarLevels
                      : undefined
                  }
                />
              </MeasureWrapper>
              <ButtonWrapper>
                <MeasureButton
                  type="submit"
                  label={
                    loading ? (
                      <Loader loaderStyle="white" />
                    ) : (
                      t('AddMeasurement.SendMeasurement')
                    )
                  }
                  btnStyle="primary"
                  data-testid="measure-button"
                  shadow
                  iconEnd={plus}
                  disabled={
                    props.values.bloodSugarLevels.length === 0 || loading
                  }
                />
              </ButtonWrapper>
            </FormikForm>
          )}
        </Formik>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80vw;
`;

const PageTitle = styled(Heading)`
  position: relative;
  color: ${({ theme }) => theme.main.primaryLight};
  margin-top: 2rem;

  &:before,
  &:after {
    content: '';
    height: 10%;
    top: 50%;
    position: absolute;
  }

  &:before {
    background-color: ${({ theme }) => theme.main.whiteBroken};
    left: -1.5em;
    right: -1.5em;
    z-index: -1;
    height: 101%;
  }

  &:after {
    left: 50%;
    transform: translateX(-50%);
    width: 80vw;
    z-index: -2;
    background-color: ${({ theme }) => theme.main.primaryLight};
  }
`;

const MeasureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10rem;
`;

const MeasureTitle = styled(Heading)`
  color: ${({ theme }) => theme.main.primaryLight};
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const MeasureInput = styled(Input)`
  font-family: 'Montserrat';
  height: 9rem;
  width: 20rem;
  font-size: 4rem;

  &:focus::placeholder {
    color: transparent;
  }

  &:after {
    content: 'g/L';
    color: ${(props) => props.theme.main.dark};
    font-size: 4rem;
    position: absolute;
    right: 0.875rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const MeasureButton = styled(Button)`
  margin-top: 5rem;
`;

export default AddData;
