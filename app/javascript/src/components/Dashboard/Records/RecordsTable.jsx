import React, { useState } from "react";
import copy from "copy-to-clipboard";
import { Button, Tooltip } from "@bigbinary/neetoui";

import DeleteAlert from "./DeleteAlert";

export default function RecordsTable({ fetchRecords, records = [] }) {
	const [showDeleteAlert, setShowDeleteAlert] = useState(false);
	const [selectedRecord, setSelectedRecord] = useState({});

	const handleDelete = (record) => {
		setSelectedRecord(record);
		setShowDeleteAlert(true);
	};

	const copyUrlToClipboard = async (slug) => {
		copy(window.location.href + slug);
	};

	return (
		<div className="notes-table-height w-full px-4">
			<table className="w-full divide-y divide-gray-200">
				<thead>
					<tr>
						<th
							scope="col"
							className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
						>
							Title
						</th>
						<th
							scope="col"
							className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
						>
							Description
						</th>
						<th
							scope="col"
							className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
						>
							File
						</th>
						<th
							scope="col"
							className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
						>
							Share
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200 bg-white">
					{records &&
						records.map((record, index) => (
							<tr key={index} className={"hover:bg-gray-100"}>
								<td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
									{record.title}
								</td>
								<td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
									{record.description}
								</td>
								<td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
									{record.filename}
								</td>
								<td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
									<Tooltip
										content={"Copy Public URL"}
										position="bottom"
									>
										<Button
											style="icon"
											icon="ri-file-copy-line"
											onClick={() =>
												copyUrlToClipboard(record.slug)
											}
										/>
									</Tooltip>
								</td>
								<td className="flex flex-row px-6 py-4 text-sm text-gray-600">
									<Tooltip
										content={"Delete"}
										position="bottom"
									>
										<Button
											style="icon"
											icon="ri-delete-bin-line"
											onClick={() => handleDelete(record)}
										/>
									</Tooltip>
								</td>
							</tr>
						))}
				</tbody>
			</table>
			{showDeleteAlert && (
				<DeleteAlert
					onClose={() => setShowDeleteAlert(false)}
					refetch={fetchRecords}
					selectedRecord={selectedRecord}
				/>
			)}
		</div>
	);
}
