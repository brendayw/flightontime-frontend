export const validateLogin = ({ email, password }) => {
  const errors = {};

  if (!email) {
    errors.email = "Email requerido";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email inválido";
  }

  if (!password) {
    errors.password = "Contraseña requerida";
  }

  return errors;
};

export const validateSignup = ({ username, email, password, confirmPassword }) => {
  const errors = {};

  if (!username) {
    errors.username = "Nombre de usuario (username) requerido";
  }

  if (!email) {
    errors.email = "Email requerido";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email inválido";
  }

  if (!password) {
    errors.password = "Contraseña requerida";
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }

  return errors;
};