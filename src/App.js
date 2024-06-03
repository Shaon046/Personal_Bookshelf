
import './App.css';
import SearchPage from './pages/SearchPage';
import CartPage from './pages/CartPage';
import {Routes,Route} from 'react-router-dom'




function App() {
  return (
    <>
    <Routes>
<Route path="/" element={<SearchPage/>}/>
<Route path="/bookshelf" element={<CartPage/>}/>
    </Routes>
    

    </>
  );
}

export default App;
