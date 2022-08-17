import { useMemo } from "react";
import {  useBuyProductByIdMutation, useGetAllProductsQuery } from "../../../http/product"
import { DataGrid, GridActionsCellItem, GridRowParams } from '@mui/x-data-grid';
import { Box, CircularProgress, Typography } from "@mui/material";
import { Product } from "../../../types/product";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useSelector } from "react-redux";
import { selectToken } from "../../../store/auth";
import jwtDecode from "jwt-decode";
import { useGetUserByIdQuery } from "../../../http/user";

export default function Buyer() {
  const { data: products, isLoading: isProductsLoading } = useGetAllProductsQuery();
  const { id } = jwtDecode(useSelector(selectToken)) as { id: string };
  const { data: user,  isLoading: isUserLoading } = useGetUserByIdQuery(id);
  const [buyProduct] = useBuyProductByIdMutation();

  function handleBuy(id: string, cost: number) {
    if(cost > user?.deposit) alert('Not enought balance');
    else buyProduct(id);
  }

  const columns = useMemo(
    () => [
      {
        field: 'amountAvailable',
        headerName: 'Quantity',
        editable: false,
        resizable: false,
        flex: 1,
      },
      {
        field: 'cost',
        headerName: 'Cost',
        editable: false,
        resizable: false,
        flex: 1,
      },
      {
        field: 'productName',
        headerName: 'Product Name',
        editable: false,
        resizable: false,
        flex: 1,
      },
      {
        field: 'sellerId',
        headerName: 'Seller Id',
        editable: false,
        resizable: false,
        flex: 1,
      },
      {
        field: 'actions',
        type: 'actions',
        getActions: (params: GridRowParams) => [
          <GridActionsCellItem
            key={'buy'}
            icon={<ShoppingBagIcon />}
            onClick={() => handleBuy(params.id as string, params.row.cost as number)}
            label="Delete"
          />,
        ],
        flex: 1,
      },
  ], []);

  const isLoading = isProductsLoading || isUserLoading;
 
  if(isLoading) return <CircularProgress /> 

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '600px' }}>
      <Typography sx={{ my: 2 }}>Balance: {user?.deposit}</Typography>
      <DataGrid
        getRowId={(row) => row._id as string}
        rows={products as Product[]}
        columns={columns}
      />
    </Box>
  )
}
