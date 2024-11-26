import { useForm } from './hooks/useForm.hook';

function App() {
  const { register, registerSubmit, handleSubmit, watch } = useForm();
  const { value, handleChange } = register('name');

  registerSubmit(form => {
    console.log(form);
  });

  return (
    <form onSubmit={handleSubmit}>
      <h1>Form</h1>
      <label htmlFor="">Name </label>
      <input
        type="text"
        value={value || ''}
        onChange={e => handleChange(e.target.value)}
      />
      <span> (press enter to submit)</span>
      <div>{JSON.stringify(watch)}</div>
    </form>
  );
}

export default App;
