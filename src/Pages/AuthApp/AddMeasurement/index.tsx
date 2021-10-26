import React from 'react';
import styled from 'styled-components';
import { Formik, Form as FormikForm, FormikProps } from 'formik';

import { ValidateProfileSchema } from './Validation';
import Heading from '../../../ui/Heading';
import Input from '../../../ui/Input';

const AddData = () => {
  const handleSubmit = ({ bloodSugarLevels }: { bloodSugarLevels: string }) => {
    // nothing
  };
  return (
    <Container>
      <Wrapper>
        <PageTitle level={1}>Ajouter une mesure</PageTitle>
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
                <MeasureTitle level={2}>Taux de glycémie</MeasureTitle>
                <MeasureInput
                  name="bloodSugarLevels"
                  type="text"
                  data-testid="bloodSugarLevels-input"
                  placeholder="0.80"
                  content="g/L"
                  value={props.values.bloodSugarLevels}
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

export default AddData;
