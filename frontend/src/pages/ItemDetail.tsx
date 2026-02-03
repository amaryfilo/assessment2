import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import type { IItem } from '../types';
import { apiConfig } from '../config';

const ItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [item, setItem] = useState<IItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }

    let isMounted = true;
    const controller = new AbortController();

    const loadItem = async () => {
      try {
        const url = `${apiConfig.baseUrl}/items/${id}`;
        const res = await fetch(url, { signal: controller.signal });

        if (!res.ok) {
          if (res.status === 404) {
            navigate('/', { replace: true });
            return;
          }
          throw new Error(`Error: ${res.status}`);
        }

        const data: IItem = await res.json();

        if (isMounted) {
          setItem(data);
          setLoading(false);
        }
      } catch (err) {
        if (!isMounted) return;
        if (err instanceof Error && err.name === 'AbortError') return; 

        console.error('Failed to load item:', err);
        setLoading(false);
      }
    };

    loadItem();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [id, navigate]);

  if (loading) return <p>Loading details...</p>;
  if (!item) return null;

  return (
    <div style={{ padding: 10 }}>
      <h2>{item.name}</h2>
      <p><strong>Category:</strong> {item.category}</p>
      <p><strong>Price:</strong> ${item.price}</p>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default ItemDetail;