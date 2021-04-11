import React, { Fragment, useEffect, useState } from "react";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";
const rangeNeighbours = (from, to) => {
	// const step = 1
	const range = [];
	while (from <= to) {
		range.push(from);
		from++;
	}
	return range;
};

function Pagination(props) {
	// const { onChangePage } = props;
	const neighbours = typeof props.neighbours === "number" ? Math.max(0, Math.min(props.neighbours, 2)) : 0;
	const limit = typeof props.limit === "number" ? props.limit : 0;
	const total = typeof props.total === "number" ? props.total : 0;
	const totalPages = Math.ceil(total / limit);

	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		gotoPage(1);
	}, []);

	const gotoPage = (page) => {
		const { onPageChanged = (f) => f } = props;
		const currentPage = Math.max(0, Math.min(page, totalPages));
		const paginationData = {
			currentPage,
			totalPages,
			limit,
			total,
		};

		setCurrentPage(currentPage, () => onPageChanged(paginationData));
	};

	const handleClick = (page) => (evt) => {
		// evt.preventDefault();
		gotoPage(page);
	};

	const handleMoveLeft = (evt) => {
		// evt.preventDefault();
		gotoPage(currentPage - neighbours * 2 - 1);
	};

	const handleMoveRight = (evt) => {
		// evt.preventDefault();
		gotoPage(currentPage + neighbours * 2 + 1);
	};

	const getPages = () => {
		const totalNumbers = neighbours * 2 + 3;
		const totalBlocks = totalNumbers + 2;

		if (totalPages > totalBlocks) {
			const startPage = Math.max(2, currentPage - neighbours);
			const endPage = Math.min(totalPages - 1, currentPage + neighbours);
			let pages = rangeNeighbours(startPage, endPage);
			const isLeftSpill = startPage > 2;
			const isRightSpill = totalPages - endPage > 1;
			const spillOffset = totalNumbers - (pages.length + 1);

			switch (true) {
				case isLeftSpill && !isRightSpill: {
					const extraPages = rangeNeighbours(startPage - spillOffset, startPage - 1);
					pages = [LEFT_PAGE, ...extraPages, ...pages];
					console.log(pages);
					break;
				}
				case !isLeftSpill && isRightSpill: {
					const extraPages = rangeNeighbours(endPage + 1, endPage + spillOffset);
					pages = [...pages, ...extraPages, RIGHT_PAGE];
					console.log(pages);
					break;
				}
				default: {
					pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
					console.log(pages);
					break;
				}
			}
			return [1, ...pages, totalPages];
		}
		return rangeNeighbours(1, totalPages);
	};

	const pages = getPages();

	return (
		<div>
			<nav>
				<ul className="pagination">
					{pages.map((page, index) => {
						if (page === LEFT_PAGE)
							return (
								<li key={index} className="page-item">
									<a className="page-link" href="#" aria-label="Previous" onClick={handleMoveLeft}>
										<span aria-hidden="true">&laquo;</span>
										<span className="sr-only">Previous</span>
									</a>
								</li>
							);

						if (page === RIGHT_PAGE)
							return (
								<li key={index} className="page-item">
									<a className="page-link" href="#" aria-label="Next" onClick={handleMoveRight}>
										<span aria-hidden="true">&raquo;</span>
										<span className="sr-only">Next</span>
									</a>
								</li>
							);

						return (
							<li key={index} className={`page-item${currentPage === page ? " active" : ""}`}>
								<a className="page-link" href="#" onClick={handleClick(page)}>
									{page}
								</a>
							</li>
						);
					})}
				</ul>
			</nav>
		</div>
	);
}

export default Pagination;
