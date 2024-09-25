import { AddTodo } from "./components/AddTodo";
import Container from "./components/Container";
import { Header } from "./components/Header";
import { Todos } from "./components/Todos";

export default function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <div className="py-3">
            <AddTodo />
          </div>
          <div className="py-3">
            <Todos />
          </div>
        </Container>
      </main>
    </>
  );
}
