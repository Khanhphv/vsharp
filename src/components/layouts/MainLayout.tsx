import { Outlet } from 'react-router-dom';
import Header from '../Header';

export default function MainLayout() {
  return (
    <div>
      <Header />
      <main className="flex-grow">
        <div className="min-h-screen flex flex-col">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
