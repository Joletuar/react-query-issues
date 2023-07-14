import { useQuery } from '@tanstack/react-query';

import { Issue, State } from '../interfaces';
import { githubApi } from '../../api/githubApi';
import { sleep } from '../../utils/sleep';

interface Props {
  state?: State;
  labels: string[];
}

const getIssues = async (labels: string[], state?: State): Promise<Issue[]> => {
  sleep(1);

  const params = new URLSearchParams(); // creamos la instancia para agregar los parametros y que estos se codifiquen bien

  if (state) params.append('state', state); // agregamos los parametros

  // Si recibimos los labels hacemos la petición de los issues filtrado por label

  if (labels.length) {
    const labelString = labels.join(',');
    params.append('labels', labelString);
  }

  const { data } = await githubApi.get<Issue[]>('/issues', { params });

  return data;
};

export const useIssues = ({ labels, state }: Props) => {
  const issuesQuery = useQuery({
    queryKey: ['issues', { state, labels }], // cuando el orden de los factores no importa, podemos enviar un objeto
    queryFn: () => getIssues(labels, state),
  });

  return { issuesQuery };
};
