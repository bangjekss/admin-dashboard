import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ButtonAccent, ButtonSurface, InputGroupIcon, LoaderPage, AdminTable, ButtonColor } from "../components";
import { apiUrl } from "../helpers";
import { getProductsAdmin, deleteMultipleProduct } from "../redux/actions";

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
	const [toggleDelete, setToggleDelete] = useState(false);
	const [editIndex, setEditIndex] = useState([]);
	const [inventory, setInventory] = useState([]);
	const [check, setCheck] = useState([]);

	useEffect(() => {
		dispatch(getProductsAdmin());
	}, []);

	if (!products) return <LoaderPage />;
	if (isLoading) return <LoaderPage />;
	if (isLoadingAuth) return <LoaderPage />;

	const handleCheck = (e, productId) => {
		console.log(e.target.checked, productId);
		let updateCheck = check;
		if (e.target.checked) {
			updateCheck.push(productId);
		} else {
			const idx = updateCheck.findIndex((value) => value === productId);
			updateCheck.splice(idx, 1);
		}
		setCheck(updateCheck);
		console.log(check);
	};
	console.log(check);
	const handleDeleteBtn = () => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(deleteMultipleProduct(check));
			}
		});
		setToggleDelete((prev) => !prev);
		setCheck([]);
	};

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
					<div className="d-flex">
						<div className="mr-1">
							<Link to="/admin/add-product">
								<ButtonSurface text="+ New Product" />
							</Link>
						</div>
						{toggleDelete ? (
							<ButtonColor color="danger" text="delete selected" onClick={handleDeleteBtn} />
						) : (
							<ButtonColor color="danger" icon="bi bi-trash" onClick={() => setToggleDelete((prev) => !prev)} />
						)}
					</div>
				</div>
			</div>
			<AdminTable
				pagination={true}
				columnData={columnData}
				rowData={products}
				editIndex={editIndex}
				firstIcon="bi bi-pencil-square"
				secondIcon="bi bi-trash"
				firstToggle={toggleDelete}
				firstEvent={handleCheck}
			/>
		</div>
	);
};

export default AdminProductPage;
