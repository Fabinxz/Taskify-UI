"use client"

import { useState, useEffect } from "react"
import { Bell, Settings, Minus, Plus, Flame } from "lucide-react"
import { motion } from "framer-motion"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend)

export default function TaskifyDashboard() {
  const [sliderValue, setSliderValue] = useState(50)
  const [isHovering, setIsHovering] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const chartData = {
    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
    datasets: [
      {
        fill: true,
        label: "Progresso",
        data: [25, 40, 30, 50, 35, 60, 70],
        borderColor: "rgba(0, 73, 255, 1)",
        backgroundColor: "rgba(0, 73, 255, 0.1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(0, 73, 255, 1)",
        pointBorderColor: "#0A0F1C",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(0, 73, 255, 1)",
        tension: 0.4,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 100,
        grid: {
          color: "rgba(255, 255, 255, 0.05)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.5)",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.5)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  }

  const progressCards = [
    { title: "Hoje", value: 0, max: 20, percentage: 0 },
    { title: "Semana", value: 35, max: 50, percentage: 70 },
    { title: "Mês", value: 802, max: 1200, percentage: 67 },
    { title: "Ano", value: 4831, max: 20000, percentage: 24 },
  ]

  const metricCards = [
    { title: "Progresso Total", value: "5.668", color: "from-blue-500 to-purple-500" },
    { title: "Taxa de Acerto", value: "78%", color: "from-green-400 to-emerald-600" },
    { title: "Tempo Médio", value: "1 min 32s", color: "from-amber-400 to-orange-500" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-[#0A0F1C] text-white font-sans antialiased">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8 backdrop-blur-sm bg-white/5 rounded-2xl p-4 border border-white/10 shadow-xl"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 11L12 14L20 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 12V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className="text-xl font-medium tracking-tight">Taskify</h1>
          </div>
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
            >
              <Bell className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
            >
              <Settings className="w-5 h-5" />
            </motion.button>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 overflow-hidden border-2 border-white/20 shadow-lg shadow-blue-500/20"
            >
              <img src="/placeholder.svg?height=40&width=40" alt="User avatar" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </motion.div>

        {/* Title and Streak */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            Progresso de Questões
          </h2>
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30"
            whileHover={{ scale: 1.05 }}
            initial={{ scale: 1 }}
            animate={{
              scale: [1, 1.02, 1],
              transition: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                duration: 2,
              },
            }}
          >
            <motion.div
              animate={{
                opacity: [1, 0.7, 1],
                scale: [1, 1.1, 1],
                transition: {
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  duration: 1.5,
                },
              }}
            >
              <Flame className="w-5 h-5 text-orange-400" />
            </motion.div>
            <span className="font-medium">Streak 9 dias</span>
          </motion.div>
        </motion.div>

        {/* Progress Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {progressCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="backdrop-blur-md bg-white/5 rounded-2xl p-5 border border-white/10 shadow-lg relative overflow-hidden group"
              onMouseEnter={() => setIsHovering(card.title)}
              onMouseLeave={() => setIsHovering("")}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <h3 className="text-lg font-medium mb-4 text-center">{card.title}</h3>

              <div className="w-28 h-28 mx-auto relative">
                <motion.div
                  className="absolute inset-0"
                  initial={{ rotate: 0 }}
                  animate={{
                    rotate: isHovering === card.title ? 360 : 0,
                  }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <div className="w-full h-full rounded-full border-2 border-blue-500/20" />
                </motion.div>

                <CircularProgressbar
                  value={card.percentage}
                  text={`${card.value}`}
                  styles={buildStyles({
                    rotation: 0.25,
                    strokeLinecap: "round",
                    textSize: "1.5rem",
                    pathTransitionDuration: 1,
                    pathColor: `rgba(0, 73, 255, ${isHovering === card.title ? 1 : 0.8})`,
                    textColor: "#fff",
                    trailColor: "rgba(255, 255, 255, 0.1)",
                  })}
                />

                <motion.div
                  className="absolute inset-0 rounded-full"
                  initial={{ boxShadow: "0 0 0 0 rgba(0, 73, 255, 0)" }}
                  animate={{
                    boxShadow:
                      isHovering === card.title ? "0 0 20px 2px rgba(0, 73, 255, 0.3)" : "0 0 0 0 rgba(0, 73, 255, 0)",
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <p className="text-center text-sm text-gray-400 mt-3">{card.max}</p>
            </motion.div>
          ))}
        </div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
        >
          {metricCards.map((metric, index) => (
            <motion.div
              key={metric.title}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="backdrop-blur-md bg-white/5 rounded-2xl p-5 border border-white/10 shadow-lg relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-5`} />
              <h3 className="text-sm font-medium text-gray-400 mb-2">{metric.title}</h3>
              <p className="text-2xl font-bold">{metric.value}</p>

              {metric.title === "Taxa de Acerto" && (
                <div className="w-full h-1.5 bg-white/10 rounded-full mt-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "78%" }}
                    transition={{ duration: 1, delay: 0.6 }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Progress Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/10 shadow-lg relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />

          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Atividade Diária</h3>
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
              >
                <Minus className="w-4 h-4" />
              </motion.button>

              <div className="relative w-40 h-6">
                <div className="absolute inset-0 bg-white/5 rounded-full" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderValue}
                  onChange={(e) => setSliderValue(Number.parseInt(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                  style={{ width: `${sliderValue}%` }}
                />
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-blue-500 border-2 border-white shadow-lg shadow-blue-500/30"
                  style={{ left: `calc(${sliderValue}% - 10px)` }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
              >
                <Plus className="w-4 h-4" />
              </motion.button>

              <span className="text-sm font-medium">{sliderValue}</span>
            </div>
          </div>

          <div className="h-60 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none z-10 opacity-30" />
            <Line data={chartData} options={chartOptions} />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
