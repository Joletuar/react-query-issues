import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { useQueryClient } from '@tanstack/react-query';

import { Issue, State } from '../interfaces';

import { formattedDate } from '../../utils/formattedDate';
import { getIssue, getIssueCommets } from '../hooks';

interface Props {
  issue: Issue;
}

export const IssueItem: FC<Props> = ({ issue }) => {
  const navigate = useNavigate();
  const queryCliente = useQueryClient();

  // Realizamos un prefetch de la petición cuando pasemos el mouse encima

  const prefetchData = () => {
    queryCliente.prefetchQuery({
      queryKey: ['issue', issue.number], // pasamos el key que identifica el cache
      queryFn: () => getIssue(issue.number), // pasamos el fetch para obtener los datos
    });

    queryCliente.prefetchQuery({
      queryKey: ['issue', issue.number, 'comments'],
      queryFn: () => getIssueCommets(issue.number),
    });
  };

  // Si ya tenemos la data de antenamo la seteamos directamente en el cache para no volver hacer de nuevo la petición
  // Debido a que obtenemos el listado de los issues al momento de cargar la lista al principio
  // dentro de esta respuesta ya tenemos la información de todos los queries
  // usamos esta información para setearlo directamente al cache cuando se pase el mouse
  // y asi evitar realizar un fetch de mas para cargar los datos

  const presetData = () => {
    queryCliente.setQueryData(['issue', issue.number], issue); // pasamos el key para el cache, pasamos la data que vamos a seteear

    // queryCliente.prefetchQuery({
    //   queryKey: ['issue', issue.number, 'comments'],
    //   queryFn: () => getIssueCommets(issue.number),
    // });
  };

  return (
    <div
      className='card mb-2 issue'
      onClick={() => navigate(`/issues/issue/${issue.number}`)}
      onMouseEnter={presetData}
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
            } ${formattedDate(issue.created_at)} by `}
            <span className='fw-bold'>{issue.user.login}</span>
          </span>
          <div>
            {issue.labels.map((label) => (
              <span
                className='badge rounded-pill m-1'
                key={label.id}
                style={{
                  backgroundColor: `#${label.color}`,
                  color: 'black',
                }}
              >
                {label.name}
              </span>
            ))}
          </div>
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
