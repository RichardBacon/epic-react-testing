import Counter from "./Counter";
import CounterWithHook from "./CounterWithHook";
import EasyButton from "./EasyButton";
import Location from "./Location";
import Login from "./Login";
import LoginSubmission from "./LoginSubmission";

function App() {
  // comment out the example components you don't want to see
  return (
    <>
      <Counter />
      <CounterWithHook />
      <EasyButton />
      <Location />
      <Login />
      <LoginSubmission />
    </>
  );
}

export default App;
