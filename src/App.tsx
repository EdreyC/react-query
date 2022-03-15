import { useQuery } from "react-query";
import axios from 'axios';

type Repository = {
  full_name: string;
  description:string
}

function App() {
  const {data, isFetching} = useQuery<Repository[]>('repos',async()=>{
    const response = await axios.get('https://api.github.com/users/EdreyC/repos')
    return response.data
  },{
    staleTime:1000 * 60 // 1 minute
  })
  return (
    <div className="App">
      <ul> 
        {isFetching && <p>Carregando...</p>}
        {data?.map(repo=>{
          return(
            <li key={repo.full_name}>
              <strong>{repo.full_name}</strong>
              <p>{repo.description}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default App