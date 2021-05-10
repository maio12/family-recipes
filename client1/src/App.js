import './index.scss';
import {RecipeList} from './components/RecipeList';
import {AddRecipe} from './components/AddRecipe';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
//import { ApolloProvider } from '@apollo/client'; //to wrap the aplication and inject whichever data we receive from server
import { GlobalProvider } from './context/GlobalState';


//apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', //the supercharged endpoint that we make requests to
  cache: new InMemoryCache() 
})

function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalProvider >
        <div className="main">
          <h1>Family recipes project</h1>
          <RecipeList />
          <AddRecipe />
        </div>
      </GlobalProvider>
    </ApolloProvider>
  );
}

export default App;