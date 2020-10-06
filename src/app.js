const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };
  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  let changedRepository = {};

  const repoIndex = repositories.findIndex((repo) => repo.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({});
  }

  repositories.map((repository) => {
    if (repository.id === id) {
      repository.title = title;
      repository.url = url;
      repository.techs = techs;
      changedRepository = repository;
    }
  });

  return response.status(200).json(changedRepository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repoIndex = repositories.findIndex((repo) => repo.id === id);
  if (repoIndex < 0) {
    return response.status(400).json({});
  }

  repositories.splice(repoIndex, 1);
  return response.status(204).json(repositories);
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  let changedRepository = {};

  const repoIndex = repositories.findIndex((repo) => repo.id === id);
  if (repoIndex < 0) {
    return response.status(400).json({});
  }

  repositories.map((repository) => {
    if (repository.id === id) {
      repository.likes++;
      changedRepository = repository;
    }
  });

  return response.status(200).json(changedRepository);
});

module.exports = app;
