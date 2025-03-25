import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Image, Text, useTheme, View, withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Header } from "./components/Header";

const client = generateClient<Schema>();

interface AppProps {
  signOut: () => void;
  user: {
    attributes: {
      given_name: string;
      family_name: string;
    };
  };
}

function App({ signOut, user }: AppProps) {

  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  return (
    <div>
      <Header user={user} onSignOut={signOut} />
      <main style={{ padding: '2rem' }}>
        <button onClick={createTodo}>+ new</button>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.content}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default withAuthenticator(App, {
  hideSignUp: false,
  signUpAttributes: ['given_name', 'family_name'],
  components: {
    Header() {
      const { tokens } = useTheme();
  
      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Image alt="Vite logo" src="/vite.svg" />
        </View>
      );
    },
  
    Footer() {
      const { tokens } = useTheme();
  
      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Text>&copy; All Rights Reserved</Text>
        </View>
      );
    },
  },
});
