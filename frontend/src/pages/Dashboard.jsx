/* eslint-disable no-unused-vars */
import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";

import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Dashboard() {
  // eslint-disable-next-line no-unused-vars

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>

      <DashboardLayout />
    </>
  );
}

export default Dashboard;
