import Balance from '@/types/balance.interface';
import axios from 'axios';

export default async function BalanceGet() {
  return (await axios.get<Balance>('/balance')).data;
}
