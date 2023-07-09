import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { Issue, State } from '../interfaces';
import { formattedDate } from '../../utils/formattedDate';

interface Props {
  issue: Issue;
}

export const IssueItem: FC<Props> = ({ issue }) => {
  const navigate = useNavigate();

  return (
    <div
      className='card mb-2 issue'
      onClick={() => navigate(`/issues/issue/${issue.number}`)}
    >
      <div className='card-body d-flex align-items-center'>
        {issue.state === State.Open ? (
          <FiInfo size={30} color='red' />
        ) : (
          <FiCheckCircle size={30} color='green' />
        )}

        <div className='d-flex flex-column flex-fill px-2'>
          <span>
            {issue.title.length >= 80
              ? issue.title.substring(0, 80) + ' ...'
              : issue.title}
          </span>
          <span className='issue-subinfo'>
            {`#${issue.number} ${
              issue.state === State.Open ? 'opened' : 'closed'
            } ${
              formattedDate(issue.created_at) > 1
                ? formattedDate(issue.created_at) + ' days ago'
                : formattedDate(issue.created_at) + ' day ago'
            } by `}
            <span className='fw-bold'>{issue.user.login}</span>
          </span>
        </div>

        <div className='d-flex align-items-center'>
          <img
            src={issue.user.avatar_url}
            alt='User Avatar'
            className='avatar'
          />
          <span className='px-2'>{issue.comments}</span>
          <FiMessageSquare />
        </div>
      </div>
    </div>
  );
};
