import React from "react"
import { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2";

Chart.register(...registerables)

export default function InstructorChart({ courses }) {

  const [currChart, setCurrChart] = useState("students")


  const generateRandomColors = (numColors) => {
    const colors = []
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`
      colors.push(color)
    }
    return colors
  }


  const chartDataStudents = {
    labels: courses?.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: generateRandomColors(courses.length),
        borderColor: "white"
      },
    ],
  }


  const chartIncomeData = {
    labels: courses?.map((course) => course.courseName),
    datasets: [
      {
        data: courses?.map((course) => course.totalAmountGenerated),
        backgroundColor: generateRandomColors(courses.length),
        borderColor: "white"
      },
    ],
  }


  const options = {
    maintainAspectRatio: false,
  }

  return (

    <div
    className="
        flex flex-1 min-w-0 flex-col gap-y-5 rounded-2xl border
        border-white/10
        bg-btn-secondary
        p-10
        sm:p-6
    "
    >
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <p className="text-lg sm:text-xl font-bold text-white">
                    Visualize
                </p>

                <p className="mt-1 text-xs sm:text-sm text-gray-400">
                    Track your course performance
                </p>
            </div>

            {/* Chart Toggle */}
            <div
            className="
                flex
                w-full
                rounded-xl
                bg-btn-secondary-hover
                p-1
                sm:w-fit
            "
            >
                {/* Students */}
                <button
                    onClick={() => setCurrChart("students")}
                    className={`
                    flex-1
                    rounded-lg
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    transition-all
                    duration-200
                    sm:flex-none
                    ${
                        currChart === "students"
                        ? "bg-btn-primary text-black shadow-md"
                        : "text-gray-400 hover:text-white"
                    }
                    `}
                >
                    Students
                </button>

                {/* Income */}
                <button
                    onClick={() => setCurrChart("income")}
                    className={`
                    flex-1
                    rounded-lg
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    transition-all
                    duration-200
                    sm:flex-none
                    ${
                        currChart === "income"
                        ? "bg-btn-primary text-black shadow-md"
                        : "text-gray-400 hover:text-white"
                    }
                    `}
                >
                    Income
                </button>
            </div>
        </div>

        {/* Chart */}
        <div
            className="
            my-auto
            relative
            mx-auto
            flex
            w-full
            max-w-[580px]
            items-center
            justify-center
            aspect-square
            min-h-60
            sm:min-h-[300px]
            lg:min-h-[340px]
            "
        >
            <Pie 
            data={
                currChart === "students"
                ? chartDataStudents
                : chartIncomeData
            }
            options={options}
            />
        </div>
    </div>
  )
}