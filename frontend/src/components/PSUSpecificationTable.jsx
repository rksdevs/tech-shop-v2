import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const PSUSpecificationTable = ({ product }) => {
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
            {product?.specificationDetails?.psuModelNumber || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">FORM FACTOR</TableCell>
          <TableCell>
            {product?.specificationDetails?.psuFormFactor || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">DIMENSIONS</TableCell>
          <TableCell>
            {product?.specificationDetails?.psuDimensions || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">INPUT RANGE</TableCell>
          <TableCell>
            {product?.specificationDetails?.psuInputRange || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">TOTAL OUTPUT</TableCell>
          <TableCell>
            {product?.specificationDetails?.psuTotalOutput || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">CONNECTORS</TableCell>
          <TableCell>
            <ul>
              {product?.specificationDetails?.psuConnectors?.length
                ? product?.specificationDetails?.psuConnectors?.map(
                    (item, index) => <li key={index}>{item}</li>
                  )
                : "NA"}
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">
            PACKAGE CONTENTS
          </TableCell>
          <TableCell>
            <ul>
              {product?.specificationDetails?.psuPackageContents?.length
                ? product?.specificationDetails?.psuPackageContents?.map(
                    (item, index) => <li key={index}>{item}</li>
                  )
                : "NA"}
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">EFFICIENCY</TableCell>
          <TableCell>
            {product?.specificationDetails?.psuEfficiency || "NA"}
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

export default PSUSpecificationTable;
