import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI"
import { updateCompletedLectures } from "../../../slices/viewCourseSlice"
import {
  BiSkipNextCircle,
  BiSkipPreviousCircle,
} from "react-icons/bi"

import { MdOutlineReplayCircleFilled } from "react-icons/md"

const VideoDetails = () => {
	const { courseId, sectionId, subsectionId } = useParams()

	const navigate = useNavigate()
	const location = useLocation()
	const playerRef = useRef(null)

	const dispatch = useDispatch()

	const { token } = useSelector((state) => state.auth)

	const {
		courseSectionData,
		courseEntireData,
		completedLectures,
	} = useSelector((state) => state.viewCourse)

	const [videoData, setVideoData] = useState(null)
	const [videoEnded, setVideoEnded] = useState(false)
	const [playing, setPlaying] = useState(false)
	const [loading, setLoading] = useState(false)

	//finding current video

	useEffect(() => {
		if (!courseSectionData?.length) return

		if (!courseId || !sectionId || !subsectionId) {
		navigate("/dashboard/enrolled-courses")
		return
		}

		const currentSection = courseSectionData.find(
		(section) => section._id === sectionId
		)

		if (!currentSection) {
		navigate("/dashboard/enrolled-courses")
		return
		}

		const currentVideo = currentSection.subsection?.find(
		(subsection) => subsection._id === subsectionId
		)

		if (!currentVideo) {
		navigate("/dashboard/enrolled-courses")
		return
		}

		setVideoData(currentVideo)
		setVideoEnded(false)
		setPlaying(false)
	}, [
		courseSectionData,
		courseId,
		sectionId,
		subsectionId,
		location.pathname,
		navigate,
	])

  	// First Video
	const isFirstVideo = () => {
		if (!courseSectionData?.length) return true

		const currentSectionIndex = courseSectionData.findIndex(
		(section) => section._id === sectionId
		)

		if (currentSectionIndex === -1) return true

		const currentSubSectionIndex =
		courseSectionData[currentSectionIndex].subsection.findIndex(
			(subsection) => subsection._id === subsectionId
		)

		return (
		currentSectionIndex === 0 &&
		currentSubSectionIndex === 0
		)
	}

	// LAST VIDEO
	const isLastVideo = () => {
		if (!courseSectionData?.length) return true

		const currentSectionIndex = courseSectionData.findIndex(
		(section) => section._id === sectionId
		)

		if (currentSectionIndex === -1) return true

		const currentSubSectionIndex =
		courseSectionData[currentSectionIndex].subsection.findIndex(
			(subsection) => subsection._id === subsectionId
		)

		const lastSectionIndex = courseSectionData.length - 1

		const lastSubSectionIndex =
		courseSectionData[lastSectionIndex].subsection.length - 1

		return (
		currentSectionIndex === lastSectionIndex &&
		currentSubSectionIndex === lastSubSectionIndex
		)
	}

  // NEXT VIDEO
  const goToNextVideo = () => {
		const currentSectionIndex = courseSectionData.findIndex(
		(section) => section._id === sectionId
		)

		if (currentSectionIndex === -1) return

		const currentSubSectionIndex =
		courseSectionData[currentSectionIndex].subsection.findIndex(
			(subsection) => subsection._id === subsectionId
		)

		const currentSection =
		courseSectionData[currentSectionIndex]

		// Next subsection
		if (
			currentSubSectionIndex <
			currentSection.subsection.length - 1
		) {
		const nextSubSectionId =
			currentSection.subsection[
			currentSubSectionIndex + 1
			]._id

		navigate(
			`/dashboard/enrolled-courses/view-course/${courseId}/section/${sectionId}/subsection/${nextSubSectionId}`
		)

		return
    }

    // Next section
    if (
      currentSectionIndex <
      courseSectionData.length - 1
    ) {
      const nextSection =
        courseSectionData[currentSectionIndex + 1]

      const nextSubSectionId =
        nextSection.subsection?.[0]?._id

      if (!nextSubSectionId) return

      navigate(
        `/dashboard/enrolled-courses/view-course/${courseId}/section/${nextSection._id}/subsection/${nextSubSectionId}`
      )
    }
  }

  // PREVIOUS VIDEO
  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    )

    if (currentSectionIndex === -1) return

    const currentSubSectionIndex =
      courseSectionData[currentSectionIndex].subsection.findIndex(
        (subsection) => subsection._id === subsectionId
      )

    // Previous subsection
    if (currentSubSectionIndex > 0) {
      const previousSubSectionId =
        courseSectionData[currentSectionIndex].subsection[
          currentSubSectionIndex - 1
        ]._id

      navigate(
        `/dashboard/enrolled-courses/view-course/${courseId}/section/${sectionId}/subsection/${previousSubSectionId}`
      )

      return
    }

    // Previous section
    if (currentSectionIndex > 0) {
      const previousSection =
        courseSectionData[currentSectionIndex - 1]

      const previousSubSection =
        previousSection.subsection[
          previousSection.subsection.length - 1
        ]

      if (!previousSubSection) return

      navigate(
        `/dashboard/enrolled-courses/view-course/${courseId}/section/${previousSection._id}/subsection/${previousSubSection._id}`
      )
    }
  }

  // MARK LECTURE COMPLETED
  const handleLectureCompletion = async () => {
    if (loading || !videoData?._id) return

    setLoading(true)

    try {
      const res = await markLectureAsComplete(
        {
          courseId,
          subsectionId: videoData._id,
        },
        token
      )

      if (res) {
        dispatch(updateCompletedLectures(videoData._id))
      }
    } catch (error) {
      console.log(
        "Unable to mark lecture as completed",
        error
      )
    }

    setLoading(false)
  }

  // REPLAY

  const handleReplay = () => {
    if (!playerRef.current) return

    playerRef.current.currentTime = 0
    playerRef.current.play()

    setVideoEnded(false)
    setPlaying(true)
}

  // LOADING
  if (!videoData) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-gray-600 border-t-purple-500" />

          <p className="text-sm text-gray-400">
            Loading video...
          </p>
        </div>
      </div>
    )
  }

  const isCompleted =
    completedLectures?.includes(videoData._id)

  return (
    <div className="min-h-full w-full px-2 py-4 sm:px-4 sm:py-5 md:px-6 md:py-6 lg:px-8">

      {/*   
          VIDEO SECTION
         */}

      <div className="mx-auto w-full max-w-6xl">

        <div className="overflow-hidden rounded-xl border border-white/10 bg-black shadow-xl sm:rounded-2xl">

          <div className="relative aspect-video w-full">

            {/* <ReactPlayer
              ref={playerRef}
              url={videoData.videoUrl}
              width="100%"
              height="100%"
              playing={playing}
              controls={true}
              playsinline={true}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => {
                setVideoEnded(true)
                setPlaying(false)
              }}
              config={{
                file: {
                  attributes: {
                    controlsList: "nodownload",
                  },
                },
              }}
            /> */}
            <video
  ref={playerRef}
  src={videoData.videoUrl}
  controls
  playsInline
  controlsList="nodownload"
  className="h-full w-full object-contain"
  onPlay={() => setPlaying(true)}
  onPause={() => setPlaying(false)}
  onEnded={() => {
    setVideoEnded(true)
    setPlaying(false)
  }}
/>

            {/*   
                VIDEO ENDED OVERLAY
               */}

            {videoEnded && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">

                {/* ------------------------------------------
                    REPLAY BUTTON
                ------------------------------------------ */}

                <button
                  onClick={handleReplay}
                  aria-label="Replay video"
                  className="group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <MdOutlineReplayCircleFilled
                    className="text-5xl text-white transition-all duration-200 group-hover:scale-110 group-hover:text-purple-400 sm:text-6xl md:text-7xl"
                  />
                </button>

                {/* ------------------------------------------
                    PREVIOUS BUTTON
                ------------------------------------------ */}

                {!isFirstVideo() && (
                  <button
                    onClick={goToPrevVideo}
                    aria-label="Previous lecture"
                    className="group absolute left-2 top-1/2 -translate-y-1/2 sm:left-4 md:left-6"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-btn-secondary/90 shadow-lg transition-all duration-200 group-hover:scale-110 group-hover:bg-btn-secondary-hover sm:h-11 sm:w-11 md:h-12 md:w-12">
                      <BiSkipPreviousCircle className="text-2xl text-white transition-colors group-hover:text-purple-400 sm:text-3xl md:text-4xl" />
                    </div>
                  </button>
                )}

                {/* ------------------------------------------
                    NEXT BUTTON
                ------------------------------------------ */}

                {!isLastVideo() && (
                  <button
                    onClick={goToNextVideo}
                    aria-label="Next lecture"
                    className="group absolute right-2 top-1/2 -translate-y-1/2 sm:right-4 md:right-6"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-btn-secondary/90 shadow-lg transition-all duration-200 group-hover:scale-110 group-hover:bg-btn-secondary-hover sm:h-11 sm:w-11 md:h-12 md:w-12">
                      <BiSkipNextCircle className="text-2xl text-white transition-colors group-hover:text-purple-400 sm:text-3xl md:text-4xl" />
                    </div>
                  </button>
                )}

                {/* ------------------------------------------
                    MARK COMPLETED
                ------------------------------------------ */}

                {!isCompleted && (
                  <button
                    onClick={handleLectureCompletion}
                    disabled={loading}
                    className="absolute bottom-4 rounded-lg bg-purple-500 px-3.5 pb-10 text-[11px] font-semibold text-white shadow-lg transition-all duration-200 hover:bg-purple-600 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 sm:bottom-5 sm:px-5 sm:py-2.5 sm:text-xs md:bottom-6 md:text-sm"
                  >
                    {loading
                      ? "Marking..."
                      : "Mark as Completed"}
                  </button>
                )}

                {/* ------------------------------------------
                    COMPLETED MESSAGE
                ------------------------------------------ */}

                {isCompleted && (
                  <div className="absolute bottom-4 rounded-lg border border-purple-500/20 bg-purple-500/10 px-3.5 py-2 text-[11px] font-medium text-purple-300 sm:bottom-5 sm:px-5 sm:py-2.5 sm:text-xs md:bottom-6 md:text-sm">
                    Lecture Completed
                  </div>
                )}

              </div>
            )}

          </div>
        </div>

        {/*   
            VIDEO DETAILS
           */}

        <div className="mt-4 rounded-xl border border-white/10 bg-btn-secondary px-4 py-4 sm:mt-5 sm:px-5 sm:py-5 md:px-6 md:py-6">

          {/* Course Name */}

          {courseEntireData?.courseName && (
            <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-purple-400 sm:text-xs">
              {courseEntireData.courseName}
            </p>
          )}

          {/* Video Title */}

          <h1 className="text-base font-bold leading-6 text-white sm:text-lg sm:leading-7 md:text-2xl md:leading-8">
            {videoData?.title}
          </h1>

          {/* Video Description */}

          {videoData?.description && (
            <p className="mt-2 text-xs leading-5 text-gray-400 sm:text-sm sm:leading-6 md:text-base">
              {videoData.description}
            </p>
          )}

        </div>

        {/*   
            NAVIGATION BUTTONS
           */}

        <div className="mt-4 flex items-center justify-between gap-3 sm:mt-5">

          {/* Previous */}

          {!isFirstVideo() ? (
            <button
              onClick={goToPrevVideo}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-btn-secondary px-3 py-2 text-xs font-medium text-gray-300 transition-all hover:bg-btn-secondary-hover hover:text-white sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
            >
              <BiSkipPreviousCircle className="text-lg sm:text-xl" />
              <span>Previous</span>
            </button>
          ) : (
            <div />
          )}

          {/* Next */}

          {!isLastVideo() && (
            <button
              onClick={goToNextVideo}
              className="flex items-center gap-1.5 rounded-lg bg-purple-500 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-purple-600 hover:scale-[1.02] sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
            >
              <span>Next Lecture</span>
              <BiSkipNextCircle className="text-lg sm:text-xl" />
            </button>
          )}

        </div>

      </div>

    </div>
  )
}

export default VideoDetails

