export interface User {
  id: string
  firstName: string
  lastName: string
  phone: string
  avatar?: string
  playerLevel: number
  statistics: {
    matchesPlayed: number
    matchesWon: number
    matchesLost: number
  }
}

export interface Club {
  id: string
  name: string
  address: string
  location: { lat: number; lng: number }
  photos: string[]
  amenities: string[]
  distance: number
  openMatchesCount: number
  cancellationDeadlineHours: number
}

export interface Court {
  id: string
  name: string
  type: "indoor" | "outdoor"
  clubId: string
}

export interface Participant {
  userId: string
  joinedAt: Date
  isPaid: boolean
  isCreator: boolean
}

export interface JoinRequest {
  id: string
  userId: string
  requestedAt: Date
  status: "pending" | "approved" | "rejected"
}

export interface Match {
  id: string
  creatorId: string
  clubId: string
  courtId: string
  date: Date
  startTime: string
  endTime: string
  pricePerPerson: number
  playerLevel: number
  status: "open" | "full" | "completed" | "cancelled"
  participants: Participant[]
  pendingRequests: JoinRequest[]
  chatId: string
}

export interface Message {
  id: string
  chatId: string
  senderId: string
  type: "text" | "image"
  content: string
  sentAt: Date
}

// Mock current user
export const currentUser: User = {
  id: "user-1",
  firstName: "Александр",
  lastName: "Иванов",
  phone: "+7 999 123 45 67",
  avatar: "/male-athlete.png",
  playerLevel: 3.5,
  statistics: {
    matchesPlayed: 24,
    matchesWon: 15,
    matchesLost: 9,
  },
}

// Mock users
export const mockUsers: User[] = [
  currentUser,
  {
    id: "user-2",
    firstName: "Дмитрий",
    lastName: "Петров",
    phone: "+7 999 234 56 78",
    avatar: "/male-padel-player.jpg",
    playerLevel: 3.0,
    statistics: {
      matchesPlayed: 18,
      matchesWon: 10,
      matchesLost: 8,
    },
  },
  {
    id: "user-3",
    firstName: "Мария",
    lastName: "Смирнова",
    phone: "+7 999 345 67 89",
    avatar: "/female-athlete.png",
    playerLevel: 4.0,
    statistics: {
      matchesPlayed: 32,
      matchesWon: 20,
      matchesLost: 12,
    },
  },
  {
    id: "user-4",
    firstName: "Елена",
    lastName: "Козлова",
    phone: "+7 999 456 78 90",
    avatar: "/female-padel-player.jpg",
    playerLevel: 3.5,
    statistics: {
      matchesPlayed: 28,
      matchesWon: 16,
      matchesLost: 12,
    },
  },
]

// Mock clubs
export const mockClubs: Club[] = [
  {
    id: "club-1",
    name: "Padel Club Moscow",
    address: "ул. Ленина, 10, Москва",
    location: { lat: 55.7558, lng: 37.6173 },
    photos: ["/indoor-padel-court.png"],
    amenities: ["Parking", "Shower", "Cafe", "Equipment Rental"],
    distance: 1.2,
    openMatchesCount: 5,
    cancellationDeadlineHours: 24,
  },
  {
    id: "club-2",
    name: "Arena Padel",
    address: "пр. Мира, 45, Москва",
    location: { lat: 55.77, lng: 37.64 },
    photos: ["/outdoor-padel-court.png"],
    amenities: ["Parking", "Shower", "Bar"],
    distance: 2.5,
    openMatchesCount: 3,
    cancellationDeadlineHours: 12,
  },
  {
    id: "club-3",
    name: "Sport Complex Luzhniki",
    address: "Лужники, 24, Москва",
    location: { lat: 55.715, lng: 37.555 },
    photos: ["/sports-complex-padel.jpg"],
    amenities: ["Parking", "Shower", "Cafe", "Equipment Rental", "Locker Room"],
    distance: 3.8,
    openMatchesCount: 8,
    cancellationDeadlineHours: 24,
  },
  {
    id: "club-4",
    name: "Padel Point",
    address: "ул. Тверская, 12, Москва",
    location: { lat: 55.76, lng: 37.61 },
    photos: ["/modern-padel-facility.jpg"],
    amenities: ["Shower", "Equipment Rental"],
    distance: 0.8,
    openMatchesCount: 2,
    cancellationDeadlineHours: 6,
  },
  {
    id: "club-5",
    name: "Elite Padel Center",
    address: "Кутузовский пр., 36, Москва",
    location: { lat: 55.74, lng: 37.57 },
    photos: ["/luxury-padel-club.jpg"],
    amenities: ["Parking", "Shower", "Cafe", "Bar", "Equipment Rental", "Locker Room", "Spa"],
    distance: 4.2,
    openMatchesCount: 6,
    cancellationDeadlineHours: 48,
  },
]

// Mock courts
export const mockCourts: Court[] = [
  { id: "court-1", name: "Court 1", type: "indoor", clubId: "club-1" },
  { id: "court-2", name: "Court 2", type: "indoor", clubId: "club-1" },
  { id: "court-3", name: "Court 1", type: "outdoor", clubId: "club-2" },
  { id: "court-4", name: "Court 2", type: "outdoor", clubId: "club-2" },
  { id: "court-5", name: "Court 1", type: "indoor", clubId: "club-3" },
]

// Mock matches
export const mockMatches: Match[] = [
  {
    id: "match-1",
    creatorId: "user-2",
    clubId: "club-1",
    courtId: "court-1",
    date: new Date("2025-10-24T18:00:00"),
    startTime: "18:00",
    endTime: "19:00",
    pricePerPerson: 1100,
    playerLevel: 3.0,
    status: "open",
    participants: [
      { userId: "user-2", joinedAt: new Date(), isPaid: true, isCreator: true },
      { userId: "user-3", joinedAt: new Date(), isPaid: true, isCreator: false },
    ],
    pendingRequests: [],
    chatId: "chat-1",
  },
  {
    id: "match-2",
    creatorId: "user-1",
    clubId: "club-2",
    courtId: "court-3",
    date: new Date("2025-10-25T10:00:00"),
    startTime: "10:00",
    endTime: "11:00",
    pricePerPerson: 1100,
    playerLevel: 3.5,
    status: "open",
    participants: [{ userId: "user-1", joinedAt: new Date(), isPaid: true, isCreator: true }],
    pendingRequests: [],
    chatId: "chat-2",
  },
  {
    id: "match-3",
    creatorId: "user-4",
    clubId: "club-1",
    courtId: "court-2",
    date: new Date("2025-10-24T20:00:00"),
    startTime: "20:00",
    endTime: "21:00",
    pricePerPerson: 1100,
    playerLevel: 3.5,
    status: "open",
    participants: [
      { userId: "user-4", joinedAt: new Date(), isPaid: true, isCreator: true },
      { userId: "user-2", joinedAt: new Date(), isPaid: true, isCreator: false },
      { userId: "user-3", joinedAt: new Date(), isPaid: true, isCreator: false },
    ],
    pendingRequests: [],
    chatId: "chat-3",
  },
]

// Helper functions
export function getUserById(id: string): User | undefined {
  return mockUsers.find((user) => user.id === id)
}

export function getClubById(id: string): Club | undefined {
  return mockClubs.find((club) => club.id === id)
}

export function getCourtById(id: string): Court | undefined {
  return mockCourts.find((court) => court.id === id)
}

export function getMatchById(id: string): Match | undefined {
  return mockMatches.find((match) => match.id === id)
}

export function getMatchesByClubId(clubId: string): Match[] {
  return mockMatches.filter((match) => match.clubId === clubId && match.status === "open")
}

export function getUserMatches(userId: string): Match[] {
  return mockMatches.filter((match) => match.participants.some((p) => p.userId === userId))
}
