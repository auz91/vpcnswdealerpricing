import React from 'react';

function ExtraInputs({ extras, quantities, handleChange, totalSum }) {
  if (!extras || !Object.keys(extras).length) return <div>Loading...</div>;

  return (
    <div className="p-0">
      {/* Header */}
      <div className="grid grid-cols-4 gap-6 items-center py-4 border-b border-gray-200 mb-4">
        <div className="col-span-2">
          <span className="font-medium text-gray-900">Extra Item</span>
        </div>
        <div className="text-center">
          <span className="font-medium text-gray-900">Quantity</span>
        </div>
        <div className="text-right">
          <span className="font-medium text-gray-900">Sub-total</span>
        </div>
      </div>

      {/* Items */}
      <div className="space-y-6">
        {Object.entries(extras).map(([key, items]) => (
          <div key={key} className="grid grid-cols-4 gap-6 items-center py-4 bg-gray-50 rounded-lg px-4 hover:bg-gray-100 transition-colors">
            <div className="col-span-2">
              <div className="space-y-1">
                <h4 className="font-medium text-gray-900">{items[0].name}</h4>
                <p className="text-sm text-gray-600">{items[0].description}</p>
                <p className="text-sm text-gray-500">
                  Cost per {items[0].unit}: {`$${items[0].cost.toFixed(0)}`}
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <input
                className="w-20 px-3 py-2 text-center border border-gray-200 rounded-lg focus:outline-none focus:border-[#f4b942] focus:ring-1 focus:ring-[#f4b942]"
                type="number"
                value={quantities[key]}
                onChange={e => handleChange(key, e.target.value)}
                min="0"
              />
            </div>

            <div className="text-right font-medium text-gray-900">
              {`$${(quantities[key] * items[0].cost).toFixed(2)}`}
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
        <span className="text-lg font-medium text-gray-900">Extras Total</span>
        <span className="text-lg font-medium text-[#f4b942]">
          {`$${totalSum.toFixed(2)}`}
        </span>
      </div>
    </div>
  );
}

export default ExtraInputs;
