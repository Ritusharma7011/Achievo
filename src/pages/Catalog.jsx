import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import Footer from "../components/common/Footer"
import CourseCard from "../components/core/Catalog/CourseCard"
import CourseSlider from "../components/core/Catalog/CourseSlider"
import { apiConnector } from "../services/apiConnector"
import { categories } from "../services/apis"
import { getCatalogPageData } from "../services/operations/pageAndComponentDatas"
import Error from "./Error"
import Loading from "../components/common/Loading"

function Catalog() {
  const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()

  const [active, setActive] = useState(1)
  const [catalogPageData, setCatalogPageData] = useState(null)
  const [categoryId, setCategoryId] = useState("")
  const [categoryLoading, setCategoryLoading] = useState(true)
  const [catalogLoading, setCatalogLoading] = useState(false)

  // --------------------------------
  // GET CATEGORY ID
  // --------------------------------
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setCategoryLoading(true)

        console.log("CATALOG NAME:", catalogName)

        const res = await apiConnector(
          "GET",
          categories.CATEGORIES_API
        )

        console.log("CATEGORY API RESPONSE:", res?.data)

        const allCategories = res?.data?.allCategories

        console.log("ALL CATEGORIES:", allCategories)

        if (!allCategories || !Array.isArray(allCategories)) {
          console.log("Categories data not found")
          setCategoryId("")
          return
        }

        const selectedCategory = allCategories.find(
          (category) =>
            category?.name
              ?.split(" ")
              .join("-")
              .toLowerCase() === catalogName?.toLowerCase()
        )

        console.log("SELECTED CATEGORY:", selectedCategory)

        if (!selectedCategory) {
          console.log("Category not found")
          setCategoryId("")
          return
        }

        setCategoryId(selectedCategory._id)
      } catch (error) {
        console.log("Could not fetch Categories:", error)
        setCategoryId("")
      } finally {
        setCategoryLoading(false)
      }
    }

    if (catalogName) {
      fetchCategory()
    }
  }, [catalogName])

  // --------------------------------
  // GET CATALOG PAGE DATA
  // --------------------------------
  useEffect(() => {
    const fetchCatalogData = async () => {
      try {
        setCatalogLoading(true)

        console.log("CATEGORY ID:", categoryId)

        const res = await getCatalogPageData(categoryId)

        console.log("CATALOG PAGE RESPONSE:", res)

        setCatalogPageData(res)
      } catch (error) {
        console.log("CATALOG PAGE ERROR:", error)
        setCatalogPageData(null)
      } finally {
        setCatalogLoading(false)
      }
    }

    if (categoryId) {
      fetchCatalogData()
    }
  }, [categoryId])

  // --------------------------------
  // LOADING
  // --------------------------------
  if (
    loading ||
    categoryLoading ||
    catalogLoading ||
    !catalogPageData
  ) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-[#0f0f12]">
        <Loading/>
      </div>
    )
  }

  // --------------------------------
  // ERROR
  // --------------------------------
  if (!catalogPageData?.success) {
    return <Error />
  }

  const selectedCategory =
    catalogPageData?.data?.selectedCategory

  const differentCategory =
    catalogPageData?.data?.differentCategory

  const mostSellingCourses =
    catalogPageData?.data?.mostSellingCourses || []

  const selectedCourses =
    selectedCategory?.courses || []

  const differentCourses =
    differentCategory?.courses || []

  return (
    <>
      {/* =========================
          HERO SECTION
      ========================== */}
      <section className="bg-[#121216] px-4 py-12 sm:py-16">
        <div className="mx-auto w-full max-w-7xl">
          <p className="mb-4 text-sm text-gray-500">
            Home / Catalog /{" "}
            <span className="text-purple-400">
              {selectedCategory?.name}
            </span>
          </p>

          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            {selectedCategory?.name}
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-400 sm:text-base">
            {selectedCategory?.description}
          </p>
        </div>
      </section>

      {/* =========================
          SECTION 1
      ========================== */}
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto w-full max-w-7xl">
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Courses to get you started
          </h2>

          {/* Tabs */}
          <div className="mt-6 flex w-fit border-b border-white/10">
            <button
              onClick={() => setActive(1)}
              className={`px-4 py-3 text-sm font-medium transition ${
                active === 1
                  ? "border-b-2 border-purple-500 text-purple-400"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Most Popular
            </button>

            <button
              onClick={() => setActive(2)}
              className={`px-4 py-3 text-sm font-medium transition ${
                active === 2
                  ? "border-b-2 border-purple-500 text-purple-400"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              New
            </button>
          </div>

          <div className="mt-8">
            {selectedCourses.length > 0 ? (
              <CourseSlider courses={selectedCourses} />
            ) : (
              <div className="rounded-xl border border-white/10 bg-[#15151a] px-6 py-16 text-center">
                <p className="text-lg font-semibold text-white">
                  No courses available in this category
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  There are currently no published courses in{" "}
                  {selectedCategory?.name}.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================
          SECTION 2
      ========================== */}
      {differentCategory && (
        <section className="px-4 py-12 sm:py-16">
          <div className="mx-auto w-full max-w-7xl">
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Top courses in{" "}
              <span className="text-purple-400">
                {differentCategory?.name}
              </span>
            </h2>

            <div className="mt-8">
              {differentCourses.length > 0 ? (
                <CourseSlider courses={differentCourses} />
              ) : (
                <div className="rounded-xl border border-white/10 bg-[#15151a] px-6 py-12 text-center">
                  <p className="text-gray-400">
                    No courses available in this category.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* =========================
          SECTION 3
      ========================== */}
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto w-full max-w-7xl">
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Frequently Bought
          </h2>

          {mostSellingCourses.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {mostSellingCourses.slice(0, 8).map((course, index) => (
                <CourseCard
                  course={course}
                  key={course?._id || index}
                  Height="h-[240px]"
                />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-xl border border-white/10 bg-[#15151a] px-6 py-12 text-center">
              <p className="text-gray-400">
                No courses available.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Catalog