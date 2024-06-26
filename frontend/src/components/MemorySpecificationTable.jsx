import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const MemorySpecificationTable = ({ product }) => {
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
            {product?.specificationDetails?.memoryModelNumber || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">FORM FACTOR</TableCell>
          <TableCell>
            {product?.specificationDetails?.memoryFormFactor || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">INTERFACE</TableCell>
          <TableCell>
            {product?.specificationDetails?.memoryInterface || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">CAPACITY</TableCell>
          <TableCell>
            {product?.specificationDetails?.memoryCapacity || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">SPEED</TableCell>
          <TableCell>
            {product?.specificationDetails?.memorySpeed || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">DIMENSIONS</TableCell>
          <TableCell>
            {product?.specificationDetails?.memoryDimensions || "NA"}
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

export default MemorySpecificationTable;
