import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import type { IStock } from '../interface/IStock.interface';

interface Props {
    stocks         : IStock[];
    onEditar       : (stock: IStock) => void;
    puedeEditar    : boolean;
    cargandoEditar?: boolean;
}

export const StockLista = ({ stocks, onEditar, puedeEditar, cargandoEditar }: Props) => {
    return (
        <TableContainer component={Paper} variant="outlined">
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ width: 32 }} />
                        <TableCell>Producto</TableCell>
                        <TableCell>Almacén</TableCell>
                        <TableCell align="right">Stock Actual</TableCell>
                        <TableCell align="right">Stock Mínimo</TableCell>
                        <TableCell align="right">Stock Máximo</TableCell>
                        <TableCell>Actualización</TableCell>
                        {puedeEditar && <TableCell align="center">Acciones</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stocks.map((stock) => {
                        const enAlerta = stock.stockMinimo > 0 && stock.stockActual < stock.stockMinimo;
                        return (
                            <TableRow
                                key={`${stock.codigoProducto}-${stock.codigoAlmacen}`}
                                hover
                                sx={enAlerta ? { backgroundColor: 'warning.light' } : undefined}
                            >
                                <TableCell>
                                    {enAlerta && (
                                        <Tooltip title="Stock bajo mínimo">
                                            <WarningAmberIcon fontSize="small" color="warning" />
                                        </Tooltip>
                                    )}
                                </TableCell>
                                <TableCell>{stock.codigoProducto}</TableCell>
                                <TableCell>{stock.codigoAlmacen}</TableCell>
                                <TableCell align="right">{stock.stockActual.toFixed(2)}</TableCell>
                                <TableCell align="right">{stock.stockMinimo.toFixed(2)}</TableCell>
                                <TableCell align="right">{stock.stockMaximo.toFixed(2)}</TableCell>
                                <TableCell>{stock.fechaActualizacion ?? '-'}</TableCell>
                                {puedeEditar && (
                                    <TableCell align="center">
                                        <IconButton
                                            size="small"
                                            color="primary"
                                            title="Editar límites"
                                            disabled={cargandoEditar}
                                            onClick={() => onEditar(stock)}
                                        >
                                            {cargandoEditar
                                                ? <CircularProgress size={14} color="inherit" />
                                                : <EditIcon fontSize="small" />}
                                        </IconButton>
                                    </TableCell>
                                )}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
