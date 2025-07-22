import React from  'react';
import GoalCard from './GoalCard';

function GoalList({ goals, onUpdateGoal, onDeleteGoal }) {
  return (
    <div className="goal-list-section">
      <h2 className="goal-list-heading">All Goals</h2>
      <div className="goal-list">
        {goals.map(goal => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onUpdateGoal={onUpdateGoal}
            onDeleteGoal={onDeleteGoal}
          />
        ))}
      </div>
    </div>
  );
}

export default GoalList;
