import React, {useState, useMemo} from 'react'
import axios from 'axios';
import { Button } from '../controll/Button';

import { IBrand } from '../../interfaces'
import { BrandService } from '../../utility/services';
import { BrandHook } from '../../hooks';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@material-ui/core';

interface Column {
    id: 'brandName' | 'isActive' | 'edit' | 'delete';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'brandName', label: 'Brand Name', minWidth: 100 },
    { id: 'isActive', label: 'IsActive?', minWidth: 100 },
    { id: 'edit', label: 'Edit', minWidth: 100 },
    { id: 'delete', label: 'Delete', minWidth: 100 },
];


  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  });

export const BrandList = () =>{
     const {data: brands, setData: setData} = BrandHook(true);
        const classes = useStyles();
        const [page, setPage] = React.useState(0);
        const [rowsPerPage, setRowsPerPage] = React.useState(10);
        const [searchParams] = useSearchParams();
        const [search, setSearch] = useState(searchParams.get('filter')|| '');
        const navigate = useNavigate();
        


        const handlePageChange = (event:unknown, newPage:number )=>
            setPage(newPage);
        

        const handleChangeRowsPerPage=(event:React.ChangeEvent<HTMLInputElement>)=>{
            setRowsPerPage(+event.target.value);
            setPage(0);
        }
    
        const filterdData= useMemo(()=>{
            return brands.filter(c=>!search|| c.name.includes(search))
        }, [brands,search]) 


        const navigateToAddBrand=()=>{
            navigate('/add-brand')
        }


        const navigateToEditBrand=(record:any)=>{
            navigate(`/update-brand/${record.brandId}`)
        }

        const deleteBrand = async(record:any) =>{
            try{
                const deleteBrand = await BrandService.delete(record.brandId);
                if(deleteBrand.isSuccess) {
                    const brandList = await BrandService.getAll();
                    setData(brandList);
                    window.location.reload();
                    
                }
            }
            catch(error:any){
                console.log('Error deleting brand:', error);
            }
            finally{
               
            }
        }


    return (
        <>
        <Container>

            <h1>Brand</h1>
            <Button text= "Add Brand" color="primary" size='small' variant='contained'onClick={navigateToAddBrand}/>
            <div> &nbsp; </div>

            <TextField id='search' label='Search' variant='outlined' onChange={(e)=> setSearch(e.target.value)} fullWidth />

            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label='sticky table'>
                        <TableHead>
                            <TableRow>
                                    {columns.map((column)=>
                                        <TableCell key={column.id} align={column.align} style={{minWidth:column.minWidth}}>
                                                {column.label}
                                        </TableCell>
                                    )}
                            </TableRow>
                        </TableHead>


                        <TableBody>
                            {filterdData.slice(page * rowsPerPage, page*rowsPerPage+ rowsPerPage).map((record:IBrand) => {
                                return (<TableRow key={record.brandId}>
                                        <TableCell>{record.name}</TableCell>
                                        <TableCell>{String(record.isActive)}</TableCell>
                                        <TableCell>
                                            <Button text='Edit' color='primary' size='small' variant='contained' onClick= {()=>{navigateToEditBrand(record)}}/>                                           
                                        </TableCell>
                                        <TableCell>
                                            <Button text='Delete' color='primary' size='small' variant='contained' onClick={() => {if(window.confirm('Are you sure You want to delete???')) deleteBrand(record)}}/>                                           
                                        </TableCell>
                                    </TableRow>

                                );
                            })}
                                
                        </TableBody>
                    </Table>

                </TableContainer>
                <TablePagination rowsPerPageOptions={[10,25,100]} component="div" count={brands.length}
                rowsPerPage={rowsPerPage} page={page} onPageChange={handlePageChange} onRowsPerPageChange={handleChangeRowsPerPage}/>

            </Paper>
        </Container>
        
        </>
    );

}