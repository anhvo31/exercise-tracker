import 'dotenv/config';
import * as exercises from './exercises_model.mjs';
import express from 'express';

const PORT = process.env.PORT;

const app = express();


app.use(express.json());


 app.post('/exercises', (req, res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            if(exercise === 1) {
                res.status(400).json({ Error: "Invalid request" });
            } else {
                res.status(201).json(exercise);
            }
        })
        .catch(error => {
            console.error(error);
            // In case of an error, send back status code 400 in case of an error.
            // A better approach will be to examine the error and send an
            // error status code corresponding to the error.
            res.status(400).json({ Error: "Invalid request" });
        });
});


 app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
        .then(exercise => { 
            if (exercise !== null) {
                res.json(exercise);
            } else {
                res.status(404).json({ Error: "Not found" });
            }         
         })
        .catch(error => {
            res.status(400).json({ Error: 'Request failed' });
        });
});


 app.get('/exercises', (req, res) => {
    let filter = {};
    exercises.findExercises(filter, '', 0)
        .then(movies => {
            res.status(200).send(movies);
        })
        .catch(error => {
            res.status(400).json({ Error: 'Request failed' });
        });
});


 app.put('/exercises/:_id', (req, res) => {
    exercises.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.status(200).json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date })
            } else if(numUpdated == -1) {
                res.status(400).json({ Error: "Invalid request" });
            } else {
                res.status(404).json({ Error: "Not found" });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: "Invalid request" });
        });
});


app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});