import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const RAMSpecificationTable = ({ product }) => {
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
            {product?.specificationDetails?.RAMModel || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">SERIES</TableCell>
          <TableCell>
            {product?.specificationDetails?.RAMMemorySeries || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">MEMORY TYPE</TableCell>
          <TableCell>
            {product?.specificationDetails?.RAMMemoryType || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">CAPACITY</TableCell>
          <TableCell>
            {product?.specificationDetails?.RAMCapacity || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">KIT TYPE</TableCell>
          <TableCell>
            {product?.specificationDetails?.RAMKitType || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">SPEED</TableCell>
          <TableCell>
            {product?.specificationDetails?.RAMSpeed || "NA"}
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

export default RAMSpecificationTable;
