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

export const validateSignup = ({ fullname, email, password, confirmPassword }) => {
  const errors = {};

  if (!fullname) {
    errors.fullname = "Nombre completo requerido";
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