import React from 'react';

function NumberPanels({ numberPanels, setNumberPanels }) {
  return (
    <input
      min="0"
      type="number"
      className="w-full px-4 py-2 text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:border-[#f4b942] focus:ring-1 focus:ring-[#f4b942]"
      value={numberPanels}
      onChange={(e) => setNumberPanels(e.target.value)}
      placeholder="Enter number"
    />
  );
}

export { NumberPanels };
