import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import type { IKardex } from '../interface/IKardex.interface';

interface Props {
    kardexItems: IKardex[];
}

export const KardexLista = ({ kardexItems }: Props) => {
    return (
        <TableContainer component={Paper} variant="outlined">
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Producto</TableCell>
                        <TableCell>Almacén</TableCell>
                        <TableCell align="right">Cantidad</TableCell>
                        <TableCell align="right">Saldo</TableCell>
                        <TableCell>Referencia</TableCell>
                        <TableCell>Código Ref.</TableCell>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Usuario</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {kardexItems.map((k) => (
                        <TableRow key={k.idKardex} hover>
                            <TableCell>
                                <Chip
                                    label={k.tipoMovimiento}
                                    size="small"
                                    color={k.tipoMovimiento === 'ENTRADA' ? 'success' : 'error'}
                                    variant="outlined"
                                />
                            </TableCell>
                            <TableCell>{k.codigoProducto}</TableCell>
                            <TableCell>{k.codigoAlmacen}</TableCell>
                            <TableCell align="right">{k.cantidad.toFixed(2)}</TableCell>
                            <TableCell align="right">{k.saldoUnidades.toFixed(2)}</TableCell>
                            <TableCell>{k.referenciaTipo}</TableCell>
                            <TableCell>{k.referenciaCodig}</TableCell>
                            <TableCell>{k.fechaMovimiento ?? '-'}</TableCell>
                            <TableCell>{k.usuarioRegistro}</TableCell>
                        </TableRow>
                    ))}
                    {kardexItems.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={9} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                                No hay movimientos registrados.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
