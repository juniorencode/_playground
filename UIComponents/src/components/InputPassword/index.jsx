import './InputPassword.css';

const InputPassword = () => {
  return (
    <div className="InputPassword">
      <input placeholder="Type password..." type="password" />
      <button>
        <span className="icon-eye-blocked"></span>
      </button>
    </div>
  );
};

export { InputPassword };
