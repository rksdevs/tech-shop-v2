import './App.css';
import Container from './components/Container';
import Footer from './components/Footer';
import { NavbarBottom } from './components/NavbarBottom';
import { NavbarMiddle } from './components/NavbarMiddle';
import { NavbarTop } from './components/NavbarTop';
import { ModeToggle } from './components/toggle-theme';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <NavbarTop />
      <NavbarMiddle />
      <NavbarBottom />
      <Container>
        <Outlet />
      {/* <Button variant="outline">Button</Button>
      <ModeToggle /> */}
      </Container>
      <Footer />
    </div>
  );
}

export default App;
