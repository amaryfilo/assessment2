import { Routes, Route } from 'react-router-dom';

import Items from './Items';
import ItemDetail from './ItemDetail';
import { DataProvider } from '../data/DataContext';


const App = () => {
  return (
    <DataProvider>
      {/* <nav>
        <Link to="/" style={{ marginRight: 10 }}>Home</Link>
        <Link to="/items">Items</Link>
      </nav> */}
      <Routes>
        <Route path="/" element={<Items />} />
        <Route path="/items/:id" element={<ItemDetail />} />
      </Routes>
    </DataProvider>
  );
}

export default App;