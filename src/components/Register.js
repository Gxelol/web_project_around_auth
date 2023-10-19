import Header from "./Header";
import UserDataForm from "./userDataForm";

export default function Register(props) {
  return (
    <>
      <Header 
        registerLoginLink="Entrar" 
        pathTo="/signin" 
      />

      <UserDataForm
        title="Inscrever-se"
        formName="signup"
        children=""
        onSubmit=""
        buttonText="Inscrever-se"
        linkText="Já é um membro? Faça o login aqui!"
        pathTo="/signin"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="auth__input"
          id="email-input"
          minLength="2"
          maxLength="50"
        />
        <span className="popup__placeholder name-input-error"></span>

        <input
          type="password"
          name="password"
          placeholder="Senha"
          required
          className="auth__input"
          id="password-input"
          minLength="2"
          maxLength="40"
        />

        <span className="popup__placeholder About-input-error"></span>
      </UserDataForm>
    </>
  );
}
