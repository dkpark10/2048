import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const NewGameInput = styled.input.attrs(props => ({
  type: "button"
}))`
  width:89px;
  height:26px;
  border-radius: 5px;
  border: 1.5px solid #fb8500;
  background-color :#000a19;
  font-weight: bold;
  margin-top:12px;
  cursor:pointer;
  color:white;

  &:focus {
    outline:none;
    background-color :#000a19;
    font-weight: bold;
  }
`;

interface INewGameButton {
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  onReset: () => void;
}

export default function NewGameButton({ onKeyDown, onReset }: INewGameButton) {

  const newGameRef = useRef(null);

  useEffect(() => {
    newGameRef.current.focus();
  }, [])

  return (
    <>
      <div style={{textAlign:'center'}}>
        <NewGameInput
          ref={newGameRef}
          name='keypress'
          onBlur={e => newGameRef.current.focus()}
          value={'New Game'}
          onClick={onReset}
          onKeyDown={onKeyDown}
        />
      </div>
    </>
  )
}