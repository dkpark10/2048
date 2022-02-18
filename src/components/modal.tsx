import React from 'react';
import styled from 'styled-components';

interface IModal {
  resetClick: () => void;
  score: number;
  isGameOver: boolean;
}

const StyleModal = styled.div<Partial<IModal>>`
  display : ${({ isGameOver }) => {
    return isGameOver === true ? 'flex' : 'none';
  }};
  justify-content:center;
  align-items;
  width:100%;
  z-index: 1;
  height:100%;
  background-color: rgba(0, 0, 0, 0.76);

  .modal_content{
    position:absolute;
    top:50%;
    left:50%;
    border-radius: 6px;
    transform:translate(-50%,-50%);
    width:223px;
    padding:10px;
    border: 2px solid #fb8500;
    background-color: #000a19;
    text-align:center;
    color:white;
  }
`;

// #fb8500;

export default function Modal({ resetClick, score, isGameOver }: IModal) {
  return (
    <>
      <StyleModal
        className='modal'
        isGameOver={isGameOver}
      >
        <div className='modal_content'>
          <h3>Game Over</h3>
          <h1 style={{ color: '#fb8500' }}>{score}</h1>
        </div>
      </StyleModal>
    </>
  )
}