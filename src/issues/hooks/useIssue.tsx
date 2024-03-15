import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../../api/githubApi';
import { Issue } from '../interfaces';
import { sleep } from '../../utils/sleep';

export const getIssue = async (issueNumber: number): Promise<Issue> => {
    await sleep(1);
    const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`);

    return data;
};

export const getIssueCommets = async (
    issueNumber: number
): Promise<Issue[]> => {
    await sleep(2);
    const { data } = await githubApi.get<Issue[]>(
        `/issues/${issueNumber}/comments`
    );

    return data;
};

export const useIssue = (issueNumber: number) => {
    const issueQuery = useQuery({
        queryKey: ['issue', issueNumber],
        queryFn: () => getIssue(issueNumber),
    });

    // Para realizar este query, primero debemos esperar que se solucione el query anterior
    // para solucionar esto

    const commentsQuery = useQuery({
        queryKey: ['issue', issueNumber, 'comments'],
        queryFn: () => getIssueCommets(issueQuery.data?.number!),
        enabled: !!issueQuery.data, // con esta propiedad en false no se va a disparar este query
    });

    return { issueQuery, commentsQuery };
};
