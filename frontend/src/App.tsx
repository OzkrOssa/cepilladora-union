import Home from "./components/home";

function App() {
  return (
    <div className="flex flex-col m-4">
      <div className=" flex font-semibold items-center justify-center py-8">
        <p className="text-2xl">Cepilladora Union</p>
      </div>
      <Home />
    </div>
  );
}

export default App;
