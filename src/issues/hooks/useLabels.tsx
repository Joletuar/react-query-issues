import { useQuery } from '@tanstack/react-query';

import { githubApi } from '../../api/githubApi';
import { Label } from '../interfaces/label';
import { sleep } from '../../utils/sleep';

// Fetcher para obtener data

const getLabels = async (): Promise<Label[]> => {
  await sleep(2); // formar de bloquear el flujo
  const { data } = await githubApi.get<Label[]>('/labels');
  return data;
};

export const useLabels = () => {
  // Uso del useQuery
  const labelsQuery = useQuery({
    queryKey: ['labels'],
    queryFn: getLabels,
    // refetchOnWindowFocus: false, // Evitar que haga la petición de nuevo cuando se recupere el foco de la pantalla
    // staleTime: 1000 * 60 * 60, // está en milesimimas de segundos. Con esto los labels solo se van a recargar cada hora, o cuando se haga hard refresh de la página
    placeholderData: [
      // Data que se mostrará por defecto hasta que se obtenga la información del fetch
      // Debe ser un objeto que cumpla la interfaz que definimos
      {
        id: 1109410193,
        node_id: 'MDU6TGFiZWwxMTA5NDEwMTkz',
        url: 'https://api.github.com/repos/facebook/react/labels/Component:%20Hooks',
        name: 'Component: Hooks',
        color: 'c2f27b',
        default: false,
      },
      {
        id: 2281766624,
        node_id: 'MDU6TGFiZWwyMjgxNzY2NjI0',
        url: 'https://api.github.com/repos/facebook/react/labels/Component:%20Scheduling%20Profiler',
        name: 'Component: Scheduling Profiler',
        color: '1dc3d6',
        default: false,
      },
      {
        id: 2192194047,
        node_id: 'MDU6TGFiZWwyMTkyMTk0MDQ3',
        url: 'https://api.github.com/repos/facebook/react/labels/Component:%20Flight',
        name: 'Component: Flight',
        color: 'c4523e',
        default: false,
      },
    ],
  });

  return {
    labelsQuery,
  };
};

// fresh: estado que indica que la información actual es reciente o está actualizada
// fetching: estado que indica que se está realizando la petición de datos
// paused: estado que indica la petición está en pausa
// stale: estado que indica que la data no está actualizada, es el estado por defecto. Mientras se realiza el fetching la información que se muestra es la que tenemos en el "stale", cuando finaliza el fetchig de datos la inforamción pasa a "fresh" durante un lapso tiempo, y despues pasa al estado "stale". Se puede modificar el tiempo en el cual la información puede pasar de fresh a stale.
// inactive: estado donde se almacenan los querys inactivos, por defecto se eliminan a los 5 minutos en el caso de no se los use de nuevo

// Si la información se encuentra en el estado de "stale" react-query por defecto realizará un fetching de datos para obtener la información más actual. Esto puede ser quitando el foco del componente actual, quitando el foco de la pestaña/pantalla, etc. Esto tambie se puede configurar.

// initialData y placeHolderData : son similares, pero tiene una función diferente
// La diferencia radica en que se tomará como data fresca la data del initalDate y no se realizará una petición hasta que se cumpla el tiempo que se considere como "Steal"

// placeHolderData: normalmente siempre se usa esto, a no ser que ya tengamos la data fresca de antemano
