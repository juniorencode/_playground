import { useState } from 'react';
import './InputPassword.css';

const InputPassword = () => {
  const [hidden, setHidden] = useState(true);

  const handleHidenn = () => {
    console.log('x');
    setHidden(!hidden);
  };

  return (
    <div className="InputPassword">
      <input
        placeholder="Type password..."
        type={`${hidden ? 'password' : 'text'}`}
      />
      <button tabIndex="-1" onClick={() => handleHidenn()}>
        <span className={`${hidden ? 'icon-eye-blocked' : 'icon-eye'}`}></span>
      </button>
    </div>
  );
};

export { InputPassword };
