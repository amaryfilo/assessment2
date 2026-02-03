import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { useData } from '../data/useData';

const Items = () => {
  const { items, fetchItems, loading } = useData();
  const [search, setSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => fetchItems(search), 300);
    return () => clearTimeout(timer);
  }, [search, fetchItems]);

  return (
    <div style={{ padding: 16 }}>
      <h2>Items List</h2>
      
      <input
        type="text" 
        placeholder="Search items..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Loading...</p>}
      
      {!loading && items.length === 0 && <p>No items found.</p>}

      <ul>
        {items.map(item => (
          <li key={item.id} style={{ marginBottom: 10 }}>
            <Link to={'/items/' + item.id}>
              {item.name}
            </Link> 
            {' '} (<span style={{ color: '#666' }}>${item.price}</span>)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Items;