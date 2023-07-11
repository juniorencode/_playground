import './InputPassword.css';

const InputPassword = () => {
  return (
    <div className="InputPassword">
      <input placeholder="Type password..." type="password" />
      <button tabIndex="-1">
        <span className="icon-eye-blocked"></span>
      </button>
    </div>
  );
};

export { InputPassword };
