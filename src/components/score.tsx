import React from 'react';
import styled from 'styled-components';

const StyleScore = styled.div`
  font-size:1.8rem;
  color: #fb8500;
  text-align:center;
  font-weight:bold;
  margin-bottom: 20px;
`;

interface IScore{
  score: number;
}

export default function Score({ score }: IScore) {
  return(
    <>
      <StyleScore>
        {`Score : ${score}`}
      </StyleScore>
    </>
  )
}