import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { resultNumberFormat } from './format';

export default function BtcPrice({ code }: { code: string }) {
    const [fromValue, setFromValue] = useState("");
    const [livePrice, setLivePrice] = useState(null);
  
    const { lastMessage } = useWebSocket(
      `ws://localhost:3000/last/${code}`
    );
  
    useEffect(() => {
      if (lastMessage === null || lastMessage.data === null) {
        return;
      }
  
      setLivePrice(JSON.parse(lastMessage.data));
    }, [lastMessage]);
  
    const fromValueNumber = parseFloat(fromValue);
    const toValue =
      isNaN(fromValueNumber) || livePrice === null
        ? null
        : fromValueNumber / livePrice;

  return (
    <div className="border p-4 flex flex-col gap-4">
        <h3>
          Live Price ($): {livePrice}
        </h3>

        <input
          type="number"
          value={fromValue}
          onChange={(event) => setFromValue(event.target.value)}
          className="p-1 border rounded-sm"
        />

        {toValue !== null && (
          <div>
            {resultNumberFormat.format(toValue)} Bitcoin
          </div>
        )}
      </div>
  )
}
