import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const MoboSpecificationTable = ({ product }) => {
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
          <TableCell className="font-medium text-left">CPU</TableCell>
          <TableCell>
            {product?.specificationDetails?.moboCpu || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">CHIPSET</TableCell>
          <TableCell>
            {product?.specificationDetails?.moboChipset || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">MEMORY</TableCell>
          <TableCell>
            {product?.specificationDetails?.moboMemory || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">GRAPHICS</TableCell>
          <TableCell>
            {product?.specificationDetails?.moboGraphics || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">ETHERNET</TableCell>
          <TableCell>
            {product?.specificationDetails?.moboEthernet || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">AUDIO</TableCell>
          <TableCell>
            {product?.specificationDetails?.moboAudio || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">BIOS</TableCell>
          <TableCell>
            {product?.specificationDetails?.moboBIOS || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">Form Factor</TableCell>
          <TableCell>
            {product?.specificationDetails?.moboFormFactor || "NA"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">
            OPERATING SYSTEM
          </TableCell>
          <TableCell>{product?.specificationDetails?.moboOS || "NA"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">
            EXPANSION SLOTS
          </TableCell>
          <TableCell>
            <ul>
              {product?.specificationDetails?.moboExpansionSlots?.length
                ? product?.specificationDetails?.moboExpansionSlots?.map(
                    (item, index) => <li key={index}>{item}</li>
                  )
                : "NA"}
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">STORAGE</TableCell>
          <TableCell>
            <ul>
              {product?.specificationDetails?.moboStorage?.length
                ? product?.specificationDetails?.moboStorage?.map(
                    (item, index) => <li key={index}>{item}</li>
                  )
                : "NA"}
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">USB</TableCell>
          <TableCell>
            <ul>
              {product?.specificationDetails?.moboUSB?.length
                ? product?.specificationDetails?.moboUSB?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                : "NA"}
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">BACK PANEL IO</TableCell>
          <TableCell>
            <ul>
              {product?.specificationDetails?.moboBackPanelIO?.length
                ? product?.specificationDetails?.moboBackPanelIO?.map(
                    (item, index) => <li key={index}>{item}</li>
                  )
                : "NA"}
            </ul>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium text-left">INTERNAL IO</TableCell>
          <TableCell>
            <ul>
              {product?.specificationDetails?.moboInternalIO?.length
                ? product?.specificationDetails?.moboInternalIO?.map(
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

export default MoboSpecificationTable;
