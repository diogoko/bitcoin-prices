import BtcPrice from './BtcPrice';

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <BtcPrice code="USD" />
      <BtcPrice code="EUR" />
    </div>
  );
}

export default App;
