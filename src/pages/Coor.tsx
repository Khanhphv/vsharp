import { useEffect } from 'react';
import { ROUTES } from '../constants/links';
import { useNavigate } from 'react-router-dom';

export default function Coor() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(ROUTES.TOOLS);
  }, [navigate]);

  return <div></div>;
}
