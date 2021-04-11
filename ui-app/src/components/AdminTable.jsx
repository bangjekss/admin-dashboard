import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { accentColor, focusColor } from "../helpers";
import { ButtonAccent, ButtonColor, InputForm, Pagination } from ".";

const useStyles = makeStyles({
	iconWrapper: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: 35,
		height: 35,
		borderRadius: 50,
		"&:hover": {
			backgroundColor: "rgba(0,0,0,0.2)",
		},
	},
});

function AdminTable({
	pagination,
	columnData,
	rowData,
	editIndex,
	firstEvent,
	secondEvent,
	thirdEvent,
	firstIcon,
	secondIcon,
	productId,
}) {
	const styles = useStyles();
	const [page, setPage] = useState(0);
	const [limit, setLimit] = useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeLimit = (event) => {
		setLimit(event.target.value);
		setPage(0);
	};
	return (
		<div>
			<TableContainer>
				<Table stickyHeader>
					<TableHead>
						<TableRow>
							{columnData.map((value) => (
								<TableCell key={value.columnId} align={value.align} style={{ minWidth: value.minWidth }}>
									<div style={{ fontWeight: 600 }}>{value.label}</div>
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rowData.map((row) => {
							return (
								<TableRow>
									<TableCell>
										<img src={row.name} style={{ width: 75, height: 75 }} />
									</TableCell>
									<TableCell>
										<div>{row.name}</div>
									</TableCell>
									<TableCell>
										<div>{row.category.category}</div>
									</TableCell>
									<TableCell>
										<div>{row.description}</div>
									</TableCell>
									<TableCell align="right">
										<div>{row.weight.toLocaleString()}</div>
									</TableCell>
									<TableCell align="right">
										<div>{row.price.toLocaleString()}</div>
									</TableCell>
									<TableCell>
										<div>{row.inventory[0].stock}</div>
									</TableCell>
									<TableCell>
										<div>{row.inventory[1].stock}</div>
									</TableCell>
									<TableCell>
										<div>{row.inventory[2].stock}</div>
									</TableCell>
									<TableCell>
										<div className="d-flex justify-content-center">
											<ButtonAccent text="Edit" px={10} py={5} fontSize={12} />
											<ButtonColor color="danger" icon="bi bi-trash" px={10} py={5} fontSize={12} />
										</div>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			{pagination ? <Pagination limit={10} total={100} neighbours={2} /> : null}
			{/* <TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={15}
				rowsPerPage={limit}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeLimit}
			/> */}
		</div>
	);
}

export default AdminTable;
