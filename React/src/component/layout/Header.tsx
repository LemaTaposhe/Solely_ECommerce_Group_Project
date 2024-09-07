// import React from 'react';
// import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';
// import { Link } from 'react-router-dom';

// const useStyles = makeStyles((theme) => ({
//     title: {
//         flexGrow: 1,
//     },
//     link: {
//         color: 'inherit',
//         textDecoration: 'none',
//         marginRight: theme.spacing(2),
//     },
// }));

// const Header: React.FC = () => {
//     const classes = useStyles();

//     return (
//         <AppBar position="static">
//             <Toolbar>
//                 <Typography variant="h6" className={classes.title}>
//                     SOLALY MART
//                 </Typography>
//                 <Button color="inherit">
//                     <Link to="/" className={classes.link}>
//                         Home
//                     </Link>
//                 </Button>
//                 {/*<Button color="inherit">*/}
//                 {/*    <Link to="/product-list" className={classes.link}>*/}
//                 {/*        Products*/}
//                 {/*    </Link>*/}
//                 {/*</Button>*/}
//                 {/*<Button color="inherit">*/}
//                 {/*    <Link to="/brand-list" className={classes.link}>*/}
//                 {/*        Brands*/}
//                 {/*    </Link>*/}
//                 {/*</Button>*/}
//                 {/* Add more links as needed */}
//             </Toolbar>
//         </AppBar>
//     );
// };

// export default Header;
import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    navbar: {
        backgroundColor: '#343a40', // Match sidebar color
        padding: theme.spacing(2),
        borderBottom: '1px solid #555',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    navbarButton: {
        color: '#fff',
        marginLeft: theme.spacing(2),
        '&:hover': {
            backgroundColor: '#495057',
        },
    },
    title: {
        flexGrow: 1,
        color: '#fff',
        marginRight: 'auto', // Align the title to the left
        textDecoration: 'none',
    },
}));

const Header: React.FC = () => {
    const classes = useStyles();

    return (
        <nav className={classes.navbar}>
            {/*<Typography variant="h6" className={classes.title}>*/}
            {/*    SOLALY MART*/}
            {/*</Typography>*/}
            <Button className={classes.navbarButton} component={Link} to="/">Home</Button>
            <Button className={classes.navbarButton} component={Link} to="/login">Login</Button>
            <Button className={classes.navbarButton} component={Link} to="/logout">Logout</Button>
        </nav>
    );
};

export default Header;
