import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouter from './components/AppRouter';
import { useEffect, useState } from 'react';
import { chechAuth } from './store/IsAuthUser';
import { useDispatch } from 'react-redux';
function App() {
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            dispatch(chechAuth()).then(() => {
                setIsCheckingAuth(false); // Установить состояние загрузки в false после проверки
            });
        } else {
            setIsCheckingAuth(false); // Если токена нет, загрузка не требуется
        }
    }, [dispatch]);

    if (isCheckingAuth) {
        return <div>Загрузка...</div>; // Или любой другой индикатор загрузки
    }

    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    );
}

export default App;
