const { Router } = require('express');
const { nanoid } = require('nanoid');

const { read, write } = require('../helper/db');
const {
  LoginValidation,
  UserValidation,
  TokenValidation } = require('../middlewares');

const router = Router();

router
  // Requisito 1
  .get('/talker', async (_request, response) => {
    const data = await read();
    return response.status(200).json(data);
  })
  // Requisito 8 retorno de palestrantes que contenham em seu nome o termo pesquisado;
  .get('/talker/search', TokenValidation, async (request, response) => {
    const data = await read();
    const { q: user } = request.query;

    const inquiry = data
      .filter((element) => element.name.toLowerCase().includes(user.toLowerCase()));

    return response.status(200).json(inquiry);
  })
  // Requisito 3 e 4;
  .get('/talker/:id', async (request, response) => {
    const { id } = request.params;
    const db = await read();
    const talker = db.find((element) => element.id === Number(id));

    if (talker) {
      return response.status(200).json(talker);
    }
    return response.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  });

// Requisito 5
router
  .post('/login', LoginValidation, async (_request, response) => {
    const token = nanoid(16);
    return response.status(200).json({ token });
  })
  .post('/talker', TokenValidation, UserValidation, async (request, response) => {
    try {
      const { name, age, talk } = request.body;
      const data = await read();

      const mountedUser = { name, age, talk };
      const newTalker = {
        id: data.length + 1,
        ...mountedUser,
      };
      data.push(newTalker);

      await write(data);
      return response.status(201).json(newTalker);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  });

// Requisito 6
router
  .put('/talker/:id', TokenValidation, UserValidation, async (request, response) => {
    const { body: talker } = request;
    const { id } = request.params;

    talker.id = Number(id);

    const data = await read();
    const updatedTalker = await data.find((user) => (user.id) === talker.id);

    Object.assign(updatedTalker, talker);
    await write(data);

    return response.status(200).json(updatedTalker);
  });

// Requisito 7
router
  .delete('/talker/:id', TokenValidation, async (request, response) => {
    const data = await read();
    const { id } = request.params;
    const newData = data.filter((element) => element.id !== Number(id));
    await write(newData);
    return response.status(204).send();
  });

module.exports = router;
