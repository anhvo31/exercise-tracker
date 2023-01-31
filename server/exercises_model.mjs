import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);


// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: {type: String, required: true }
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

function isDateValid(date) {
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

function isRepsValid(reps) {
    const onlyNum = /^\d+$/;
    if (reps < 1) {
        return false
    } else {
        return onlyNum.test(reps)
    }
}


const createExercise = async (name, reps, weight, unit, date) => {
    if(name === '' || name === null) {
        return 1
    } else if(isRepsValid(reps) != true) {
        return 1
    } else if(weight === null) {
        return 1
    } else if(weight < 1) {
        return 1
    } else if(isDateValid(date) != true) {
        return 1
    } else if(unit == null) {
        return 1
    } else if(unit === "lbs" || unit === "kgs") {
        const exercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});
        return exercise.save();
    }
}

const findExercises = async (filter, projection, limit) => {
    const query = Exercise.find(filter)
        .select(projection)
        .limit(limit);
    return query.exec();
}

const findExerciseById = async (filter) => {
    const query = Exercise.findById(filter);
    return query.exec()
}

const replaceExercise = async (_id, name, reps, weight, unit, date) => {
    if(name === '' || name === null) {
        return -1
    } else if(isRepsValid(reps) != true) {
        return -1
    } else if(weight < 1) {
        return -1
    } else if(isDateValid(date) != true) {
        return -1
    } else if(unit === "lbs" || unit === "kgs"){
        const result = await Exercise.replaceOne({ _id: _id }, {name: name, reps: reps, weight: weight, unit: unit, date: date});
        return result.modifiedCount;
    } else {
        return -1
    }
}

const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({_id: _id});
    return result.deletedCount;
}

export {createExercise, findExercises, findExerciseById, replaceExercise, deleteById};
