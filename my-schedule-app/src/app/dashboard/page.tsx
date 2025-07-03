"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  FileText,
  MoreHorizontal,
  User,
  Check,
  Code,
  LogOut,
  Settings,
  Bell,
  HelpCircle,
  Shield,
  Globe,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

const translations = {
  en: {
    labsRooms: "Labs & Rooms",
    faculty: "Faculty",
    today: "Today",
    reports: "Reports",
    more: "More",
    softwareDevLabs: "Software Development Labs",
    softwareDevFaculty: "Software Development Faculty",
    todaysSchedule: "Today's Schedule",
    available: "Available",
    reserved: "Reserved",
    reserveRoom: "Reserve Room",
    cancelReservation: "Cancel Reservation",
    bookConsultation: "Book Consultation",
    cancelBooking: "Cancel Booking",
    teacher: "Teacher",
    capacity: "Capacity",
    students: "students",
    equipment: "Equipment",
    expertise: "Expertise",
    reservedBy: "Reserved by",
    week: "Week",
    settings: "Settings",
    notifications: "Notifications",
    help: "Help & Support",
    privacy: "Privacy Policy",
    language: "Language",
  },
  nl: {
    labsRooms: "Labs & Lokalen",
    faculty: "Docenten",
    today: "Vandaag",
    reports: "Rapporten",
    more: "Meer",
    softwareDevLabs: "Software Development Labs",
    softwareDevFaculty: "Software Development Docenten",
    todaysSchedule: "Vandaag's Rooster",
    available: "Beschikbaar",
    reserved: "Gereserveerd",
    reserveRoom: "Lokaal Reserveren",
    cancelReservation: "Reservering Annuleren",
    bookConsultation: "Consultatie Boeken",
    cancelBooking: "Boeking Annuleren",
    teacher: "Docent",
    capacity: "Capaciteit",
    students: "studenten",
    equipment: "Apparatuur",
    expertise: "Expertise",
    reservedBy: "Gereserveerd door",
    week: "Week",
    settings: "Instellingen",
    notifications: "Meldingen",
    help: "Help & Ondersteuning",
    privacy: "Privacybeleid",
    language: "Taal",
  },
}

const initialScheduleData = {
  rooms: [
    {
      id: 1,
      room: "Lab A101",
      time: "08:00 - 10:00",
      class: "Web Development",
      teacher: "Mr. van der Berg",
      status: "available",
      capacity: 25,
      equipment: "Computers, Projector",
    },
    {
      id: 2,
      room: "Lab B204",
      time: "10:00 - 12:00",
      class: "Database Management",
      teacher: "Ms. de Vries",
      status: "reserved",
      capacity: 20,
      equipment: "Computers, Whiteboard",
      reservedBy: "John Doe",
    },
    {
      id: 3,
      room: "Lab C305",
      time: "14:00 - 16:00",
      class: "Network Security",
      teacher: "Dr. Janssen",
      status: "available",
      capacity: 15,
      equipment: "Computers, Lab Equipment",
    },
  ],
  faculty: [
    {
      id: 1,
      name: "Mr. van der Berg",
      expertise: "Web Development, JavaScript",
      time: "09:00 - 11:00",
      status: "available",
    },
    {
      id: 2,
      name: "Ms. de Vries",
      expertise: "Database Management, SQL",
      time: "11:00 - 13:00",
      status: "reserved",
      reservedBy: "Jane Smith",
    },
    {
      id: 3,
      name: "Dr. Janssen",
      expertise: "Network Security, Cybersecurity",
      time: "15:00 - 17:00",
      status: "available",
    },
  ],
}

export default function DashboardPage() {
  const [currentView, setCurrentView] = useState("rooms")
  const [scheduleData, setScheduleData] = useState(initialScheduleData)
  const [language, setLanguage] = useState<"en" | "nl">("en")
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Handle language from URL parameter
  useEffect(() => {
    const lang = searchParams.get("lang")
    if (lang === "nl" || lang === "en") {
      setLanguage(lang)
    }
  }, [searchParams])

  const t = translations[language]

  const handleReservation = (type: "rooms" | "faculty", id: number) => {
    setScheduleData((prev) => ({
      ...prev,
      [type]: prev[type].map((item) =>
        item.id === id ? { ...item, status: item.status === "available" ? "reserved" : "available" } : item,
      ),
    }))
  }

  const handleLogout = () => {
    router.push("/")
  }

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "nl" : "en")
    setShowMoreMenu(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-white text-black border border-gray-300"
      case "reserved":
        return "bg-black text-white"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="h-screen w-full max-w-sm mx-auto bg-white flex flex-col hide-scrollbar relative">
      {/* Header */}
      <div className="bg-black text-white">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Code className="h-6 w-6" />
              <div className="text-xl font-bold">
                {currentView === "rooms"
                  ? t.labsRooms
                  : currentView === "faculty"
                    ? t.faculty
                    : currentView === "today"
                      ? t.today
                      : t.reports}
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-gray-800 border border-gray-600"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800 border border-gray-600">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="text-center">
              <div className="font-bold text-lg">{t.week} 10</div>
              <div className="text-sm text-gray-300">4 - 10 March</div>
            </div>
            <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800 border border-gray-600">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8 pb-24 overflow-y-auto hide-scrollbar">
        {currentView === "rooms" && (
          <div className="space-y-4">
            <h3 className="font-bold text-xl text-black flex items-center">
              <MapPin className="h-6 w-6 mr-2" />
              {t.softwareDevLabs}
            </h3>
            {scheduleData.rooms.map((room) => (
              <Card
                key={room.id}
                className="border-2 border-black shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="font-bold text-lg text-black flex items-center">
                        <Code className="h-5 w-5 mr-2" />
                        {room.room}
                      </div>
                      <div className="text-gray-600 font-medium">{room.class}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {t.teacher}: {room.teacher}
                      </div>
                      <div className="text-sm text-gray-500">
                        {t.capacity}: {room.capacity} {t.students}
                      </div>
                      <div className="text-sm text-gray-500">
                        {t.equipment}: {room.equipment}
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(room.status)} font-semibold`}>
                      {room.status === "available" ? t.available : t.reserved}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-black">{room.time}</div>
                      <div className="text-sm text-gray-600">{t.today}</div>
                    </div>

                    <Button
                      onClick={() => handleReservation("rooms", room.id)}
                      className={`${
                        room.status === "available"
                          ? "bg-black text-white hover:bg-gray-800"
                          : "bg-white text-black border-2 border-black hover:bg-gray-100"
                      } font-semibold transition-colors`}
                    >
                      {room.status === "available" ? t.reserveRoom : t.cancelReservation}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {currentView === "faculty" && (
          <div className="space-y-4">
            <h3 className="font-bold text-xl text-black flex items-center">
              <User className="h-6 w-6 mr-2" />
              {t.softwareDevFaculty}
            </h3>
            {scheduleData.faculty.map((teacher) => (
              <Card
                key={teacher.id}
                className="border-2 border-black shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="h-16 w-16 border-2 border-black">
                      <AvatarFallback className="bg-black text-white font-bold text-lg">
                        {teacher.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-bold text-lg text-black">{teacher.name}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {t.expertise}: {teacher.expertise}
                      </div>
                      <div className="font-semibold text-black mt-1">{teacher.time}</div>
                    </div>
                    <Badge className={`${getStatusColor(teacher.status)} font-semibold`}>
                      {teacher.status === "available" ? t.available : t.reserved}
                    </Badge>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={() => handleReservation("faculty", teacher.id)}
                      className={`${
                        teacher.status === "available"
                          ? "bg-black text-white hover:bg-gray-800"
                          : "bg-white text-black border-2 border-black hover:bg-gray-100"
                      } font-semibold transition-colors`}
                    >
                      {teacher.status === "available" ? t.bookConsultation : t.cancelBooking}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {currentView === "today" && (
          <div className="space-y-4">
            <h3 className="font-bold text-xl text-black flex items-center">
              <Clock className="h-6 w-6 mr-2" />
              {t.todaysSchedule}
            </h3>
            {scheduleData.rooms.slice(0, 3).map((schedule) => (
              <Card key={schedule.id} className="border-2 border-black shadow-lg">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold text-xl text-black">{schedule.room}</div>
                      <div className="font-semibold text-lg text-black">{schedule.time}</div>
                      <div className="text-gray-600 font-medium">{schedule.class}</div>
                      <div className="text-sm text-gray-500">{schedule.teacher}</div>
                    </div>
                    <div className="text-right">
                      <Badge className={`${getStatusColor(schedule.status)} font-semibold mb-2`}>
                        {schedule.status === "available" ? t.available : t.reserved}
                      </Badge>
                      {schedule.status === "reserved" && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Check className="h-4 w-4 mr-1" />
                          {t.reservedBy} You
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* More Menu Modal */}
      {showMoreMenu && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-black border border-gray-600 rounded-2xl p-6 m-6 w-full max-w-xs">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-lg font-bold">{t.more}</h3>
              <Button
                onClick={() => setShowMoreMenu(false)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-gray-800"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              <button
                onClick={toggleLanguage}
                className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-white" />
                  <span className="text-white">{t.language}</span>
                </div>
                <span className="text-white">{language === "en" ? "NL" : "EN"}</span>
              </button>

              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors opacity-50">
                <Settings className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">{t.settings}</span>
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors opacity-50">
                <Bell className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">{t.notifications}</span>
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors opacity-50">
                <HelpCircle className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">{t.help}</span>
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors opacity-50">
                <Shield className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400">{t.privacy}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="bg-black border-t-2 border-gray-800">
        <div className="flex items-center justify-around py-3">
          <Button
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center space-y-1 relative transition-all duration-300 ${
              currentView === "rooms" ? "text-white" : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setCurrentView("rooms")}
          >
            {currentView === "rooms" && <div className="absolute inset-0 bg-gray-800 rounded-lg -z-10 scale-110"></div>}
            <div className="relative z-10 flex flex-col items-center space-y-1">
              <MapPin className="h-6 w-6" />
              <span className="text-xs font-medium">{t.labsRooms.split(" ")[0]}</span>
            </div>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center space-y-1 relative transition-all duration-300 ${
              currentView === "faculty" ? "text-white" : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setCurrentView("faculty")}
          >
            {currentView === "faculty" && (
              <div className="absolute inset-0 bg-gray-800 rounded-lg -z-10 scale-110"></div>
            )}
            <div className="relative z-10 flex flex-col items-center space-y-1">
              <User className="h-6 w-6" />
              <span className="text-xs font-medium">{t.faculty}</span>
            </div>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center space-y-1 relative transition-all duration-300 ${
              currentView === "today" ? "text-white" : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setCurrentView("today")}
          >
            {currentView === "today" && <div className="absolute inset-0 bg-gray-800 rounded-lg -z-10 scale-110"></div>}
            <div className="relative z-10 flex flex-col items-center space-y-1">
              <Clock className="h-6 w-6" />
              <span className="text-xs font-medium">{t.today}</span>
            </div>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center space-y-1 relative text-gray-400 hover:text-white transition-all duration-300"
          >
            <div className="relative z-10 flex flex-col items-center space-y-1">
              <FileText className="h-6 w-6" />
              <span className="text-xs font-medium">{t.reports}</span>
            </div>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center space-y-1 relative text-gray-400 hover:text-white transition-all duration-300"
            onClick={() => setShowMoreMenu(true)}
          >
            <div className="relative z-10 flex flex-col items-center space-y-1">
              <MoreHorizontal className="h-6 w-6" />
              <span className="text-xs font-medium">{t.more}</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}
