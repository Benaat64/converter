import React, { useState } from 'react';

export interface HeaderProps {
    amount: number;
    handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    toggleCurrencies: () => void;
  }

  const Header = ({ amount, handleAmountChange, toggleCurrencies }:HeaderProps) => {

    const [isRotated, setIsRotated] = useState(false);

    const handleButtonClick = () => {
        setIsRotated(!isRotated);
        toggleCurrencies();
    };
    return (
        <header>
            <h1>Converter</h1>

            <input 
              type="number" 
              value={amount}
              onChange={handleAmountChange} 
              placeholder="Euro" 
              
            />

            <button 
                className={isRotated ? 'rotate-button' : 'rotate-button-reset'}
                onClick={handleButtonClick}
            >=</button>
        </header>
    );
};
export default Header;