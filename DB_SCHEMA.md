## Database Overview

This project uses **Supabase (PostgreSQL)** as the backend.  
All user–specific data is scoped by the `user_id` column on the `people` table and (via foreign keys) on related tables.

### Tables

#### `people`

- **Purpose**: Core entity for each person you’re planning gifts for.
- **Columns**:
  - **`id` (uuid, PK)**: Unique identifier for the person. Defaults to `gen_random_uuid()`.
  - **`user_id` (uuid, FK → `auth.users.id`)**: The authenticated user who owns this person. **Not null**.
  - **`name` (text)**: Full name of the person. **Not null**.
  - **`birthday` (date)**: Date of birth. **Not null**.
  - **`relationship` (text)**: Optional relationship label (e.g. “Father”, “Friend”, “Colleague”).
  - **`avatar_url` (text)**: Optional URL to a profile image.
  - **`notes` (text)**: Optional free–form notes about the person.
  - **`created_at` (timestamptz)**: Timestamp when the row was created. Default `now()`.
  - **`updated_at` (timestamptz)**: Timestamp when the row was last updated. Default `now()`.

#### `profiles`

- **Purpose**: Extended profile information for a person (interests, likes, hints).
- **Columns**:
  - **`id` (uuid, PK)**: Unique identifier. Defaults to `gen_random_uuid()`.
  - **`person_id` (uuid, FK → `people.id`)**: The person this profile belongs to. **Not null**.
  - **`interests` (text[])**: Optional array of interests (e.g. `{"travel","music"}`).
  - **`likes` (text[])**: Optional array of things they like.
  - **`gift_hints` (text[])**: Optional array of hints/suggestions collected over time.
  - **`created_at` (timestamptz)**: Created timestamp. Default `now()`.
  - **`updated_at` (timestamptz)**: Updated timestamp. Default `now()`.

#### `events`

- **Purpose**: Important dates related to a person (birthdays, anniversaries, etc.).
- **Columns**:
  - **`id` (uuid, PK)**: Unique identifier. Defaults to `gen_random_uuid()`.
  - **`person_id` (uuid, FK → `people.id`)**: The person the event is for. **Not null**.
  - **`title` (text)**: Human–readable label (e.g. “Birthday”, “10th Anniversary”). **Not null**.
  - **`date` (date)**: The calendar date of the event. **Not null**.
  - **`type` (text)**: Event type (e.g. `birthday`, `anniversary`, `name_day`, `other`).
  - **`status` (text)**: Optional status (e.g. `coming_soon`, `gift_ordered`, `completed`).
  - **`created_at` (timestamptz)**: Created timestamp. Default `now()`.
  - **`updated_at` (timestamptz)**: Updated timestamp. Default `now()`.

#### `gift_suggestions`

- **Purpose**: AI/manual suggestions for gifts tied to a specific person.
- **Columns**:
  - **`id` (uuid, PK)**: Unique identifier. Defaults to `gen_random_uuid()`.
  - **`person_id` (uuid, FK → `people.id`)**: The person this suggestion is for. **Not null**.
  - **`title` (text)**: Short label for the idea (e.g. “Wireless headphones”). **Not null**.
  - **`description` (text)**: Optional longer description of the gift.
  - **`reason` (text)**: Optional “why this gift works” explanation.
  - **`link` (text)**: Optional URL to the product or reference.
  - **`category` (text)**: Optional category label (e.g. `tech`, `books`, `experience`).
  - **`created_at` (timestamptz)**: Created timestamp. Default `now()`.
  - **`updated_at` (timestamptz)**: Updated timestamp. Default `now()`.

#### `social_accounts`

- **Purpose**: Social media accounts for a person, used for inspiration and context.
- **Columns**:
  - **`id` (uuid, PK)**: Unique identifier. Defaults to `gen_random_uuid()`.
  - **`person_id` (uuid, FK → `people.id`)**: The person this account belongs to. **Not null**.
  - **`platform` (text)**: Platform name (e.g. `Instagram`, `TikTok`, `LinkedIn`, `Facebook`).
  - **`username` (text)**: Optional username/handle on the platform.
  - **`profile_url` (text)**: Optional direct URL to the profile.
  - **`created_at` (timestamptz)**: Created timestamp. Default `now()`.
  - **`updated_at` (timestamptz)**: Updated timestamp. Default `now()`.

### Relationships and Ownership

- A row in **`people`** belongs to exactly one authenticated user (`user_id`).
- **`profiles`**, **`events`**, **`gift_suggestions`**, and **`social_accounts`** are all **children of `people`** via `person_id`.
- Data–isolation is enforced by:
  - Only querying `people` by `user_id = auth.uid()` on the client.
  - Using foreign keys and Row Level Security (RLS) policies so that:
    - Related rows in `profiles`, `events`, `gift_suggestions`, and `social_accounts` are only accessible when their `person_id` points to a `people` row owned by the current user.

### Insert Flow in “Add Person”

When you complete the **Add Person** flow in the app, the backend performs these steps:

1. **Insert into `people`**
   - Uses the logged–in user’s `auth.uid()` as `user_id`.
   - Stores core fields: `name`, `birthday`, `relationship`.

2. **Insert/Upsert into `profiles`**
   - If you entered interests, creates or updates a row in `profiles` for that `person_id`.

3. **Insert into `events`**
   - Always adds a birthday event when a birthday is provided.
   - Optionally adds additional milestone events (e.g. anniversaries, name days) from the calendar step.

4. **Insert into `social_accounts`**
   - For each social link you provide (Instagram, TikTok, LinkedIn, Facebook, etc.), creates a row tied to the same `person_id`.

This keeps all gift–planning data normalized, easy to query, and cleanly scoped per user.

