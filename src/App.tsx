import { Header, Footer } from "@components";
import { HomePage } from "@pages";
import "@styles/globals.scss";

function App() {
  return (
    <>
      <Header />
      <main>
        <HomePage />
      </main>
      <Footer />
    </>
  );
}

export default App;
