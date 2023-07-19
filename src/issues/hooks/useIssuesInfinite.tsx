import { useInfiniteQuery } from "@tanstack/react-query"
import { Issue, State } from "../interfaces";
import { sleep } from "../../utils/sleep";
import { githubApi } from "../../api/githubApi";

interface Props {
    state?: State;
    labels: string[];
    page?: number;
}

interface QueryProps {
    pageParams?: number;
    queryKey: (string | Props)[];
}

const getIssues = async ({pageParams = 1, queryKey}:QueryProps): Promise<Issue[]> => {

    const [,, args] = queryKey; // Obtenemos el objeto con el el state y labels
    const {state, labels} = args as Props;

    sleep(1);
  
    const params = new URLSearchParams(); // creamos la instancia para agregar los parametros y que estos se codifiquen bien
  
    if (state) params.append('state', state); // agregamos los parametros
  
    // Si recibimos los labels hacemos la petición de los issues filtrado por label
  
    if (labels.length) {
      const labelString = labels.join(',');
      params.append('labels', labelString);
    }
  
    // Agregamos la paginación para el pagineo inifnito
  
    params.append('page', pageParams?.toLocaleString());
  
    const { data } = await githubApi.get<Issue[]>('/issues', { params });
  
    return data;
  };

export const useIssuesInfinite = ({state,labels}:Props) => {

    // Para el scroll infinite se utiliza este hook
    const issuesQuery = useInfiniteQuery(
        {
            queryKey: ["issues", "infinite", {state, labels}],
            queryFn: data => getIssues(data), // data.queryKey es la información que tenemos arriba
            getNextPageParam: (lastPage, pages) => {
                if (lastPage.length === 0) return;    
                return pages.length + 1
            }// esta función se dispara con 2 argumentos
        }
    )
    
    // console.log(issuesQuery.data!.pages[0])

  return {issuesQuery}


}
