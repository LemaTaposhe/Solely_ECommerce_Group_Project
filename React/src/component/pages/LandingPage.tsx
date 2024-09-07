import React from 'react';
import { makeStyles, Button, Typography, Container, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        minHeight: '100vh',
    },
    sidebar: {
        width: '20%',
        backgroundColor: '#343a40',
        color: '#fff',
        paddingTop: theme.spacing(4),
        position: 'fixed',
        height: '100%',
        top: 0,
        left: 0,
        overflowY: 'auto',
    },
    content: {
        marginLeft: '20%',
        padding: theme.spacing(4),
        flexGrow: 1,
    },
    sidebarHeader: {
        paddingBottom: theme.spacing(2),
        borderBottom: '1px solid #555',
    },
    sidebarList: {
        listStyle: 'none',
        paddingLeft: 0,
    },
    sidebarListItem: {
        padding: theme.spacing(1, 2),
    },
    sidebarLink: {
        width: '100%',
        color: '#fff',
        textDecoration: 'none',
        display: 'block',
        padding: theme.spacing(1, 2),
        borderRadius: theme.shape.borderRadius,
        textAlign: 'center',
        backgroundColor: '#495057',
        '&:hover': {
            backgroundColor: '#6c757d',
        },
    },
   
}));

const LandingPage: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            {/* Sidebar */}
            <Typography>
                <nav className={classes.sidebar}>
                    <div className={classes.sidebarHeader}>
                        <Typography variant="h6">Solely Mart</Typography>
                    </div>

                    <ul className={classes.sidebarList}>
                        <li className={classes.sidebarListItem}>
                            <Link to="/brand-list" className={classes.sidebarLink}>Manage Brands</Link>
                        </li>
                        <li className={classes.sidebarListItem}>
                            <Link to="/supplier-list" className={classes.sidebarLink}>Manage Suppliers</Link>
                        </li>
                        <li className={classes.sidebarListItem}>
                            <Link to="/category-list" className={classes.sidebarLink}>Manage Categories</Link>
                        </li>
                        <li className={classes.sidebarListItem}>
                            <Link to="/order-list" className={classes.sidebarLink}>Manage Orders</Link>
                        </li>
                        <li className={classes.sidebarListItem}>
                            <Link to="/tag-list" className={classes.sidebarLink}>Manage Tags</Link>
                        </li>
                        <li className={classes.sidebarListItem}>
                            <Link to="/purchase-list" className={classes.sidebarLink}>Manage Purchases</Link>
                        </li>
                        {/*<li className={classes.sidebarListItem}>*/}
                        {/*    <Link to="/stock-list" className={classes.sidebarLink}>Manage Stocks</Link>*/}
                        {/*</li>*/}
                        <li className={classes.sidebarListItem}>
                            <Link to="/product-list" className={classes.sidebarLink}>Manage Product</Link>
                        </li>
                    </ul>

                </nav>
            </Typography>

            {/* Content Area */}
            <div className={classes.content}>
              
                <Container>
                   
                                    <div >
                                        <h1>Welcome to the Dashboard</h1>
                                        <p>We're glad to have you here. Explore and manage your data with ease.</p>
                                    </div>
                            

                </Container>
            </div>
        </div>
    );
};

export default LandingPage;
