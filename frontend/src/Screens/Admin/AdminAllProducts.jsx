import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  createColumnHelper,
  getPaginationRowModel,
  SortingState,
  VisibilityState,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ListFilter,
  MoreHorizontal,
  Search,
  Settings,
} from "lucide-react";
import sampleImg from "../../components/assets/images/psu-1.png";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import {
  useFilteredProductListMutation,
  useGetAllBrandsQuery,
  useGetAllCategoriesQuery,
  useGetAllProductsAdminQuery,
  useGetProductsQuery,
} from "../../Features/productApiSlice";
import PaginationComponent from "../../components/PaginationComponent";
import Container from "../../components/Container";
import { Card, CardFooter } from "../../components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllCategoryFilters,
  setPrimaryCategoryFilter,
} from "../../Features/filterSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { CaretSortIcon } from "@radix-ui/react-icons";

const AdminAllProducts = () => {
  // const { keyword, pageNumber } = useParams();
  const { brandFilter, categoryFilter, priceFilter, primaryCategoryFilter } =
    useSelector((state) => state.filter);
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data: allProducts,
    isLoading: allProductsLoading,
    error: allProductsError,
  } = useGetAllProductsAdminQuery();

  const allProductsData = useMemo(() => {
    return allProducts || [];
  }, [allProducts]);

  const columnHelper = createColumnHelper();
  /** @type import('@tanstack/react-table').columnDef<any>*/
  const columns = [
    columnHelper.accessor((row) => row.image, {
      id: "Product",
      //   cell: (info) => <img src={`${info.getValue()}`} alt="product-img" />,
      cell: (info) => (
        <img src={sampleImg} alt="product-img" className="w-[70px] h-[70px]" />
      ),
    }),
    columnHelper.accessor((row) => row.name, {
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
      //   cell: (info) => <img src={`${info.getValue()}`} alt="product-img" />,
      cell: ({ row }) => (
        <p className="pl-4">
          {row.getValue("name").length > 40
            ? `${row.getValue("name").split(" ").slice(0, 5).join(" ")}...`
            : row.getValue("name")}{" "}
        </p>
      ),
    }),
    {
      accessorKey: "sku",
      header: "SKU",
    },
    {
      accessorKey: "brand",
      header: "Brand",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    columnHelper.accessor((row) => row.price, {
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
      //   cell: (info) => <img src={`${info.getValue()}`} alt="product-img" />,
      cell: (info) => (
        <p className="flex items-center justify-center pr-4">
          ₹ {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor((row) => row._id, {
      id: "Actions",
      cell: (info) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigate(`/admin/allproducts/editProduct/${info.getValue()}`)
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => handleDeleteBrand(e, info.getValue())}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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

  const handleDeleteBrand = async (e, brandId) => {
    e.preventDefault();
    // try {
    //   await deleteBrand(brandId).unwrap();
    //   refetch();
    //   toast({
    //     title: "Brand deleted!",
    //   });
    // } catch (error) {
    //   console.log(error);
    //   toast({
    //     title: "Error deleting brand!",
    //     description: error?.message || error?.data?.message,
    //     variant: "destructive",
    //   });
    // }
  };

  return (
    <div className="flex w-full gap-6">
      <Container className="flex flex-col gap-4">
        <div className="section-heading flex mt-4 justify-between">
          <h1 className="text-[28px] font-extrabold">All Products</h1>
          <Search className="absolute right-[37rem] top-[10.18rem] w-[14px] h-[14px] text-muted-foreground" />
          <Input
            placeholder="Search products by name"
            value={allProductstable.getColumn("name")?.getFilterValue() ?? ""}
            onChange={(event) =>
              allProductstable
                .getColumn("name")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm pl-8"
          />
        </div>
        <Card>
          <Table>
            <TableHeader>
              {allProductstable?.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-muted">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="py-4 first:rounded-tl-lg last:rounded-tr-lg first:pl-3"
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
          <CardFooter className="bg-muted p-2 grid md:grid-cols-3 gap-2">
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

              {/* <Label htmlFor="category">Category</Label> */}

              {/* <select
                value={allProductstable.getState().pagination.pageSize}
                onChange={(e) => {
                  allProductstable.setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select> */}
              {/* {dataQuery.isFetching ? "Loading..." : null} */}
            </div>
            <div className="flex gap-8">
              <span className="flex items-center gap-1 ">
                <div className="text-sm font-bold">Page</div>
                <strong>
                  {allProductstable.getState().pagination.pageIndex + 1} of{" "}
                  {allProductstable.getPageCount().toLocaleString()}
                </strong>
              </span>
              <span className="flex items-center gap-1 text-sm">
                Go to page:
                <Input
                  type="number"
                  defaultValue={
                    allProductstable.getState().pagination.pageIndex + 1
                  }
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    allProductstable.setPageIndex(page);
                  }}
                  className="border p-1 rounded w-16"
                />
              </span>
            </div>
            <div className="grid md:grid-cols-2">
              <Select
                value={allProductstable.getState().pagination.pageSize}
                onValueChange={(e) => {
                  allProductstable.setPageSize(Number(e));
                }}
              >
                <SelectTrigger id="category" aria-label="Select category">
                  <SelectValue placeholder={`Show`} />
                </SelectTrigger>
                <SelectContent>
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="text-xs text-muted-foreground self-center">
                Showing{" "}
                {allProductstable.getRowModel().rows.length.toLocaleString()} of{" "}
                {allProductstable
                  ?.getRowModel()
                  .rows?.length?.toLocaleString() *
                  allProductstable.getPageCount().toLocaleString()}{" "}
                Rows
              </div>
            </div>
          </CardFooter>
        </Card>
      </Container>
    </div>
  );
};

export default AdminAllProducts;
