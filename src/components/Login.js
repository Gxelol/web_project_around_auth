import Header from "./Header";
import UserDataForm from "./userDataForm";

export default function Login(props) {
  return (
    <>
      <Header 
        registerLoginLink="Inscrever-se" 
        pathTo="/signup" 
      />

      <UserDataForm
        title="Entrar"
        formName="signin"
        children=""
        onSubmit=""
        buttonText="Entrar"
        linkText="Ainda não é membro? Inscreva-se aqui!"
        pathTo="/signup"
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
