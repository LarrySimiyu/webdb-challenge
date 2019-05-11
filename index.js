const express = require('express');
const knex = require('knex');
const db_config = require('./knexfile');
const server = express();
const db = knex(db_config.development);
server.use(express.json());
//endpoints

//POST for adding projects
server.post('/api/projects', (req, res) => {
    const project = req.body;
    db('projects').insert(project)
        .then(ids => {
            res.status(201).json(ids) //201 = created
        })
        .catch(err => {
            res.status(500).json({ error: 'Failed to create project' })
        })
})
//POST for adding actions
server.post('/api/actions', (req, res) => {
    const action = req.body;
    db('actions').insert(action)
        .then(ids => {
            res.status(201).json(ids)
        })
        .catch(err => {
            res.status(500).json({ error: 'Failed to create action' })
        })
})

//STRETCH get
server.get('/api/actions', (req, res) => {
    db('actions')
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

//STRETCH put 
server.put('/api/actions/:id', (req, res) => {
    db('actions')
        .where({ id: req.params.id })
        .update(req.body)
        .then(count => {
            if(count > 0) {
                res.status(200).json(count)

            } else {
                res.status(404).json({ message: 'Action not found' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});


// STRETCH delete
server.delete('/api/actions/:id', (req, res) => {
    db('actions')
        .where({ di: req.params.id })
        .update(req.body)
        .then(count => {
            if (count > 0) {
                res.status(200).json(count)
            } else {
                res.status(404).json({ message: 'action not found' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

//STRETCH POST 
server.post('/api/projects', (req, res) => {
    db('projects')
        .insert(req.body)
        .then(project => {
            res.status(200).json(project)
        })
        .catch( error => {
            res.status(500).json(error)
        });
});

//GET for retrieving a project by its ID
server.get('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    db('projects').where('id', id)
        .then(project => {
            if (project) {
                db('actions')
                    .where('project_id', id)
                    .then(actions => {
                        project[0].actions = actions;
                        res.status(200).json(project);
                    })
                    .catch(err => {
                        res.status(500).json({ error: 'Database failed' })
                    })
            } else {
                res.status(404).json({ error: 'Failed to find project' })
            }
        })

})

//STRETCH PUT
server.put('/api/projects/:id', (req, res) => {
    db('projects')
        .where({ id: req.params.id })
        .update(req.body)
        .then(count => {
            if (count > 0) {
                res.status(200).json(count)

            } else {
                res.status(404).json({ message: ' Project not found' })
            }
        })
        .catch(error => {
            res.status(500).json(error)
        });
});

// STRETCH POST 

//STRETCH DELETE
server.delete('/api/projects/:id', (req, res) => {
    db('projects')
        .where({ id: req.params.id })
        .del()
        .then(count => {
            if (count > 0) {
                res.status(200).end();
            } else {
                res.status(404).json({ message: 'Project not found'});
            }
        })
        .catch( error => {
            res.status(500).json(error);
        });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
})