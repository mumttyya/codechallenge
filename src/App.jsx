import React, { useState, useEffect } from 'react';
import GoalList from './Components/GoalList';
import GoalForm from './Components/GoalForm';
import Overview from './Components/Overview';
import './App.css';

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch('https://codechallenge-db.onrender.com/goals')
      .then(res => res.json())
      .then(setGoals)
      .catch(console.error);
  }, []);

  const addGoal = newGoal => {
    fetch('https://codechallenge-db.onrender.com/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGoal),
    })
      .then(res => res.json())
      .then(goal => setGoals([...goals, goal]));
  };

  const updateGoal = (id, updatedData) => {
    fetch(`https://codechallenge-db.onrender.com/goals/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    })
      .then(res => res.json())
      .then(updatedGoal =>
        setGoals(goals.map(goal => (goal.id === id ? updatedGoal : goal)))
      );
  };

  const deleteGoal = id => {
    fetch(`https://codechallenge-db.onrender.com/goals/${id}`, {
      method: 'DELETE',
    }).then(() => setGoals(goals.filter(goal => goal.id !== id)));
  };

  return (
    <div className="App">
      <h1>Smart Goal Planner</h1>
      <GoalForm onAddGoal={addGoal} />
      <Overview goals={goals} />
      <GoalList
        goals={goals}
        onUpdateGoal={updateGoal}
        onDeleteGoal={deleteGoal}
      />
    </div>
  );
}

export default App;


