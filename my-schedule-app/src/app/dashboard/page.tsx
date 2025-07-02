"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

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
      room: "Lab B205",
      time: "10:15 - 12:15",
      class: "Database Design",
      teacher: "Ms. Jansen",
      status: "reserved",
      capacity: 20,
      equipment: "Computers, Whiteboard",
    },
    {
      id: 3,
      room: "Lab C301",
      time: "13:00 - 15:00",
      class: "Mobile Development",
      teacher: "Dr. Bakker",
      status: "available",
      capacity: 30,
      equipment: "Computers, Testing Devices",
    },
    {
      id: 4,
      room: "Lecture Hall D102",
      time: "15:15 - 17:15",
      class: "Software Engineering",
      teacher: "Prof. de Wit",
      status: "available",
      capacity: 50,
      equipment: "Projector, Audio System",
    },
  ],
  teachers: [
    {
      id: 1,
      name: "Mr. van der Berg",
      time: "08:00 - 16:00",
      subject: "Frontend Development",
      status: "available",
      expertise: "React, JavaScript, CSS",
    },
    {
      id: 2,
      name: "Ms. Jansen",
      time: "09:00 - 17:00",
      subject: "Backend Development",
      status: "reserved",
      expertise: "Node.js, Python, SQL",
    },
    {
      id: 3,
      name: "Dr. Bakker",
      time: "10:00 - 18:00",
      subject: "Mobile Development",
      status: "available",
      expertise: "React Native, Flutter",
    },
    {
      id: 4,
      name: "Prof. de Wit",
      time: "08:00 - 16:00",
      subject: "Software Architecture",
      status: "available",
      expertise: "System Design, DevOps",
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

  // Get language from URL once on mount
  useEffect(() => {
    const lang = searchParams.get("lang")
    if (lang === "nl" || lang === "en") {
      setLanguage(lang)
    }
  }, [])

  const t = translations[language]

  const handleReservation = (type: "rooms" | "teachers", id: number) => {
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
    return status === "available" 
      ? { background: "white", color: "black", border: "1px solid #d1d5db" }
      : { background: "black", color: "white" }
  }

  return (
    <div style={{
      height: '100vh',
      width: '100%',
      maxWidth: '24rem',
      margin: '0 auto',
      background: 'white',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative'
    }}>
      {/* Header */}
      <div style={{ background: 'black', color: 'white' }}>
        <div style={{ padding: '1rem 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <svg style={{ height: '1.5rem', width: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>
                {currentView === "rooms"
                  ? t.labsRooms
                  : currentView === "teachers"
                    ? t.faculty
                    : currentView === "today"
                      ? t.today
                      : t.reports}
              </div>
            </div>
            <button
              onClick={handleLogout}
              style={{
                color: 'white',
                background: 'transparent',
                border: '1px solid #4b5563',
                padding: '0.5rem',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#374151'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <svg style={{ height: '1rem', width: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button style={{
              color: 'white',
              background: 'transparent',
              border: '1px solid #4b5563',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}>
              <svg style={{ height: '1.25rem', width: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: '700', fontSize: '1.125rem' }}>{t.week} 10</div>
              <div style={{ fontSize: '0.875rem', color: '#d1d5db' }}>4 - 10 March</div>
            </div>
            <button style={{
              color: 'white',
              background: 'transparent',
              border: '1px solid #4b5563',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}>
              <svg style={{ height: '1.25rem', width: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        padding: '2rem 1.5rem 6rem 1.5rem',
        overflowY: 'auto'
      }}>
        {currentView === "rooms" && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontWeight: '700', fontSize: '1.25rem', color: 'black', display: 'flex', alignItems: 'center', margin: 0 }}>
              <svg style={{ height: '1.5rem', width: '1.5rem', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {t.softwareDevLabs}
            </h3>
            {scheduleData.rooms.map((room) => (
              <div
                key={room.id}
                style={{
                  border: '2px solid black',
                  borderRadius: '0.5rem',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '700', fontSize: '1.125rem', color: 'black', display: 'flex', alignItems: 'center' }}>
                        <svg style={{ height: '1.25rem', width: '1.25rem', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        {room.room}
                      </div>
                      <div style={{ color: '#4b5563', fontWeight: '500' }}>{room.class}</div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                        {t.teacher}: {room.teacher}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        {t.capacity}: {room.capacity} {t.students}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        {t.equipment}: {room.equipment}
                      </div>
                    </div>
                    <span style={{
                      ...getStatusColor(room.status),
                      fontWeight: '600',
                      padding: '0.25rem 0.625rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem'
                    }}>
                      {room.status === "available" ? t.available : t.reserved}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: '600', color: 'black' }}>{room.time}</div>
                      <div style={{ fontSize: '0.875rem', color: '#4b5563' }}>{t.today}</div>
                    </div>

                    <button
                      onClick={() => handleReservation("rooms", room.id)}
                      style={{
                        background: room.status === "available" ? "black" : "white",
                        color: room.status === "available" ? "white" : "black",
                        border: room.status === "available" ? "none" : "2px solid black",
                        fontWeight: '600',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.25rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                      onMouseOver={(e) => {
                        if (room.status === "available") {
                          e.currentTarget.style.background = '#374151'
                        } else {
                          e.currentTarget.style.background = '#f3f4f6'
                        }
                      }}
                      onMouseOut={(e) => {
                        if (room.status === "available") {
                          e.currentTarget.style.background = 'black'
                        } else {
                          e.currentTarget.style.background = 'white'
                        }
                      }}
                    >
                      {room.status === "available" ? t.reserveRoom : t.cancelReservation}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {currentView === "teachers" && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontWeight: '700', fontSize: '1.25rem', color: 'black', display: 'flex', alignItems: 'center', margin: 0 }}>
              <svg style={{ height: '1.5rem', width: '1.5rem', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {t.softwareDevFaculty}
            </h3>
            {scheduleData.teachers.map((teacher) => (
              <div
                key={teacher.id}
                style={{
                  border: '2px solid black',
                  borderRadius: '0.5rem',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s'
                }}
              >
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{
                      height: '4rem',
                      width: '4rem',
                      border: '2px solid black',
                      borderRadius: '50%',
                      background: 'black',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                      fontSize: '1.125rem'
                    }}>
                      {teacher.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '700', fontSize: '1.125rem', color: 'black' }}>{teacher.name}</div>
                      <div style={{ color: '#4b5563', fontWeight: '500' }}>{teacher.subject}</div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                        {t.expertise}: {teacher.expertise}
                      </div>
                      <div style={{ fontWeight: '600', color: 'black', marginTop: '0.25rem' }}>{teacher.time}</div>
                    </div>
                    <span style={{
                      ...getStatusColor(teacher.status),
                      fontWeight: '600',
                      padding: '0.25rem 0.625rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem'
                    }}>
                      {teacher.status === "available" ? t.available : t.reserved}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => handleReservation("teachers", teacher.id)}
                      style={{
                        background: teacher.status === "available" ? "black" : "white",
                        color: teacher.status === "available" ? "white" : "black",
                        border: teacher.status === "available" ? "none" : "2px solid black",
                        fontWeight: '600',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.25rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                    >
                      {teacher.status === "available" ? t.bookConsultation : t.cancelBooking}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {currentView === "today" && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontWeight: '700', fontSize: '1.25rem', color: 'black', display: 'flex', alignItems: 'center', margin: 0 }}>
              <svg style={{ height: '1.5rem', width: '1.5rem', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t.todaysSchedule}
            </h3>
            {scheduleData.rooms.slice(0, 3).map((schedule) => (
              <div key={schedule.id} style={{ border: '2px solid black', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '1.25rem', color: 'black' }}>{schedule.room}</div>
                      <div style={{ fontWeight: '600', fontSize: '1.125rem', color: 'black' }}>{schedule.time}</div>
                      <div style={{ color: '#4b5563', fontWeight: '500' }}>{schedule.class}</div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{schedule.teacher}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{
                        ...getStatusColor(schedule.status),
                        fontWeight: '600',
                        padding: '0.25rem 0.625rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        marginBottom: '0.5rem',
                        display: 'inline-block'
                      }}>
                        {schedule.status === "available" ? t.available : t.reserved}
                      </span>
                      {schedule.status === "reserved" && (
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', color: '#4b5563' }}>
                          <svg style={{ height: '1rem', width: '1rem', marginRight: '0.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {t.reservedBy} You
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* More Menu Modal */}
      {showMoreMenu && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            background: 'black',
            border: '1px solid #4b5563',
            borderRadius: '1rem',
            padding: '1.5rem',
            margin: '1.5rem',
            width: '100%',
            maxWidth: '20rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ color: 'white', fontSize: '1.125rem', fontWeight: '700', margin: 0 }}>{t.more}</h3>
              <button
                onClick={() => setShowMoreMenu(false)}
                style={{
                  color: 'white',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.5rem'
                }}
              >
                <svg style={{ height: '1rem', width: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                onClick={toggleLanguage}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#374151'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <svg style={{ height: '1.25rem', width: '1.25rem', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                  <span style={{ color: 'white' }}>{t.language}</span>
                </div>
                <span style={{ color: 'white' }}>{language === "en" ? "NL" : "EN"}</span>
              </button>

              {/* Fake Options */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                opacity: 0.5
              }}>
                <svg style={{ height: '1.25rem', width: '1.25rem', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span style={{ color: '#9ca3af' }}>{t.settings}</span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                opacity: 0.5
              }}>
                <svg style={{ height: '1.25rem', width: '1.25rem', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-6H4v6zM16 3h5v5h-5V3zM4 3h6v6H4V3z" />
                </svg>
                <span style={{ color: '#9ca3af' }}>{t.notifications}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div style={{ background: 'black', borderTop: '2px solid #374151', position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '24rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0.75rem' }}>
          <button
            onClick={() => setCurrentView("rooms")}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              position: 'relative',
              transition: 'all 0.3s',
              color: currentView === "rooms" ? 'white' : '#9ca3af',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
          >
            {currentView === "rooms" && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: '#374151', borderRadius: '0.5rem', transform: 'scale(1.1)', zIndex: -1 }}></div>}
            <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
              <svg style={{ height: '1.5rem', width: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span style={{ fontSize: '0.75rem', fontWeight: '500' }}>{t.labsRooms.split(" ")[0]}</span>
            </div>
          </button>

          <button
            onClick={() => setCurrentView("teachers")}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              position: 'relative',
              transition: 'all 0.3s',
              color: currentView === "teachers" ? 'white' : '#9ca3af',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
          >
            {currentView === "teachers" && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: '#374151', borderRadius: '0.5rem', transform: 'scale(1.1)', zIndex: -1 }}></div>}
            <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
              <svg style={{ height: '1.5rem', width: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span style={{ fontSize: '0.75rem', fontWeight: '500' }}>{t.faculty}</span>
            </div>
          </button>

          <button
            onClick={() => setCurrentView("today")}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              position: 'relative',
              transition: 'all 0.3s',
              color: currentView === "today" ? 'white' : '#9ca3af',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
          >
            {currentView === "today" && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: '#374151', borderRadius: '0.5rem', transform: 'scale(1.1)', zIndex: -1 }}></div>}
            <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
              <svg style={{ height: '1.5rem', width: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span style={{ fontSize: '0.75rem', fontWeight: '500' }}>{t.today}</span>
            </div>
          </button>

          <button
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              position: 'relative',
              transition: 'all 0.3s',
              color: '#9ca3af',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
          >
            <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
              <svg style={{ height: '1.5rem', width: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span style={{ fontSize: '0.75rem', fontWeight: '500' }}>{t.reports}</span>
            </div>
          </button>

          <button
            onClick={() => setShowMoreMenu(true)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              position: 'relative',
              transition: 'all 0.3s',
              color: '#9ca3af',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
          >
            <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
              <svg style={{ height: '1.5rem', width: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
              <span style={{ fontSize: '0.75rem', fontWeight: '500' }}>{t.more}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}