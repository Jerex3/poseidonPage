//Libs
import React, { useEffect, Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
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

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FilterListIcon from '@material-ui/icons/FilterList';
import DeleteIcon from '@material-ui/icons/Delete';
import BuildIcon from '@material-ui/icons/Build';
import { ButtonGroup } from '@material-ui/core';




//Components
//External
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
//Internal
import Rows from './Rows.js'
import { ButtonRedirect } from '../Email/ButtonRedirect'
import fetchFilter from '../../services/filter';
import { LoaderBall } from '../Animations/LoaderBall'


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

  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, adding, ...rest } = props;
  const createSortHandler = (property) => (event) => {
    console.log('ordeno por' + property)
    onRequestSort(property);
  };


  function DefaultConfiguration(headerCell) {

    var resultHeader = new Array();

    headerCell.forEach(element => {
      if (!element.id.toLowerCase().includes("id") || element.id == 'apellido'){
        resultHeader.push(
          {
            id: element.id,
            numeric: false,
            disablePadding: false,
            label: element.id.toUpperCase()
          }
        );
      }
    })
    return resultHeader;
  }

  function GetKeys(props) {
    return Object.keys(props.data[0]);
  }

  function A(props) {
    var keys = GetKeys(props);
    var headerCell = new Array();
    keys.forEach(element => {
      if(!element.toLowerCase().includes("id") || element == 'apellido'){
        headerCell.push({ id: element });
      }
    });
    return DefaultConfiguration(headerCell);
  }


  const headCells = A(props);
  return (
    <TableHead>
      <TableRow>
        {adding ? (
          <TableCell>
            ACTIONS
          </TableCell>
        ) : (
          <TableCell />
          )}

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
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

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.7),
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

  const { selected, adding, setFilterValue, handleChangeViewBrowse, viewBrowse, ...rest } = props

  const numSelected = selected.length;


  
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} {props.title.toLowerCase().slice(0,-2)} seleccionado
        </Typography>
      ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            {props.title}
          </Typography>
      )}

      {viewBrowse ? (
        <TextField ref = {props.filterRef} id="filterCommon" label="Buscar" variant="filled" color="secondary" onChange={(event) => setFilterValue(event.target.value)} />
      ) : (
        null
      )}

      {numSelected > 0 ? (
            <ButtonGroup >
              <Tooltip title="Delete" arrow>
                <IconButton aria-label="delete" onClick={event => props.deleteRow(event, selected[0]._id)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Modify">
                <IconButton 
                  arial-label="modify" 
                  onClick={
                    event => { 
                      if(!adding){
                        handleChangeViewBrowse(event);
                      } 
                      props.setAdding(true) 
                    }} 
                >
                  <BuildIcon />
                </IconButton>
              </Tooltip>
            </ButtonGroup>
          
      ) : (
            <ButtonGroup variant="contained">
              <Tooltip title="Add" className={classes.Tooltip}>
                <Button aria-label="add" onClick={(event) => props.handleChangeAdd(event)}>
                  <PersonAddRoundedIcon />
                </Button>
              </Tooltip>
              {!adding && <Tooltip title="Filter list" arrow>
                <Button aria-label="filter list" onClick={(event) => handleChangeViewBrowse(event)} >
                  <FilterListIcon />
                </Button>
              </Tooltip>}
            </ButtonGroup>
      )
        }
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  selected: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  deleteRow: PropTypes.func.isRequired
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

  const { title, data, picker, handleEmailContent, ...rest } = props;

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState();
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [adding, setAdding] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedIndexRow, setSelectedIndex] = React.useState([]);

  const [rows, setRows] = React.useState(data);

  const [filterData, setfilterData] = React.useState([])
  const [browsering, setBrowsering] = React.useState(false);
  const [viewBrowse, setviewBrowse] = React.useState(false);
  const [preSets, setPresets] = React.useState({});

  const[filterValue, setFilterValue] = React.useState('');

  const [backendPage, setBackendPage] = React.useState(1);
  // El limit llega como prop y es constante, no es necesario declararle un state.

  const arrowRight = "ArrowRight";
  const arrowLeft = "ArrowLeft";

  const clearState = () => {

    setRows()
    setOrder()
    setOrderBy()
    setSelected()
    setPage()
    setDense()
    setAdding()
    setRowsPerPage()
    setSelectedIndex()
    setfilterData()
    setBrowsering()
    setviewBrowse()
    setPresets()
    setBackendPage()
    setFilterValue()

  }

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

    if(!adding && !selected.length){
      if(event.key == "x"){
        handleChangeViewBrowse(event)
        event.preventDefault();
        document.getElementById('filterCommon').focus();  
      }
    }
    

    if(viewBrowse){
      if(event.key == "Enter"){
        setBrowsering(true)
        filter()
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

  }, [viewBrowse, filterValue, browsering, adding, selected])

  useEffect(() => { 
    return () => clearState()
  }, [])

  useEffect(() => {
    setBackendPage(1)
    setSelected([])
    setSelectedIndex([])
    setPage(0)
  }, [orderBy, order])


  const handleChangeViewBrowse = (event) => {
    
    setviewBrowse(!viewBrowse);

    if(!viewBrowse){
      setfilterData("");
    }
  };

  const filter = () => {

    setBrowsering(true)
    switch (title) {
      case 'Clientes':
        fetchFilter.filterClient(JSON.stringify({ filter: filterValue }))
          .then(dataFilter => {
            if(dataFilter)
              setfilterData(dataFilter)
            setBrowsering(false)
          })
      break;
  
      case 'Alquileres':
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
    setBrowsering(true)

    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);

    props.getPage(1, props.limit, property, isAsc ? 1 : -1)
    .then((sortedData) => {
      setRows(sortedData)
      setBrowsering(false)
    })

  };


  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, Row, index) => {

    const selectedIndex = selected.indexOf(Row);
    if (selectedIndex === -1) {
      setSelected([Row]);
      setSelectedIndex([index]);
    } else if (selectedIndex === 0) {
      setSelected([])
      setSelectedIndex([])
    }
    console.log(selected)

  };

  const handleChangePage = (event, newPage) => { // CONTROL DE PAGINATION

    console.log(newPage)
    console.log(backendPage)
    if((backendPage*props.limit) < ((newPage+1)*rowsPerPage) )
    {
      setBrowsering(true);
      let orderN
      if(order == 'asc') orderN = -1; else orderN = 1


      props.getPage(backendPage+1, props.limit, orderBy, orderN)
      .then((pageData) => {
        setRows(prevState => prevState.concat(pageData))
        setBrowsering(false)
        setBackendPage(backendPage+1)
        setPage(newPage);
      })
    }
    else
    {
      setPage(newPage)
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleChangeAdd = () => {
    setAdding(!adding);
  }


  const deleteRow = (event, idToDelete) => {

    

    props.delete(idToDelete)
      .then(response => {
        setSelected([])
      })

  };

  const addRow = (newRow, nameTable) => {

    if(nameTable != 'Clientes'){
      props.post(JSON.stringify(newRow[0]))
      .then((res) => {
        handleChangeAdd()
      })
      .catch(err => console.log(err))

    }else{
      props.post(JSON.stringify(newRow))
      .then(() => {
        handleChangeAdd()
      })
      .catch(err => console.log(err))
    }
    
  }


  const modifyRow = (id, modifyRow) => { // El problema esta con modificar los id cuando cambiamos el orden

    props.update(id, JSON.stringify(modifyRow))
      .then(res => handleChangeAdd())
      .catch(err => console.log(err))
  }

  const filterRef = useRef(null)

  return (
    <Fragment>
    { browsering && <LoaderBall /> }
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          selected={selected}
          title={title}
          deleteRow={deleteRow}
          handleChangeAdd={handleChangeAdd}
          setAdding={setAdding}
          setPresets={setPresets}
          handleChangeViewBrowse={handleChangeViewBrowse}
          viewBrowse={viewBrowse}
          filterRef = {filterRef}
          setFilterValue={setFilterValue}
          adding={adding}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              data={data}
              adding={adding}
            />
  
              <Rows
              title = {title}
              stableSort={stableSort}
              getComparator={getComparator}
              rows={filterData.length && viewBrowse ? filterData : rows}
              order={order}
              orderBy={orderBy}
              page={page}
              selected={selected}
              rowsPerPage={rowsPerPage}
              handleClick={handleClick}
              adding={adding}
              addRow={addRow}
              modifyRow={modifyRow}
              handleAdding={handleChangeAdd}
              handleIngresoData = {props.handleIngresoData}
              handleData = {props.handleData}
              clientsData = {props.clientsData}
              placesData = {props.placesData}
              pricesData = {props.pricesData}
             />
          </Table>
        </TableContainer>
        {!adding && <TablePagination
          rowsPerPageOptions={[5, 50, 100]}
          component="div"
          count={999}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          en
        />}
      </Paper>
      
      {!adding &&  <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding">
        </FormControlLabel>}

    </div>
    {selected.length ?<div className="footer-button">
        <ButtonRedirect request={title} selected={selected} handleEmailContent={handleEmailContent} />
    </div> : null}
    </Fragment>
  );
}
