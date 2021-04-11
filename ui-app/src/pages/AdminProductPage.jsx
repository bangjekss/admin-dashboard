import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ButtonAccent, ButtonSurface, InputGroupIcon, LoaderPage, AdminTable } from "../components";
import { apiUrl } from "../helpers";
import { getProductsAdmin } from "../redux/actions";

const columnData = [
	{
		columnId: 1,
		id: "image",
		label: "Image",
		minWidth: 0,
		maxWidth: 0,
	},
	{
		columnId: 2,
		id: "name",
		label: "Name",
		minWidth: 0,
		maxWidth: 0,
	},
	{
		columnId: 3,
		id: "category",
		label: "Category",
		minWidth: 0,
		maxWidth: 0,
	},
	{
		columnId: 4,
		id: "description",
		label: "Description",
		minWidth: "0px",
		maxWidth: "10px",
	},
	{
		columnId: 5,
		id: "weight",
		label: "Weight (gr)",
		minWidth: 0,
		maxWidth: 0,
		align: "right",
		format: (value) => value.toLocaleString(),
	},
	{
		columnId: 6,
		id: "price",
		label: "Price",
		minWidth: 0,
		maxWidth: 0,
		align: "right",
		format: (value) => value.toLocaleString(),
	},
	{
		columnId: 7,
		id: "bdg",
		label: "BDG",
		minWidth: 0,
		maxWidth: 0,
		align: "center",
		format: (value) => value.toLocaleString(),
	},
	{
		columnId: 8,
		id: "bsd",
		label: "BSD",
		minWidth: 0,
		maxWidth: 0,
		align: "center",
		format: (value) => value.toLocaleString(),
	},
	{
		columnId: 9,
		id: "jkt",
		label: "JKT",
		minWidth: 0,
		maxWidth: 0,
		align: "center",
		format: (value) => value.toLocaleString(),
	},
	{
		columnId: 10,
		id: "action",
		label: "Action",
		align: "center",
		minWidth: 0,
		maxWidth: 0,
	},
];

const AdminProductPage = () => {
	const dispatch = useDispatch();
	const { products, isLoading } = useSelector((state) => state.adminReducer);
	const isLoadingAuth = useSelector((state) => state.authReducer.isLoading);
	const [rowData, setRowData] = useState([]);
	const [toggleStock, setToggleStock] = useState(false);
	const [editIndex, setEditIndex] = useState([]);
	const [inventory, setInventory] = useState([]);

	useEffect(() => {
		dispatch(getProductsAdmin());
		setRowData(products);
	}, []);

	if (!products) return <LoaderPage />;
	if (isLoading) return <LoaderPage />;
	if (isLoadingAuth) return <LoaderPage />;

	return (
		<div style={{ paddingInline: 50, paddingBlock: 30 }}>
			<div className="d-flex justify-content-between align-items-center mb-3">
				<div>
					<InputGroupIcon
						placeholder="product name . . ."
						icon_first="bi bi-search"
						styleInputContainer={{
							backgroundColor: "white",
							borderRadius: 50,
							paddingBlock: 20,
							paddingInline: 25,
						}}
					/>
				</div>
				<div>
					<Link to="/admin/add-product">
						<ButtonSurface text="+ New Product" />
					</Link>
				</div>
			</div>
			<AdminTable
				pagination={true}
				columnData={columnData}
				rowData={rowData}
				editIndex={editIndex}
				// firstEvent={openEditStock}
				firstIcon="bi bi-pencil-square"
				secondIcon="bi bi-trash"
				// secondEvent={handleOnChange}
				// thirdEvent={handleSaveBtn}
			/>
		</div>
	);
};

export default AdminProductPage;
