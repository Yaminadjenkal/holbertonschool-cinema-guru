import './auth.css';
import Input from '../../components/general/Input';
import Button from '../../components/general/Button';

export default function Register({ username, password, setUsername, setPassword }) {
  return (
    <>
      <Input
        label="Username"
        type="text"
        value={username}
        setValue={setUsername}
      />
      <Input
        label="Password"
        type="password"
        value={password}
        setValue={setPassword}
      />
      <Button label="Sign Up" type="submit" />
    </>
  );
}
