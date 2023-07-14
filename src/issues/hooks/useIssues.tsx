import { useQuery } from '@tanstack/react-query';

import { Issue, State } from '../interfaces';
import { githubApi } from '../../api/githubApi';
import { sleep } from '../../utils/sleep';
import { useEffect, useState } from 'react';

interface Props {
  state?: State;
  labels: string[];
  page?: number;
}

const getIssues = async ({
  labels,
  state,
  page = 1,
}: Props): Promise<Issue[]> => {
  sleep(1);

  const params = new URLSearchParams(); // creamos la instancia para agregar los parametros y que estos se codifiquen bien

  if (state) params.append('state', state); // agregamos los parametros

  // Si recibimos los labels hacemos la petición de los issues filtrado por label

  if (labels.length) {
    const labelString = labels.join(',');
    params.append('labels', labelString);
  }

  // Agregamos la paginación para el pagineo

  params.append('page', page?.toLocaleString());

  const { data } = await githubApi.get<Issue[]>('/issues', { params });

  return data;
};

export const useIssues = ({ labels, state }: Props) => {
  // paginación

  const [page, setPage] = useState(1);

  // si el estado de los labels o del estado cambia, entonces reseteo la página

  useEffect(() => {
    setPage(1);
  }, [labels, state]);

  const issuesQuery = useQuery({
    queryKey: ['issues', { state, labels, page }], // cuando el orden de los factores no importa, podemos enviar un objeto
    queryFn: () => getIssues({ labels, state, page }),
  });

  // pag siguiente

  const nextPage = () => {
    if (issuesQuery.data?.length === 0) return;

    setPage((current) => current + 1);

    // issuesQuery.refetch() // permite realizar un refetch
  };

  // pag previa

  const prevPage = () => {
    if (page <= 1) return;

    setPage((current) => current - 1);
  };

  return {
    // Properties
    issuesQuery,

    // Getter
    page,

    // Methods
    nextPage,
    prevPage,
  };
};
