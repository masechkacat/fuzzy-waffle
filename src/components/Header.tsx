import Container from "./Container";
import { ModeToggle } from "./mode-toggle";

export function Header() {
  return (
    <header className="py-2 bg-secondary">
      <Container>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-purple-500">TODO APP</h1>
          <ModeToggle />
        </div>
      </Container>
    </header>
  );
}
