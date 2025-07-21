
import React, { useState } from 'react';

export default function GoalCard({ goal, onUpdateGoal, onDeleteGoal }) {
  const [depositAmount, setDepositAmount] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: goal.name || '',
    targetAmount: goal.targetAmount || 0,
    category: goal.category || '',
    deadline: goal.deadline || '',
  });

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (!isNaN(amount) && amount > 0) {
      const updatedAmount = goal.savedAmount + amount;
      onUpdateGoal(goal.id, { savedAmount: updatedAmount });
      setDepositAmount('');
    }
  };

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleEditChange = e => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = () => {
    const updatedGoal = {
      ...goal,
      ...editData,
      targetAmount: parseFloat(editData.targetAmount),
    };
    onUpdateGoal(goal.id, updatedGoal);
    setIsEditing(false);
  };

  const progress = Math.min((goal.savedAmount / goal.targetAmount) * 100, 100).toFixed(1);
  const remaining = Math.max(goal.targetAmount - goal.savedAmount, 0);
  const deadlineDate = new Date(goal.deadline);
  const today = new Date();
  const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));

  const completed = goal.savedAmount >= goal.targetAmount;
  const status = completed
    ? '✅ Goal Completed'
    : daysLeft < 0
    ? '❌ Overdue'
    : daysLeft <= 30
    ? '⚠️ Less than 30 days'
    : `${daysLeft} days left`;

  return (
    <div className="goal-card">
      {isEditing ? (
        <div>
          <input name="name" value={editData.name} onChange={handleEditChange} />
          <input name="targetAmount" type="number" value={editData.targetAmount} onChange={handleEditChange} />
          <input name="category" value={editData.category} onChange={handleEditChange} />
          <input name="deadline" type="date" value={editData.deadline} onChange={handleEditChange} />
          <button onClick={handleEditSubmit}>Save</button>
          <button onClick={handleEditToggle}>Cancel</button>
        </div>
      ) : (
        <>
          <h3>{goal.name}</h3>
          <p><strong>Category:</strong> {goal.category}</p>
          <p><strong>Target:</strong> ${goal.targetAmount}</p>
          <p><strong>Saved:</strong> ${goal.savedAmount}</p>
          <p><strong>Remaining:</strong> ${remaining}</p>
          <p><strong>Deadline:</strong> {goal.deadline}</p>
          <p><strong>Status:</strong> {status}</p>
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${progress}%`, backgroundColor: completed ? 'green' : 'blue' }}
            />
          </div>
          <p>{progress}% progress</p>
          <input
            type="number"
            placeholder="Deposit amount"
            value={depositAmount}
            onChange={e => setDepositAmount(e.target.value)}
          />
          <button onClick={handleDeposit}>Deposit</button>
          <button onClick={() => onDeleteGoal(goal.id)}>Delete</button>
          <button onClick={handleEditToggle}>Edit</button>
        </>
      )}
    </div>
  );
}
