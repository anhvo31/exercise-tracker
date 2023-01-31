import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const AddExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('')

    const history = useHistory();

    const addExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {'Content-Type': 'application/json',},
        });

        if(response.status === 201){
            alert('Successfully added the exercise');
        } else{
            alert(`Failed to add exercise, status code = ${response.status}`);
        }

        history.push("/");
    };

    return (
        <div>
            <h1>Enter Values to Create Exercise</h1>
            <input
                type="text"
                value={name}
                placeholder="Name"
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                placeholder="Reps"
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                value={weight}
                placeholder="Weight"
                onChange={e => setWeight(e.target.value)} />
            <select class='exerciseUnit'
                type="text"
                value={unit}
                onChange={e => setUnit(e.target.value)} >
                    <option value="lbs">lbs</option>
                    <option value="kgs">kgs</option>
            </select>
            <input
                type="text"
                value={date}
                placeholder="Date"
                onChange={e => setDate(e.target.value)} />
            <p>
                <button onClick={addExercise}>Create</button>
            </p>
        </div>
    );
}

export default AddExercisePage;