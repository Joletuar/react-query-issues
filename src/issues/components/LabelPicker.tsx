import { useQuery } from '@tanstack/react-query';

// Fetcher para obtener data

const getLabels = async () => {
  const res = await fetch('https://api.github.com/repos/facebook/react/labels');
  const data = await res.json();

  return data;
};

export const LabelPicker = () => {
  // Uso del useQuery
  const labelsQuery = useQuery(['labels'], getLabels);

  return (
    <div>
      <span
        className='badge rounded-pill m-1 label-picker'
        style={{ border: `1px solid #ffccd3`, color: '#ffccd3' }}
      >
        Primary
      </span>
    </div>
  );
};
