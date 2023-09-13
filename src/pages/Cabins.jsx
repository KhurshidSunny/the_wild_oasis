/* eslint-disable no-unused-vars */

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";

import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import { useState } from "react";
function Cabins() {
  const [isShowForm, setIsShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>filter / sort</p>
      </Row>

      <Row>
        <CabinTable />
        <Button onClick={() => setIsShowForm((show) => !show)}>
          Add Cabin
        </Button>
        {isShowForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
