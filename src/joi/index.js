const Joi = require('joi');

const LoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'O "email" deve ter o formato "email@email.com"',
    'any.required': 'O campo "email" é obrigatório',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'O "password" deve ter pelo menos 6 caracteres',
    'any.required': 'O campo "password" é obrigatório',
  }),
});

const UserSchema = Joi.object({
  name: Joi.string().required().min(3).messages({
    'string.min': 'O "name" deve ter pelo menos 3 caracteres',
    'any.required': 'O campo "name" é obrigatório',
  }),
  age: Joi.number().min(18).required().messages({
    'number.min': 'A pessoa palestrante deve ser maior de idade',
    'any.required': 'O campo "age" é obrigatório',
  }),
  talk: Joi.object({
    watchedAt: Joi
      .string()
      .pattern(/^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/i)
      .required()
      .messages({
      'string.pattern.base': 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
      'any.required': 'O campo "watchedAt" é obrigatório',
    }),
    rate: Joi.number().integer().min(1).max(5)
      .required()
      .messages({
      'number.integer': 'O campo "rate" deve ser um inteiro de 1 à 5',
      'number.max': 'O campo "rate" deve ser um inteiro de 1 à 5',
      'number.min': 'O campo "rate" deve ser um inteiro de 1 à 5',
      'any.required': 'O campo "rate" é obrigatório',
    }),

  }).required().messages({
    'any.required': 'O campo "talk" é obrigatório',
  }),
});

const TokenSchema = Joi.string().length(16).required().messages({
    'any.required': 'Token não encontrado',
    'string.length': 'Token inválido',
  });

module.exports = { LoginSchema, UserSchema, TokenSchema };
