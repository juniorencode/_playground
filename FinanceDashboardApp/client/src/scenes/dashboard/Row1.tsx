import { DashboardBox } from '@/components/DashboardBox';
import { useGetKpisQuery } from '@/state/api';

const Row1 = () => {
  const { data } = useGetKpisQuery();
  console.log(data);
  return (
    <>
      <DashboardBox gridArea="a"></DashboardBox>
      <DashboardBox gridArea="b"></DashboardBox>
      <DashboardBox gridArea="c"></DashboardBox>
    </>
  );
};

export { Row1 };
