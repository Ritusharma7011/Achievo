import React from "react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function RequirementsField({
	name,
	label,
	register,
	setValue,
	errors,
	getValues,
	}) {
	const { editCourse, course } = useSelector((state) => state.course)
	const [requirement, setRequirement] = useState("")
	const [requirementsList, setRequirementsList] = useState([])

	useEffect(() => {
		if (editCourse) {
			setRequirementsList(course?.instructions)
		}
		register(name, { required: true, validate: (value) => value.length > 0 })

	}, [])
	useEffect(() => {
		setValue(name, requirementsList)

	}, [requirementsList])

	const handleAddRequirement = () => {
		if (requirement) {
			setRequirementsList([...requirementsList, requirement])
			setRequirement("")
		}
	}

	const handleRemoveRequirement = (index) => {
		const updatedRequirements = [...requirementsList]
		updatedRequirements.splice(index, 1)
		setRequirementsList(updatedRequirements)
	}

	return (
		<div className="flex flex-col">
		<label className="" htmlFor={name}>
			{label} <sup className="text-red-400">*</sup>
		</label>
		<div className="flex flex-col items-start space-y-2">
			<textarea
				rows={1}
			type="text"
			id={name}
			value={requirement}
			placeholder="Add requirements/instructions for the course"
			onChange={(e) => setRequirement(e.target.value)}
			className="w-full text-[15px]  bg-btn-secondary-hover rounded-md px-3 py-2 focus:outline-none focus:border focus:border-gray-700 "
			/>
			<button
			type="button"
			onClick={handleAddRequirement}
			className="font-semibold cursor-pointer text-purple-200 tracking-wider"
			>
			Add
			</button>
		</div>
		{requirementsList.length > 0 && (
			<ul className="mt-2 list-inside list-disc">
			{requirementsList.map((requirement, index) => (
				<li key={index} className="flex items-center text-richblack-5">
				<span>{requirement}</span>
				<button
					type="button"
					className="ml-2 cursor-pointer text-xs text-gray-500 "
					onClick={() => handleRemoveRequirement(index)}
				>
					clear
				</button>
				</li>
			))}
			</ul>
		)}
		{errors[name] && (
			<span className="ml-2 text-xs tracking-wide text-red-400">
			{label} is required
			</span>
		)}
		</div>
	)
}