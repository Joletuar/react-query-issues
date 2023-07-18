import { useState } from 'react';

import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { Loading } from '../../shared/components';

import { useIssues } from '../hooks';
import { State } from '../interfaces';

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [estado, setEstado] = useState<State>();

  const { issuesQuery, page } = useIssues({
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
              issues={issuesQuery.data || []}
              state={estado}
              onStateChange={(newState) => setEstado(newState)}
            />

            <div className='d-flex justify-content-between align-items-center my-3'>
              <button
                disabled={page === 1 || issuesQuery.isFetching}
                className='btn btn-outline-primary'
                onClick={prevPage}
              >
                Ant
              </button>
              <span>{page}</span>
              <button
                disabled={
                  issuesQuery.data?.length === 0 || issuesQuery.isFetching
                }
                className='btn btn btn-outline-primary'
                onClick={nextPage}
              >
                Sig
              </button>
            </div>
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
