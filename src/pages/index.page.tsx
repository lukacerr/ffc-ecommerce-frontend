import { Button } from '@mui/material';
import { useUserStore } from '@/stores/user.store';
import { useNavigate } from 'react-router';

export default function IndexPage() {
  const logout = useUserStore((state) => state.logout);
  const token = useUserStore((state) => state.token);
  const navigate = useNavigate();
  return (
    <Button variant="contained" onClick={() => logout(navigate)}>
      {import.meta.env.VITE_API_URL} {token}
    </Button>
  );
}
