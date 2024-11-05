import React from 'react';

function ExtraInputs({ extras, quantities, handleChange, totalSum }) {
  if (!extras || !Object.keys(extras).length) return <div>Loading...</div>;

  return (
    <div className="p-4">
        <div className="grid grid-cols-8 gap-4 items-center py-2 border-b-2 border-gray-200">
            <span className="font-bold col-span-2">Extra</span>
            <span className="font-bold col-span-2">Description</span>
            <span className="font-bold">Cost Per Unit</span>
            <span className="font-bold">Unit</span>
            <span className="font-bold">Qty</span>
            <span className="font-bold">Sub-total</span>
        </div>
        {Object.entries(extras).map(([key, items]) => (
            <div key={key} className="grid grid-cols-8 gap-4 items-center py-2 border-b-2 border-gray-200">
                <span className="col-span-2">{items[0].name}</span>
                <span className="col-span-2">{items[0].description}</span>
                <span>{`$${items[0].cost.toFixed(0)}`}</span>
                <span>{items[0].unit}</span>
                <input
                    className="w-18 h-8 px-2 py-1 border border-gray-300 rounded text-center"
                    type="number"
                    value={quantities[key]}
                    onChange={e => handleChange(key, e.target.value)}
                    min="0"
                />
                <span>{`$${(quantities[key] * items[0].cost).toFixed(2)}`}</span>
            </div>
        ))}
       <div className="grid grid-cols-8 gap-4 items-center py-2 mt-2">
           <span className="col-span-7 text-right font-bold">Extras Total:</span>
           <span className="font-bold">{`$${totalSum.toFixed(2)}`}</span>
       </div>
    </div>
  );
}

export default ExtraInputs;
