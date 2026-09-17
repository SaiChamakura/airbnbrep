# Airbnb Villa Listing Page – Pixel-Perfect Visual & Behavioral Reconstruction

A desktop-first visual and behavioral reconstruction of the Airbnb property listing page, built from scratch using React 19, TypeScript, Tailwind CSS, and Lucide icons.

---

## 1. Views & Architectural Breakdown

The application implements all three core view modes required by the specification:

### 1. Main Listing Page (`/`)
- **Primary Header**:
  - Authentic Airbnb logo vector in signature `#FF385C`.
  - Expandable search pill (`Anywhere` · `Any week` · `Add guests`) with interactive search parameters bar.
  - "Airbnb your home" CTA, language & currency selector, and user avatar menu with dropdown options.
- **Secondary Sticky Navigation Bar (`StickySubNav`)**:
  - Automatically slides down once the user scrolls past the hero gallery (`> 550px`).
  - Active tab tracking and smooth scrolling for `Photos`, `Amenities`, `Reviews`, and `Location`.
  - Mini price tag (`$495 / night`), rating score (`★ 4.97 (148)`), and instant `Reserve` action button.
- **Hero Gallery (`HeroGallery`)**:
  - 5-image asymmetric grid container with rounded borders (`rounded-xl`).
  - Left hero photo spanning 2 columns and 2 rows, paired with 4 secondary photos in a 2x2 grid on the right.
  - Hover brightness and overlay states.
  - Floating bottom-right "Show all 20 photos" pill button with layout grid icon.
  - Direct click triggers opening the Lightbox or Photo Tour.
- **Property Header & Overview**:
  - High-contrast typography with title, guest stats, bedroom counts, bed counts, and bath counts.
  - Host avatar with Superhost badge.
  - Guest Favorite badge banner with ratings summary.
  - Highlights section with custom vector icons (`Guest favorite`, `Elena is a Superhost`, `Self check-in`, `Free cancellation`).
  - Official AirCover guarantee banner with "Learn more" modal.
  - Space description with "Show more" modal dialog.
- **Sleeping Arrangements (`SleepingArrangements`)**:
  - 4 bedroom cards detailing bed types (King, Queen, Twin singles), suite amenities, and bed iconography.
- **Amenities Section (`AmenitiesSection` & `AllAmenitiesModal`)**:
  - 10 featured amenities displayed in a 2-column clean grid.
  - "Show all 24 amenities" button opening a full modal categorizing amenities by Scenic views, Internet & office, Parking, Outdoor, Kitchen, Heating & cooling, Home safety, and Bathroom essentials.
- **Interactive 2-Month Calendar (`CalendarSection`)**:
  - Side-by-side two-month calendar (October & November 2026).
  - Selectable check-in and checkout range with night calculation (`5 nights in Malibu`).
  - "Clear dates" action.
  - Bidirectionally synchronized with the sticky booking card.
- **Sticky Booking Card (`BookingCard` & `ReserveModal`)**:
  - Sticky right rail positioned with `sticky top-28`.
  - Price per night, rating, and review count.
  - Interactive split check-in/checkout trigger and expandable guest selector (Adults, Children, Infants, Pets with increment/decrement steppers and capacity validation).
  - Gradient CTA button: `bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466]`.
  - Real-time price breakdown calculating nights, cleaning fee ($240), service fee ($285), and taxes ($195).
  - "Reserve" opens the reservation confirmation modal (`ReserveModal`) with summary and completion flow.
  - "Report this listing" link.
- **Reviews Section (`ReviewsSection` & `AllReviewsModal`)**:
  - Aggregate score (4.97) and review count (148).
  - 6 category rating bars (Cleanliness, Accuracy, Communication, Location, Check-in, Value).
  - 6 featured review cards with author avatars, locations, and timestamps.
  - "Show all 148 reviews" modal with real-time text search filter.
- **Location Section (`LocationSection`)**:
  - Stylized custom map canvas showing coastal geography, Pacific Ocean, Pacific Coast Highway (CA-1), and Malibu Pier / Carbon Beach markers.
  - Airbnb-style radial location pin with pulsing ripple effect.
  - Interactive Map / Satellite toggle and Zoom In / Zoom Out controls.
- **Host Profile (`HostSection`)**:
  - Host card displaying years hosting, response rate (100%), response time (within an hour), bio, and verified credentials.
  - "Contact Host" modal with interactive message composition and send confirmation.
- **Things to Know (`ThingsToKnowSection`)**:
  - 3-column breakdown for House rules, Safety & property, and Cancellation policy with modal drawers for full policies.
- **Global Footer (`Footer`)**:
  - Hierarchical breadcrumb navigation.
  - 4-column link directory (Support, Community, Hosting, Airbnb).
  - Copyright, privacy, terms, currency, and language selectors.

---

### 2. Photo Tour View (`PhotoTourModal`)
- Fullscreen modal view with sticky header and back button.
- Category filtering tabs: `All photos (20)`, `Pool & Outdoor (6)`, `Living room (4)`, `Bedrooms (4)`, `Kitchen & dining (3)`, `Bathrooms (3)`.
- Scrollable high-resolution photo feed with custom captions and room badges.
- Clicking any image opens the Lightbox starting directly at that photo index.
- Full keyboard support (`Escape` to close).

---

### 3. Lightbox View (`LightboxModal`)
- Immersive dark fullscreen backdrop (`bg-black/95`).
- Top bar showing current counter index (e.g. `3 / 20`), Close button (`X`), and Share button.
- Centered image stage with smooth aspect ratio fitting.
- Previous (`ChevronLeft`) and Next (`ChevronRight`) navigation buttons.
- Bottom caption bar and interactive horizontal thumbnail reel.
- Full keyboard navigation:
  - `ArrowLeft` / `ArrowRight` to change photos.
  - `Escape` to close.

---

## 2. Technical Stack
- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS with custom font typography (`Plus Jakarta Sans`)
- **Icons**: `lucide-react`
- **Build Tool**: Vite 6
