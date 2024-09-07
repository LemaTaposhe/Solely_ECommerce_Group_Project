import React from 'react';
import './App.css';
import { ThemeProvider, createTheme, CssBaseline } from '@material-ui/core';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { DistrictList } from './component/pages/DistrictList';
import { DistrictForm } from './component/pages/DistrictForm';
import { SupplierList } from './component/pages/SupplierList';
import { CategoryForm, CategoryList, SupplierForm, ProductForm, ProductList, PurchaseList,StockList } from './component/pages';
import { BrandList } from './component/pages/BrandList';
import { BrandForm } from './component/pages/BrandForm';
import LandingPage from './component/pages/LandingPage';
import Header from './component/layout/Header';
import { TagList } from './component/pages/tagList';
import { TagForm } from './component/pages/tagForm';
import {OrderList} from './component/pages/orderList';
import { PurchaseForm } from './component/pages/purchaseForm';
import OrderDetails from './component/pages/orderDetails';
/*import { ProductAttributeList } from './component/pages/productAttirbute';*/

const theme = createTheme({
    palette: {
        primary: {
            main: '#333996',
            light: '#3c44b126',
        },
        secondary: {
            main: '#f83245',
            light: '#f8324526',
        },
        background: {
            default: '#f4f5fd',
        },
    },
    overrides: {
        MuiAppBar: {
            root: {
                transform: 'translateZ(0)',
            },
        },
    },
    props: {
        MuiIconButton: {
            disableRipple: true,
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/district-list" element={<DistrictList />} />
                    <Route path="/add-district" element={<DistrictForm />} />
                    <Route path="/update-district/:id" element={<DistrictForm />} />
                    <Route path="/brand-list" element={<BrandList />} />
                    <Route path="/add-brand" element={<BrandForm />} />
                    <Route path="/update-brand/:id" element={<BrandForm />} />
                    <Route path="/supplier-list" element={<SupplierList />} />
                    <Route path="/add-supplier" element={<SupplierForm />} />
                    <Route path="/update-supplier/:id" element={<SupplierForm />} />
                    <Route path="/category-list" element={<CategoryList />} />
                    <Route path="/add-category" element={<CategoryForm />} />
                    <Route path="/update-category/:id" element={<CategoryForm />} />
                    <Route path="/product-list" element={<ProductList />} />
                    <Route path="/add-product" element={<ProductForm />} />
                    <Route path="/update-product/:id" element={<ProductForm />} />
                    <Route path="/purchase-list" element={<PurchaseList />} />
                    <Route path="//update-purchase/:id" element={<PurchaseForm />} />
                    <Route path="/add-purchase" element={<PurchaseForm />} />
                    <Route path="/stock-list" element={<StockList />} />
                    <Route path="/tag-list" element={<TagList />} />
                    <Route path="/add-tag" element={<TagForm />} />
                    <Route path="/update-tag/:id" element={<TagForm />} />
                    <Route path="/order-list" element={<OrderList />} />
                    <Route path="/order-items/:id" element={<OrderDetails />} />
                    {/*<Route path="/product-attribute-list" element={<ProductAttributeList />} />*/}

                </Routes>
            </Router>
            <CssBaseline />
        </ThemeProvider>
    );
}

export default App;

