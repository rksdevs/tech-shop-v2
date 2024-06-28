import { useMemo, useState } from "react";
import sampleImg from "../../components/assets/images/psu-1.png";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  createColumnHelper,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { Button } from "../ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Container from "../Container";
import { Input } from "../ui/input";
import { Card, CardContent, CardFooter } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Pagination } from "../ui/pagination";
import { Skeleton } from "../ui/skeleton";
import {
  useDeletePrebuiltPcMutation,
  useGetAllPrebuiltPcsQuery,
} from "../../Features/pcConfigureApiSlice";
import { useToast } from "../ui/use-toast";

const AllPrebuiltPcTable = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    data: allPrebuiltPcs,
    isLoading: allPrebuiltPcsLoading,
    error: allPrebuiltPcsError,
    refetch,
  } = useGetAllPrebuiltPcsQuery();

  const [
    deletePrebuiltPc,
    { isLoading: deletePrebuiltPcLoading, error: deletePrebuiltPcError },
  ] = useDeletePrebuiltPcMutation();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const allProductsData = useMemo(() => {
    return allPrebuiltPcs || [];
  }, [allPrebuiltPcs]);

  const handleDeleteItem = async (e) => {
    // e.preventDefault();
    try {
      await deletePrebuiltPc(e).unwrap();
      refetch();
      toast({
        title: "Deleted Prebuilt PC!",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Can not delete Prebuilt PC!",
        description: error?.message || error?.data?.message,
        variant: "destructive",
      });
    }
  };

  const columnHelper = createColumnHelper();
  /** @type import('@tanstack/react-table').columnDef<any>*/
  const columns = [
    columnHelper.accessor((row) => row.pcImage, {
      id: "Product",
      cell: (info) => (
        <img
          src={sampleImg}
          alt="product-img"
          className="w-[120px] h-[120px]"
        />
      ),
    }),
    columnHelper.accessor((row) => row.pcName, {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <p className="pl-4">
          {row.getValue("name").length > 40
            ? `${row.getValue("name").split(" ").slice(0, 6).join(" ")}...`
            : row.getValue("name")}{" "}
        </p>
      ),
    }),
    columnHelper.accessor((row) => Object.values(row.pcComponents), {
      id: "Components",
      cell: (info) => (
        <ul key={info.getValue()._id}>
          {info
            .getValue()
            .filter((item) => item.hasOwnProperty("name"))
            .map((item, index) => (
              <li key={index} className="mb-2">
                <span className="text-muted-foreground font-semibold">1 x</span>{" "}
                <span className="text-sm">
                  {" "}
                  {item?.name?.split(" ").slice(0, 7).join(" ") || "NA"}
                </span>
              </li>
            ))}
        </ul>
      ),
    }),
    columnHelper.accessor((row) => row.pcTotalPrice, {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className=""
          >
            Price
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: (info) => (
        <p className="flex items-center justify-center pr-6">
          ₹ {info.getValue()}
        </p>
      ),
    }),
    {
      accessorKey: "countInStock",
      header: "Stock",
    },
    columnHelper.accessor((row) => row, {
      id: "Update",
      cell: (info) => (
        <Button
          className="pt-1"
          variant="outline"
          size="sm"
          onClick={() =>
            navigate(`/admin/editPrebuiltPc/${info.getValue()._id}`)
          }
        >
          Edit
        </Button>
      ),
    }),
    columnHelper.accessor((row) => row, {
      id: "Delete",
      cell: (info) => (
        <Trash2
          className="w-4 h-4 hover:text-primary hover:cursor-pointer"
          onClick={() => handleDeleteItem(info.getValue()._id)}
        />
      ),
    }),
  ];

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  const allProductstable = useReactTable({
    data: allProductsData,
    columns,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      pagination,
      columnFilters,
    },
  });

  return (
    <Container className="flex flex-col gap-4">
      <div className="section-heading flex justify-between items-center">
        <h1 className="font-extrabold">All Prebuilt PCs</h1>
        <div className="flex items-end gap-4">
          <Input
            placeholder="Search products by name"
            value={allProductstable.getColumn("name")?.getFilterValue() ?? ""}
            onChange={(event) =>
              allProductstable
                .getColumn("name")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
      </div>
      <Card>
        {allPrebuiltPcsLoading ? (
          <div className="flex items-center space-x-4 flex-col">
            <div className="space-y-2 flex gap-2 items-center p-4">
              <Skeleton className="h-10 w-10 rounded-[20px] " />
              <Skeleton className="h-4 w-[500px]" />
            </div>
            <div className="space-y-2 flex gap-2 items-center p-4">
              <Skeleton className="h-10 w-10 rounded-[20px] " />
              <Skeleton className="h-4 w-[500px]" />
            </div>
            <div className="space-y-2 flex gap-2 items-center p-4">
              <Skeleton className="h-10 w-10 rounded-[20px] " />
              <Skeleton className="h-4 w-[500px]" />
            </div>
            <div className="space-y-2 flex gap-2 items-center p-4">
              <Skeleton className="h-10 w-10 rounded-[20px] " />
              <Skeleton className="h-4 w-[500px]" />
            </div>
            <div className="space-y-2 flex gap-2 items-center p-4">
              <Skeleton className="h-10 w-10 rounded-[20px] " />
              <Skeleton className="h-4 w-[500px]" />
            </div>
            <div className="space-y-2 flex gap-2 items-center p-4">
              <Skeleton className="h-10 w-10 rounded-[20px] " />
              <Skeleton className="h-4 w-[500px]" />
            </div>
          </div>
        ) : allPrebuiltPcsError ? (
          <Card className="min-h-[30vh] flex justify-center items-center">
            <CardContent className="font-bold flex justify-center items-center">
              Oops No Data to display!
            </CardContent>
          </Card>
        ) : (
          <Table>
            <TableHeader>
              {allProductstable?.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-muted">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="py-1 first:rounded-tl-lg last:rounded-tr-lg first:pl-5 last:pr-5"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {allProductstable?.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-left">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <CardFooter className="bg-muted p-2 flex justify-between gap-2 px-4">
          <div className="flex items-center gap-2">
            <Pagination className="flex gap-2">
              <Button
                className="border rounded p-2 px-4 px-3"
                variant="outline"
                onClick={() => allProductstable.firstPage()}
                disabled={!allProductstable.getCanPreviousPage()}
              >
                {"<<"}
              </Button>
              <Button
                className="border rounded p-2 px-4"
                variant="outline"
                onClick={() => allProductstable.previousPage()}
                disabled={!allProductstable.getCanPreviousPage()}
              >
                {"<"}
              </Button>
              <Button
                className="border rounded p-2 px-4"
                variant="outline"
                onClick={() => allProductstable.nextPage()}
                disabled={!allProductstable.getCanNextPage()}
              >
                {">"}
              </Button>
              <Button
                className="border rounded p-2 px-4 "
                variant="outline"
                onClick={() => allProductstable.lastPage()}
                disabled={!allProductstable.getCanNextPage()}
              >
                {">>"}
              </Button>
            </Pagination>
          </div>
          <div>
            <span className="flex items-center gap-1 ">
              <strong>
                Page - {allProductstable.getState().pagination.pageIndex + 1} of{" "}
                {allProductstable.getPageCount().toLocaleString()}
              </strong>
            </span>
          </div>
          <div className="flex gap-8">
            <span className="flex items-center gap-1 text-sm">
              Go to page:
              <Input
                type="number"
                defaultValue={
                  allProductstable.getState().pagination.pageIndex + 1
                }
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  allProductstable.setPageIndex(page);
                }}
                className="border p-1 rounded w-16"
              />
            </span>
          </div>
        </CardFooter>
      </Card>
    </Container>
  );
};

export default AllPrebuiltPcTable;
