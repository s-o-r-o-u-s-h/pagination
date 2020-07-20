import React, {useState} from 'react';
import Pagination from "./Components/Pagination/Pagination";

function App() {
  const [currentPage, setCurrentPage] = useState<number>(2);
  return (
    <div className="App">
      <Pagination perPage={2} currentPage={currentPage} totalItems={15} onChangePage={(page) => setCurrentPage(page)} />
    </div>
  );
}

export default App;
