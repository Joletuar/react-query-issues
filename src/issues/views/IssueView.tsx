import { Link, Navigate, useParams } from 'react-router-dom';

import { IssueComment } from '../components/IssueComment';
import { Loading } from '../../shared/components';

import { useIssue } from '../hooks';

export const IssueView = () => {
  // Obtenemos los parametros de la url

  const params = useParams();
  const { id = '0' } = params;

  const { issueQuery, commentsQuery } = useIssue(parseInt(id, 10));

  if (issueQuery.isLoading) return <Loading />;

  if (!issueQuery.isLoading && !issueQuery.data)
    return <Navigate to='/issues/list' />;
  return (
    <div className='row mb-5'>
      <div className='col-12 mb-3'>
        <Link to='./issues/list'>Go Back</Link>
      </div>

      {/* Primer comentario */}
      <IssueComment issue={issueQuery.data} />

      {commentsQuery.isLoading ? (
        <Loading />
      ) : (
        commentsQuery.data?.map((issue) => (
          <IssueComment issue={issue} key={issue.id} />
        ))
      )}
    </div>
  );
};
