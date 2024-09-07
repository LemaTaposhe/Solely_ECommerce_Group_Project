import { ITag } from "../../interfaces";
import { TagService } from "../../utility/services/tagService";
import { useTag } from "../../hooks";
import { Button } from "../controll/Button";
import React, { useState, useMemo } from "react";
import { Container, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@material-ui/core";
import { useNavigate, useSearchParams } from "react-router-dom";

interface Column {
    id: "name" | "isActive" | "edit" | "delete";
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: "name", label: "Tag Name", minWidth: 100 },
    { id: "isActive", label: "Is Active?", minWidth: 100 },
    { id: "edit", label: "Edit", minWidth: 100 },
    { id: "delete", label: "Delete", minWidth: 100 },
];

const useStyles = makeStyles({
    root: {
        width: "100%",
    },
    container: {
        maxHeight: 440,
    },
});

export const TagList = () => {
    const { data: tags, setData: setTags } = useTag(true);
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("filter") || "");
    const navigate = useNavigate();

    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const filteredData = useMemo(() => {
        return tags.filter(t => !search || t.name?.toLowerCase().includes(search.toLowerCase()));
    }, [tags, search]);

    const navigateToAddTag = () => {
        navigate("/add-tag");
    };

    const navigateToEditTag = (record: ITag) => {
        navigate(`/update-tag/${record.tagId}`);
    };
    const navigateToViewTag = (record: ITag) => {
        navigate(`/view-tag/${record.tagId}`);
    };

    const deleteTag = async (record: ITag) => {
        try {
            const deleteTag = await TagService.delete(record.tagId);
            if (deleteTag.isSuccess) {
                const tagList = await TagService.getAll();
                setTags(tagList);
            }
        } catch (error: any) {
            console.log(error);
        } finally {
            navigate("/");
        }
    };

    return (
        <>
            <Container>
                <h1>Tag List</h1>
                <Button text="Add Tag" color="primary" size="small" variant="contained" onClick={navigateToAddTag} />
                <div>&nbsp;</div>
                <TextField id="search" label="Search" variant="outlined" value={search} onChange={(e) => setSearch(e.target.value)} fullWidth />
                <div>&nbsp;</div>
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map(column => (
                                        <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record: ITag) => {
                                    return (
                                        <TableRow key={record.tagId}>
                                            <TableCell>{record.name}</TableCell>
                                            <TableCell>{String(record.isActive)}</TableCell>
                                            <TableCell>
                                                <Button text="Edit" color="primary" size="small" variant="contained" onClick={() => navigateToEditTag(record)} />
                                            </TableCell>
                                            <TableCell>
                                                <Button text="Delete" color="secondary" size="small" variant="contained" onClick={() => { if (window.confirm('Are you sure to delete?')) deleteTag(record); }} />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50, 100, { value: -1, label: 'All' }]}
                        component="div"
                        count={tags.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Container>
        </>
    );
};
