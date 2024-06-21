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
} from "@tanstack/react-table";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
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
import { useGetProductsQuery } from "../../Features/productApiSlice";
import PaginationComponent from "../../components/PaginationComponent";
import Container from "../../components/Container";
import { Card, CardFooter } from "../../components/ui/card";

const AdminAllProducts = () => {
  const { keyword, pageNumber } = useParams();
  const {
    data: allProducts,
    isLoading: productsLoading,
    error: productsError,
  } = useGetProductsQuery({ keyword });

  const allProductsData = useMemo(() => {
    return allProducts?.products || [];
  }, [allProducts]);

  const { toast } = useToast();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  });
  const navigate = useNavigate();
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
      id: "Name",
      //   cell: (info) => <img src={`${info.getValue()}`} alt="product-img" />,
      cell: (info) => (
        <p>
          {info.getValue().length > 40
            ? `${info.getValue().substring(0, 40)}...`
            : info.getValue()}
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
    {
      accessorKey: "price",
      header: "Price",
    },
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

  const allProductstable = useReactTable({
    data: allProductsData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
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
      <Container className="flex flex-col gap-8">
        <div className="section-heading flex mt-4">
          <h1 className="text-[28px] font-extrabold">All Products</h1>
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
          <CardFooter className="bg-muted p-2">
            <PaginationComponent
              currentPage={
                allProductstable?.getState().pagination.pageIndex + 1
              }
              totalPages={allProductstable?.getPageCount().toLocaleString()}
            />
          </CardFooter>
        </Card>
      </Container>
    </div>
  );
};

export default AdminAllProducts;
