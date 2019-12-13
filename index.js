const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

function reqNumber(req, res, next) {

  console.log(`Método: ${req.method};`);
  console.count("Number of Requests");
  console.log('');

  return next();
};

server.use(reqNumber);

function checkProjectId(req, res, next) {

  const { id } = req.params;
  const projectCheck = projects.find(p => p.id == id);

  if (!projectCheck) {
    return res.status(400).json({ error: 'Project does not exists!' });
  }

  return next();
};

function checkTitleExists(req, res, next) {

  const { title } = req.body;

  const titleCheck = projects.find(p => p.title == title);

  if (!titleCheck) {
    return next();
  }
  return response.status(400).json({ "Error": "This title already exist" });
};

server.post('/projects', checkTitleExists, (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);

});

server.post('/projects/:id/tasks', checkProjectId, checkTitleExists, (req, res) => {
  const { id } = req.params;
  const { tasks } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(tasks);

  return res.json(project);

});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.put('/projects/:id', checkProjectId, checkTitleExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

server.delete('/projects/:id', checkProjectId, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id == id);

  projects.splice(projectIndex, 1);

  return res.send();
});

server.listen(3333);