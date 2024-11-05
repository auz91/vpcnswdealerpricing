import React from 'react';

function NumberPanels({ numberPanels, setNumberPanels }) {
  return (
    <input
      min="0"
      type="number"  // Ensure it's treated as a numeric input
      className='border-2 rounded-lg flex w-100 h-10 text-center'
      value={numberPanels}  // Control the component with React state
      onChange={(e) => setNumberPanels(e.target.value)}  // Correctly handle changes
      placeholder="Enter number of panels"
    ></input>
  );
}

export { NumberPanels };
