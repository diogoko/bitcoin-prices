import { useState } from 'react';

const resultNumberFormat = Intl.NumberFormat('en', {
  maximumFractionDigits: 5
});

function App() {
  const [fromValue, setFromValue] = useState('');
  const livePrice = 62445.0;

  const fromValueNumber = parseFloat(fromValue);
  const toValue = isNaN(fromValueNumber) ? null : fromValueNumber / livePrice;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="border p-4 flex flex-col gap-4">
        <h3>Live Price ($): {livePrice}</h3>

        <input
          type="number"
          value={fromValue}
          onChange={(event) => setFromValue(event.target.value)}
          className="p-1 border rounded-sm"
        />

        {toValue !== null && (
          <div>{resultNumberFormat.format(toValue)} Bitcoin</div>
        )}
      </div>
    </div>
  );
}

export default App;
