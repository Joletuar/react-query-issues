import { useState } from 'react';

import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { Loading } from '../../shared/components';

import { useIssuesInfinite } from '../hooks';
import { State } from '../interfaces';

export const ListViewInfinite = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [estado, setEstado] = useState<State>();

  const { issuesQuery } = useIssuesInfinite({
    state: estado,
    labels: selectedLabels,
  });

  const onLabelChange = (labelName: string) => {
    selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName]);
  };

  return (
    <div className='row mt-5'>
      <div className='col-8'>
        {issuesQuery.isLoading ? (
          <Loading />
        ) : (
          <>
            <IssueList
            // Aplanamos la información porque ahora podemos tener un arreglo de arreglos
              issues={ issuesQuery.data?.pages.flat() || []}
              state={estado}
              onStateChange={(newState) => setEstado(newState)}
            />

            <button className='btn btn-primary mt-3' onClick={() => issuesQuery.fetchNextPage()}
            disabled={!issuesQuery.hasNextPage}
            >
              Load more...
            </button>

          </>
        )}
      </div>

      <div className='col-4'>
        <LabelPicker
          selectedLabels={selectedLabels}
          onChange={(labelName) => onLabelChange(labelName)}
        />
      </div>
    </div>
  );
};
