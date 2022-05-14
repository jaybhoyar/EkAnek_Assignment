import React, { useState } from "react";

import { Formik, Form, validateYupSchema } from "formik";
import { Button, Pane } from "neetoui";
import { Input, Textarea } from "neetoui/formik";

import API from "apis/records";

import { INITIAL_FORM_VALUES, VALIDATION_SCHEMA } from "../constants";

export default function RecordForm({ onClose, refetch }) {
	const [formValues] = useState(INITIAL_FORM_VALUES);
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = async (values) => {
		try {
			const formData = new FormData();
			formData.append("record[title]", values.title);
			formData.append("record[description]", values.description);
			formData.append("record[file]", values.file);
			const res = await API.create(formData);
			console.log(res);
			refetch();
			onClose();
		} catch (err) {
			logger.error(err);
		}
	};

	return (
		<Formik
			initialValues={formValues}
			onSubmit={handleSubmit}
			validateOnBlur={submitted}
			validateOnChange={submitted}
			validationSchema={VALIDATION_SCHEMA}
		>
			{({ isSubmitting, setFieldValue }) => (
				<Form className="w-full" encType="multipart/form-data">
					<Pane.Body className="space-y-6">
						<Input
							label="Title"
							name="title"
							className="w-full flex-grow-0"
							required
						/>
						<Textarea
							label="Description"
							name="description"
							className="w-full flex-grow-0"
							rows={8}
							required
						/>
						<input
							type="file"
							name="file"
							accept="*"
							onChange={(event) => {
								setFieldValue(
									"file",
									event.currentTarget.files[0]
								);
							}}
						/>
					</Pane.Body>
					<Pane.Footer>
						<Button
							type="submit"
							label={"Save Changes"}
							size="large"
							style="primary"
							className="mr-3"
							disabled={isSubmitting}
							loading={isSubmitting}
							onClick={() => setSubmitted(true)}
						/>
						<Button
							onClick={onClose}
							label="Cancel"
							size="large"
							style="text"
						/>
					</Pane.Footer>
				</Form>
			)}
		</Formik>
	);
}
