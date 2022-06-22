// Biblioteca Joi utilizada para realizar a validação do middleware;

const { LoginSchema, UserSchema, TokenSchema } = require('../joi');

// Req 4 - validações para o Login
function LoginValidation(request, response, next) {
  const { email, password } = request.body;

  const { error } = LoginSchema.validate({ email, password });

  if (error) {
    return response.status(400).json({
      message: error.message,
    });
  }

  return next();
}

// Req 5 - Validações para o Talker
function UserValidation(request, response, next) {
  const { name, age, talk } = request.body;
  const { error } = UserSchema.validate({ name, age, talk });

if (error) {
  return response.status(400).json({
    message: error.message,
  });
}

return next();
}
// Req 5 - Validações para o Talker
function TokenValidation(request, response, next) {
  const token = request.headers.authorization;
  const { error } = TokenSchema.validate(token);
  if (error) {
    return response.status(401).json({ message: error.message });
  }

  return next();
}

module.exports = { LoginValidation, UserValidation, TokenValidation };
