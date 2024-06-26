import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const CabinetSpecificationTable = ({ product }) => {
  return (
    <Table className="rounded-md border">
      <TableCaption>Specifications</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-left">Specification</TableHead>
          <TableHead className="text-center">Details</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium text-left">MODEL</TableCell>
          <TableCell>
            {product?.specificationDetails?.cabinetModelNumber || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">FORM FACTOR</TableCell>
          <TableCell>
            {product?.specificationDetails?.cabinetFormFactor || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">DIMENSIONS</TableCell>
          <TableCell>
            {product?.specificationDetails?.cabinetChassis || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">
            PREINSTALLED FANS
          </TableCell>
          <TableCell>
            {product?.specificationDetails?.cabinetPreinstalledFans || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">IO PANEL</TableCell>
          <TableCell>
            {product?.specificationDetails?.cabinetIOPanel || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">
            LIQUID COOLING
          </TableCell>
          <TableCell>
            <ul>
              {product?.specificationDetails?.cabinetLiquidCooling?.length
                ? product?.specificationDetails?.cabinetLiquidCooling?.map(
                    (item, index) => <li key={index}>{item}</li>
                  )
                : "NA"}
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">FAN SUPPORT</TableCell>
          <TableCell>
            <ul>
              {product?.specificationDetails?.cabinetFanSupport?.length
                ? product?.specificationDetails?.cabinetFanSupport?.map(
                    (item, index) => <li key={index}>{item}</li>
                  )
                : "NA"}
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">WARRANTY</TableCell>
          <TableCell>
            {product?.warrantyDetails?.warrantyPeriod || "NA"}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default CabinetSpecificationTable;
