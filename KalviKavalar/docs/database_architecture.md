# 🔥 KALVI KAVALAR - Firebase Firestore Architecture

This document outlines the professional-grade database schema required to handle the multi-platform ecosystem and 15 AI agents.

## 1. Collections & Schema

### `students` (Collection)
| Field | Type | Description |
|---|---|---|
| `id` | `String` | Unique Student ID (EMIS based) |
| `name` | `String` | Student's full name |
| `class` | `String` | Current grade (e.g., "9-B") |
| `block` | `String` | Theni block (e.g., "Andipatti") |
| `risk_score` | `Number` | 0-100 (Updated by Agent 1) |
| `risk_level` | `String` | "GREEN", "YELLOW", "RED" |
| `parent_id` | `Reference` | Pointer to `parents` document |
| `streak` | `Number` | Consecutive days present |
| `total_coins` | `Number` | For gamification engine |
| `is_active` | `Boolean` | Current status |

### `attendance_logs` (Sub-collection under `students/{id}`)
| Field | Type | Description |
|---|---|---|
| `date` | `Timestamp` | Date of attendance |
| `status` | `String` | "PRESENT", "ABSENT", "LATE" |
| `marked_by` | `String` | Teacher ID |

### `parents` (Collection)
| Field | Type | Description |
|---|---|---|
| `id` | `String` | Phone number (Primary Key) |
| `name` | `String` | Mother/Father Name |
| `literacy` | `String` | "HIGH", "MED", "LOW" (Used for IVR vs App) |
| `dialect` | `String` | "Theni_Standard", "Theni_Rural" |
| `last_called` | `Timestamp` | For Smart Communicator (Agent 2) |

### `alerts` (Collection)
| Field | Type | Description |
|---|---|---|
| `student_id` | `Reference` | Pointer to student |
| `type` | `String` | "ABSENCE_ALERT", "RISK_WARNING" |
| `priority` | `String` | "CRITICAL", "HIGH", "NORMAL" |
| `status` | `String` | "PENDING", "SENT", "RESPONDED" |

---

## 2. Security Rules (RBAC)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Function to check if user is an Admin
    function isAdmin() {
      return request.auth.token.role == 'admin';
    }

    // Function to check if user is the assigned Teacher
    function isTeacherFor(block) {
      return request.auth.token.role == 'teacher' && request.auth.token.block == block;
    }

    // Students: Only Admins can create/delete. Teachers in same block can Edit.
    match /students/{studentId} {
      allow read: if request.auth != null;
      allow create, delete: if isAdmin();
      allow update: if isAdmin() || isTeacherFor(resource.data.block);
    }

    // Attendance: Teachers only for their class.
    match /students/{studentId}/attendance_logs/{logId} {
      allow read, write: if isTeacherFor(get(/databases/$(database)/documents/students/$(studentId)).data.block);
    }

    // Parents: Only Admins and assigned Teachers can access contact info.
    match /parents/{parentId} {
      allow read: if isAdmin() || request.auth.token.role == 'teacher';
      allow write: if isAdmin();
    }
  }
}
```
