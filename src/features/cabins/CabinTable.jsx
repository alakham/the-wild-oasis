import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  // const {
  //   isLoading,
  //   data: cabinData,
  //   error,
  // } = useQuery({
  //   queryKey: ["cabins"],
  //   queryFn: getCabins,
  // });
  const { isLoading, cabinData } = useCabins();

  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  // 1 - Filter
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;

  if (filterValue === "all") filteredCabins = cabinData;
  if (filterValue === "no-discount")
    filteredCabins = cabinData.filter((cabin) => !cabin.discount);

  if (filterValue === "with-discount")
    filteredCabins = cabinData.filter((cabin) => cabin.discount);

  // 2 - Sorting

  const sortBy = searchParams.get("sortBy") || "startDate-asc";

  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  // const sortedCabins = filteredCabins.sort((a, b) => {
  //   if (typeof a[field] === "number" && typeof b[field] === "number") {
  //     return (a[field] - b[field]) * modifier;
  //   } else {
  //     return a[field].localeCompare(b[field]) * modifier;
  //   }
  // });
  const sortedCabins = filteredCabins?.sort((a, b) =>
    typeof a[field] === "string"
      ? a[field].localeCompare(b[field]) * modifier
      : (a[field] - b[field]) * modifier
  );

  if (!cabinData.length) return <Empty resourceName="cabins" />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          // data={cabinData}
          // data={filteredCabins}
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
