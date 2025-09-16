from pydantic import BaseModel, Field
from typing import List, Optional, Any, Dict

class TripPlanRequest(BaseModel):
    destination: str
    duration: int
    budget: float
    preferences: list[str] = []

class TripPlanResponse(BaseModel):
    message: str
    plan: dict

class YoutubeLinkRequest(BaseModel):
    video_id: str

class YoutubeLinkResponse(BaseModel):
    message: str
    video_url: str
    
class Place(BaseModel):
    name: str
    latitude: float
    longitude: float
    
class DataInput(BaseModel):
    source: str
    name: str
    start_place: Place
    destination_place: Place
    visited_place: List[Place]
    duration: Optional[int] = None
    budget: Optional[float] = None
    transportation: Optional[str] = None
    accommodation: Optional[str] = None
    safety: Optional[str] = None
    theme: Optional[str] = None
    country: str
    plan_details: str

class DatabaseInput(BaseModel):
    collection_name: str
    data: DataInput
    
class DatabaseRequest(BaseModel):
    collection_name: Optional[str] = None
    query_text: str


class PlanRequest(BaseModel):
    # Core location fields
    start_place: str = Field(..., description="Starting location")
    destination: str = Field(..., description="Destination location") 
    
    # Trip details
    travelDates: Optional[str] = Field(None, description="Travel dates in format 'YYYY-MM-DD to YYYY-MM-DD'")
    duration: int = Field(..., description="Duration in days")
    
    # Group and preferences
    groupSize: int = Field(4, description="Number of people in the group")
    interests: List[str] = Field(default_factory=list, description="List of interests like 'Cultural immersion', 'Mountain views'")
    
    # Budget and accommodation
    budgetTier: Optional[str] = Field(None, description="Budget tier: 'Budget', 'Mid-range', 'Luxury'")
    trip_price: Optional[float] = Field(None, description="Total budget in local currency")
    stayPref: Optional[str] = Field(None, description="Accommodation preference like 'Tea houses and lodges'")
    
    # Transport and theme
    transportPref: Optional[str] = Field(None, description="Transport preference like 'Local bus'")
    theme: Optional[str] = Field(None, description="Trip theme like 'Adventure', 'Relaxation'")


class RetrievedItem(BaseModel):
    place_id: str
    place_name: str
    score: float

class Timeline(BaseModel):
    t: str = Field(..., description="Time in HH:MM format")
    detail: str = Field(..., description="Activity description")

class Spot(BaseModel):
    name: str = Field(..., description="Location name")
    latitude: Optional[float] = Field(None, description="Latitude coordinate")
    longitude: Optional[float] = Field(None, description="Longitude coordinate")
    time: str = Field(..., description="Time range like '09:30 – 11:45'")
    notes: str = Field(..., description="Description and tips")

class Budget(BaseModel):
    transport: Optional[float] = Field(None, description="Transport cost")
    entrance: Optional[float] = Field(None, description="Entrance fees")
    meals: Optional[float] = Field(None, description="Meal costs")
    accommodation: Optional[float] = Field(None, description="Accommodation costs")
    activities: Optional[float] = Field(None, description="Activity costs")
    total: Optional[float] = Field(None, description="Total estimated cost")

class Permits(BaseModel):
    needed: bool = Field(False, description="Whether permits are required")
    notes: str = Field("", description="Permit requirements")
    seasonal: str = Field("", description="Seasonal considerations")

class Contact(BaseModel):
    name: str = Field(..., description="Contact name")
    phone: str = Field(..., description="Phone number")

class SafetyContacts(BaseModel):
    ranger: Optional[Contact] = Field(None, description="Ranger station contact")
    hospital: Optional[Contact] = Field(None, description="Hospital contact")
    police: Optional[Contact] = Field(None, description="Police contact")

class Safety(BaseModel):
    registration: str = Field("", description="Safety registration info")
    checkins: str = Field("", description="Check-in procedures")
    sos: str = Field("", description="Emergency procedures")
    contacts: Optional[SafetyContacts] = Field(None, description="Emergency contacts")

class TimelineEntry(BaseModel):
    t: str = Field(..., description="Time in HH:MM format")
    detail: str = Field(..., description="Activity description")

class DayTimeline(BaseModel):
    day: int = Field(..., description="Day number")
    activities: List[TimelineEntry] = Field(..., description="Activities for this day")

class TripPlan(BaseModel):
    title: str = Field(..., description="Descriptive title for the trip")
    date: str = Field(..., description="Suggested date/timing")
    timeline: List[DayTimeline] = Field(default_factory=list, description="Daily timeline")
    spots: List[Spot] = Field(default_factory=list, description="Points of interest")
    budget: Budget = Field(..., description="Budget breakdown")
    permits: Optional[Permits] = Field(None, description="Permit information")
    safety: Optional[Safety] = Field(None, description="Safety information")

class PreparationItem(BaseModel):
    category: str = Field(..., description="Category like 'Documents', 'Clothing', 'Equipment'")
    items: List[str] = Field(..., description="List of items to prepare")
    notes: str = Field("", description="Additional notes for this category")

class Preparation(BaseModel):
    overview: str = Field("", description="General preparation overview")
    items: List[PreparationItem] = Field(default_factory=list, description="Preparation items by category")
    timeline: str = Field("", description="When to prepare (e.g., '2 weeks before departure')")

class PlanResponse(BaseModel):
    tripOverview: str = Field(..., description="Overview of the trip")
    query_params: PlanRequest = Field(..., description="Original request parameters")
    retrieved_data: List[RetrievedItem] = Field(default_factory=list, description="Retrieved context data")
    trip_plan: TripPlan = Field(..., description="Detailed trip plan")
    preparation: Optional[Preparation] = Field(None, description="Trip preparation details")
    meta: Dict[str, Any] = Field(default_factory=dict, description="Metadata")

    
class ChatRequest(BaseModel):
    message: str
