import { FC } from 'react';

import { useLabels } from '../hooks/useLabels';
import { Loading } from '../../shared/components';

interface Props {
  selectedLabels: string[];
  onChange: (labelName: string) => void;
}

export const LabelPicker: FC<Props> = ({ selectedLabels, onChange }) => {
  const { labelsQuery } = useLabels();

  // ! hay una diferencia entre isLoading vs isFetching
  if (labelsQuery.isLoading) return <Loading />;

  return (
    <>
      {labelsQuery.data!?.map((label) => (
        <span
          className='badge rounded-pill m-1 label-picker'
          style={{
            border: `1px solid #${label.color}`,
            color: selectedLabels.includes(label.name)
              ? 'black'
              : `#${label.color}`,
            backgroundColor: selectedLabels.includes(label.name)
              ? `rgba(${parseInt(label.color.slice(0, 2), 16)},${parseInt(
                  label.color.slice(2, 4),
                  16
                )},${parseInt(label.color.slice(4, 6), 16)}, 0.8)`
              : '',
          }}
          key={label.id}
          onClick={() => onChange(label.name)}
        >
          {label.name}
        </span>
      ))}
    </>
  );
};

// isLoading: es cuando se está cargando la data por primera vez, es decir cuando no tenemos nada en caché y no se puede mostrar nada
// isFetching: siempre se va a disparar cuando hagamos un petición, es decir, es cuando tenemos data en caché (data no actualizada) para mostrar, pero estamos haciendo una petición al backend para obtener nueva data

// De preferencia se utiliza mas isLoading
