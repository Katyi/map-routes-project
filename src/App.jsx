import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route page="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<h1>Нет карты...</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
