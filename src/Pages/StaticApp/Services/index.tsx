import React from 'react';
import {
  ServicesCard,
  ServicesContainer,
  ServicesH1,
  ServicesH2,
  ServicesIcon,
  ServicesP,
  ServicesWrapper,
} from './ServicesElements';
import Icon1 from '../../../assets/svgs/MedicalProfessional.svg';
import Icon2 from '../../../assets/svgs/Referent.svg';
import Icon3 from '../../../assets/svgs/Patient.svg';

const Services = () => {
  return (
    <ServicesContainer id="services">
      <ServicesH1>Nos Servcices</ServicesH1>
      <ServicesWrapper>
        <ServicesCard>
          <ServicesIcon src={Icon3} />
          <ServicesH2>Patients</ServicesH2>
          <ServicesP>
            Mesurer son taux de glycémie et le partager à ses proches.
          </ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon2} />
          <ServicesH2>Référents</ServicesH2>
          <ServicesP> Suivis des résultats de leur enfant.</ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon1} />
          <ServicesH2>Docteurs</ServicesH2>
          <ServicesP>Meilleur suivis des patients diabétiques.</ServicesP>
        </ServicesCard>
      </ServicesWrapper>
    </ServicesContainer>
  );
};

export default Services;
