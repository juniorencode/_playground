function App() {
  return (
    <div className="bg-neutral-800 text-white p-4 w-[100vw] h-[100vh]">
      <div className="flex flex-col gap-2 my-4">
        <p className="font-semibold tracking-wider">
          Min value:
          <span className="bg-blue-600 ml-2 px-2 py-0.5 text-sm font-medium tracking-widest rounded-lg">
            0
          </span>
        </p>
        <p className="font-semibold tracking-wider">
          Max value:
          <span className="bg-blue-600 ml-2 px-2 py-0.5 text-sm font-medium tracking-widest rounded-lg">
            0
          </span>
        </p>
        <p className="font-semibold tracking-wider">
          Target limit:
          <span className="bg-blue-600 ml-2 px-2 py-0.5 text-sm font-medium tracking-widest rounded-lg">
            0
          </span>
        </p>
      </div>
      <hr />
      <div className="flex flex-col gap-2 my-4">
        <p className="font-semibold tracking-wider">
          Range:
          <span className="bg-blue-600 ml-2 px-2 py-0.5 text-sm font-medium tracking-widest rounded-lg">
            0
          </span>
        </p>
        <p className="font-semibold tracking-wider">
          Interval width:
          <span className="bg-blue-600 ml-2 px-2 py-0.5 text-sm font-medium tracking-widest rounded-lg">
            0
          </span>
        </p>
        <p className="font-semibold tracking-wider">
          Rounded Min:
          <span className="bg-blue-600 ml-2 px-2 py-0.5 text-sm font-medium tracking-widest rounded-lg">
            0
          </span>
        </p>
        <p className="font-semibold tracking-wider">
          Rounded Max:
          <span className="bg-blue-600 ml-2 px-2 py-0.5 text-sm font-medium tracking-widest rounded-lg">
            0
          </span>
        </p>
      </div>
      <hr />
      <div className="flex flex-col gap-2 my-4">
        <p className="font-semibold tracking-wider">
          Labels:
          <span className="bg-blue-600 ml-2 px-2 py-0.5 text-sm font-medium tracking-widest rounded-lg">
            0
          </span>
        </p>
      </div>
      <ul className="w-48 border-x border-t border-neutral-700">
        <li className="p-2 text-right border-b border-neutral-700">100</li>
        <li className="p-2 text-right border-b border-neutral-700">80</li>
        <li className="p-2 text-right border-b border-neutral-700">60</li>
        <li className="p-2 text-right border-b border-neutral-700">40</li>
        <li className="p-2 text-right border-b border-neutral-700">20</li>
        <li className="p-2 text-right border-b border-neutral-700">0</li>
      </ul>
    </div>
  );
}

export default App;
