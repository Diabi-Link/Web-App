import styled from 'styled-components';

export const TimelineContainer = styled.div`
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f9f9f9;

  @media screen and (max-width: 768px) {
    height: 1100px;
  }

  @media screen and (max-width: 480px) {
    height: 1300px;
  }
`;

export const TimelineWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    padding: 0 20px;
  }
`;

export const TimelineH1 = styled.h1`
  font-size: 2.5rem;
  color: #81c6d6;
  margin-bottom: 64px;

  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;
