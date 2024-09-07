import { IDistrict } from "../../interfaces";
import {  DistrictService } from "../../utility/services";
import { DistrictHook } from "../../hooks";
import { Button } from "../controll/Button";
import React, { useState, useMemo } from 'react';
import { Container, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@material-ui/core";
import { useNavigate, useSearchParams } from "react-router-dom";

interface Column {
    id: 'name' | 'divisionId' | 'type' | 'location' | 'isActive' | 'edit' | 'delete';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'name', label: 'District Name', minWidth: 100 },
    { id: 'divisionId', label: 'Division ID', minWidth: 100 },
    { id: 'type', label: 'District Type', minWidth: 100 },
    { id: 'location', label: 'District location', minWidth: 100 },
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

export const DistrictList = () => {
    const { data: districts, setData: setData } = DistrictHook(true);
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('filter') || '');
    const navigate = useNavigate();

    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    const filteredData = useMemo(() => {
        return districts.filter(d => !search || d.name.includes(search));
    }, [districts, search]);

    const navigateToAddDistrict = () => {
        navigate("/add-district");
    }

    const navigateToEditDistrict = (record: any) => {
        navigate(`/update-district/${record.districtId}`);
    }

    const deleteDistrict = async (record: any) => {
        try {
            const deleteDistrict = await DistrictService.delete(record.districtId);
            if (deleteDistrict.isSuccess) {
                const districtList = await DistrictService.getAll();
                setData(districtList);
            }
        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <>
            <Container>
                <h1>District List</h1>
                <Button text="Add District" color="primary" size="small" variant="contained" onClick={navigateToAddDistrict} />
                <div>&nbsp;</div>
                <TextField id="search" label="search" variant="outlined" value={search} onChange={(e) => setSearch(e.target.value)} fullWidth></TextField>
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record: IDistrict) => {
                                    return (
                                        <TableRow key={record.districtId}>
                                            <TableCell> {record.name}</TableCell>
                                            <TableCell> {record.divisionId}</TableCell>
                                            <TableCell> {record.type}</TableCell>
                                            <TableCell> {record.location}</TableCell>
                                            <TableCell> {record.isActive ? "Yes" : "No"}</TableCell>
                                            <TableCell>
                                                <Button text="Edit" color="primary" size="small" variant="contained" onClick={() => { navigateToEditDistrict(record) }} />
                                            </TableCell>
                                            <TableCell>
                                                <Button text="Delete" color="primary" size="small" variant="contained" onClick={() => { if (window.confirm('Are you sure you want to delete?')) deleteDistrict(record) }} />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 100, { value: -1, label: 'All' }]}
                        component="div"
                        count={districts.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Container>
        </>
    );
}
