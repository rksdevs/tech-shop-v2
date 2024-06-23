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
import {
  Check,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  X,
} from "lucide-react";
import sampleImg from "../../components/assets/images/psu-1.png";
import { useGetProductsQuery } from "../../Features/productApiSlice";
import PaginationComponent from "../../components/PaginationComponent";
import Container from "../../components/Container";
import { Card, CardFooter } from "../../components/ui/card";
import { useGetOrdersQuery } from "../../Features/orderApiSlice";

const AdminAllOrders = () => {
  const { keyword, pageNumber } = useParams();
  const {
    data: allOrders,
    isLoading: productsLoading,
    error: productsError,
  } = useGetOrdersQuery();

  const allOrdersData = useMemo(() => {
    return allOrders || [];
  }, [allOrders]);

  const { toast } = useToast();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 12,
  });
  const navigate = useNavigate();
  const columnHelper = createColumnHelper();
  /** @type import('@tanstack/react-table').columnDef<any>*/
  const columns = [
    {
      accessorKey: "_id",
      header: "Order Id",
    },
    columnHelper.accessor((row) => row.orderItems, {
      id: "Order Items",
      //   cell: (info) => <img src={`${info.getValue()}`} alt="product-img" />,
      cell: (info) => (
        <ul>
          {info.getValue().map((item, index) => (
            <li key={index}>
              <span>{item.qty}</span> X{" "}
              <span>
                {item.name.length > 20 ? item.name.substring(0, 20) : item.name}
              </span>
            </li>
          ))}
        </ul>
      ),
    }),
    columnHelper.accessor((row) => row.createdAt, {
      id: "Order Date",
      //   cell: (info) => <img src={`${info.getValue()}`} alt="product-img" />,
      cell: (info) => <p>{info.getValue().substring(0, 10)}</p>,
    }),
    {
      accessorKey: "totalPrice",
      header: "Amount (₹)",
    },
    columnHelper.accessor((row) => row.isPaid, {
      id: "Paid",
      cell: (info) => (
        <div>
          {info.getValue() ? (
            <Check className="h-4 w-4" />
          ) : (
            <X className="h-4 w-4 text-primary" />
          )}
        </div>
      ),
    }),
    columnHelper.accessor((row) => row.isShipped, {
      id: "Ship",
      cell: (info) => (
        <div>
          {info.getValue() ? (
            <Check className="h-4 w-4" />
          ) : (
            <X className="h-4 w-4 text-primary" />
          )}
        </div>
      ),
    }),
    columnHelper.accessor((row) => row.isDelivered, {
      id: "Delivery",
      cell: (info) => (
        <div>
          {info.getValue() ? (
            <Check className="h-4 w-4" />
          ) : (
            <X className="h-4 w-4 text-primary" />
          )}
        </div>
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
                navigate(`/admin/allorders/editOrder/${info.getValue()}`)
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

  const allOrderstable = useReactTable({
    data: allOrdersData,
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
          <h1 className="text-[28px] font-extrabold">All Orders</h1>
        </div>
        <Card>
          <Table>
            <TableHeader>
              {allOrderstable?.getHeaderGroups().map((headerGroup) => (
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
              {allOrderstable?.getRowModel().rows.map((row) => (
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
              currentPage={allOrderstable?.getState().pagination.pageIndex + 1}
              totalPages={allOrderstable?.getPageCount().toLocaleString()}
            />
          </CardFooter>
        </Card>
      </Container>
    </div>
  );
};

export default AdminAllOrders;
