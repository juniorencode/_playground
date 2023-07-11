import { useState } from 'react';
import './InputPassword.css';

const InputPassword = () => {
  const [hidden, setHidden] = useState(false);

  const handleHidenn = () => {
    console.log('x');
    setHidden(!hidden);
  };

  return (
    <div className="InputPassword">
      <input placeholder="Type password..." type="password" />
      <button tabIndex="-1">
        <span
          className={`${hidden ? 'icon-eye-blocked' : 'icon-eye'}`}
          onClick={() => handleHidenn()}
        ></span>
      </button>
    </div>
  );
};

export { InputPassword };
