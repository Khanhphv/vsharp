import { Link, Outlet } from 'react-router-dom';
import { ROUTES } from '../../constants/links';

export default function LogoLayout() {
  return (
    <div>
      <div className="mx-auto w-full lg:max-w-[64rem] px-4 relative">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            to={ROUTES.LOGO}
            className="text-2xl md:text-3xl font-bold dark:text-dark-primary text-light-primary flex items-center group"
          >
            <div className="relative mr-3">
              <img
                src="/logo.png"
                alt="VSharp Logo"
                className="h-10 w-auto sm:h-12 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-purple-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <span className="bg-gradient-to-r from-primary-400 via-purple-400 to-primary-400 bg-clip-text text-transparent animate-gradient">
              VSharp
            </span>
          </Link>
        </div>
      </div>
      <main className="flex-grow">
        <div className="min-h-screen flex flex-col">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
