import { Issue } from '../interfaces';
import { githubApi } from '../../api/githubApi';
import { useQuery } from '@tanstack/react-query';
import { sleep } from '../../utils/sleep';

const getIssues = async (): Promise<Issue[]> => {
  const { data } = await githubApi.get<Issue[]>('/issues');

  sleep(1);

  return data;
};

export const useIssues = () => {
  const issuesQuery = useQuery({
    queryKey: ['issues'],
    queryFn: getIssues,
  });

  return { issuesQuery };
};
