//Libs
import React, { Fragment, useEffect } from 'react';

import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import Tooltip from '@material-ui/core/Tooltip';

import FilterListIcon from '@material-ui/icons/FilterList';

import { ButtonGroup } from '@material-ui/core';



//Components--------------------------
//External
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
//Internal
import Rows from './Rows.js'
import fetchFilter from '../../services/filter';
import { LoaderBall } from '../Animations/LoaderBall';

//----------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {

  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {

  const { classes, onSelectAllClick, order, orderBy, rowCount, onRequestSort, ...rest } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(property);
  };


  function DefaultConfiguration(headerCell) {

    var resultHeader = new Array();

    headerCell.forEach(element => {
      resultHeader.push(
        {
          id: element.id,
          numeric: false,
          disablePadding: false,
          label: element.id.toUpperCase()
        }
      );
    })
    return resultHeader;
  }

  function GetKeys() {
    return Object.keys(props.data[0]);
  }

  function A() {
    var keys = GetKeys();
    var headerCell = new Array();
    keys.forEach(element => {
      if (element != "_id") {
        headerCell.push({ id: element });
      }
    });
    return DefaultConfiguration(headerCell);
  }

  const headCells = A(props);
  return (
    <TableHead>
      <TableRow>
        <TableCell />
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.primary.main,
        backgroundColor: lighten(theme.palette.primary.light, 0.7),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.primary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();

  const { title, setFilterValue, viewBrowse, handleChangeViewBrowse, ...rest } = props

  return (
    <Toolbar>

      <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
        {title}
      </Typography>

      {viewBrowse ? (
        <TextField id="filterCommon" label="Buscar" variant="filled" color="secondary" onChange={(event) => setFilterValue(event.target.value)} />
      ) : (
          <div />
        )}
      <ButtonGroup variant="contained">
        <Tooltip title="Filter list" arrow>
          <Button aria-label="filter list" onClick={(event) => handleChangeViewBrowse(event)} >
            <FilterListIcon />
          </Button>
        </Tooltip>
      </ButtonGroup>

    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },


}));

export default function EnhancedTable(props) {

  const { title, data, setInfoTablePick, onClick, ...rest } = props;

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('cost');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState(data);

  const [filterData, setfilterData] = React.useState([])
  const [browsering, setBrowsering] = React.useState(false);
  const [viewBrowse, setviewBrowse] = React.useState(false);

  const [filterValue, setFilterValue] = React.useState('');

  const [backendPage, setBackendPage] = React.useState(1);

  const clearState = () => {

    setRows()
    setOrder()
    setOrderBy()
    setPage()
    setRowsPerPage()
    setfilterData()
    setBrowsering()
    setviewBrowse()
    setBackendPage()
    setFilterValue()

  }

  const arrowRight = "ArrowRight";
  const arrowLeft = "ArrowLeft";

  const anyKey = (event) => {

    if (page != 0){
      if( event.key == arrowLeft)
        handleChangePage(event, page - 1);
    }

    const max = Math.floor(rows.length / rowsPerPage);

    if (page < max){
      if( event.key == arrowRight)
        handleChangePage(event, page + 1)
    }
  }

  const pressEnter = (event) => {

    if (event.key == "x") {
      handleChangeViewBrowse(event)
      event.preventDefault();
      document.getElementById('filterCommon').focus();
    }


    if (viewBrowse) {
      if (event.key == "Enter") {
        filter()
        setBrowsering(true)
      }
    }
  }

  useEffect(() => {
    
    document.addEventListener("keydown", anyKey)

    return () => {
      document.removeEventListener("keydown", anyKey)
    }

  }, [page])

  useEffect(() => {

    document.addEventListener("keydown", pressEnter)

    return () => {
      document.removeEventListener("keydown", pressEnter)
    }

  }, [viewBrowse, filterValue, browsering])

  useEffect(() => {
    return () => clearState()
  }, [])

  const handleChangeViewBrowse = (event) => {
    setviewBrowse(!viewBrowse);
    if(!viewBrowse){
      setfilterData("");
    }
  };

  const filter = () => {

    switch (title) {
      case 'Clientes':
        fetchFilter.filterClient(JSON.stringify({ filter: filterValue }))
          .then(dataFilter => {
            if(dataFilter)
              setfilterData(dataFilter)
            setBrowsering(false)
          })
      break;
  
      case 'Sombrillas':
        fetchFilter.filterRent(JSON.stringify({ filter: filterValue }))
          .then(dataFilter => {
            if(dataFilter)
              setfilterData(dataFilter)
            setBrowsering(false)
          })

      break;

      default:
      break;
    }
  }

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    if ((backendPage * props.limit) < ((newPage + 1) * rowsPerPage)) {

      props.getPage(backendPage + 1, props.limit)
        .then((pageData) => {
          console.log(pageData)
          // rows.concat(pageData)
          setRows(prevState => prevState.concat(pageData))
          console.log(rows)
          setBackendPage(backendPage + 1)
        })
    }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Fragment>
    { browsering && <LoaderBall stylesP={{left: "8%", top: "17%"}}/> }
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          setFilterValue={setFilterValue}
          title={title}
          viewBrowse={viewBrowse}
          handleChangeViewBrowse={handleChangeViewBrowse}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              data={data}
            />
            <Rows
              title={title}
              stableSort={stableSort}
              getComparator={getComparator}
              rows={filterData.length && viewBrowse ? filterData : rows}
              order={order}
              orderBy={orderBy}
              page={page}
              selected={"0"}
              rowsPerPage={rowsPerPage}
              handleClick={onClick}
            />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 50, 100]}
          component="div"
          count={999}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>

    </div>
    </Fragment>
  );
}
