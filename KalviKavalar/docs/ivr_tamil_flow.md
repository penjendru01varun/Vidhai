# 📞 KALVI KAVALAR - Refined Tamil IVR Script (Theni Dialect)

This script is designed for Agent 6 (Voice Assistant) to handle low-literacy parent communication. It includes logic for absence reporting, success stories, and teacher connection.

---

## **Phase 1: Greeting & Identification**
- **IVR**: "வணக்கம். நான் கல்வி காவலர் செவிலி பேசுகிறேன். *(Hello, I am the Kalvi Kavalar Nursing Assistant speaking.)*"
- **IVR**: "நீங்கள் {parent_name} தானா? [மகள்: {student_name}] ஆமென்றால் 1 அழுத்தவும். *(Are you {parent_name}? [Daughter: {student_name}]. If yes, press 1.)*"

---

## **Phase 2: Attendance Update (If Absent)**
- **IVR**: "இன்று {student_name} பள்ளிக்கு வரவில்லை. இது ஏன் என்று எங்களுக்குத் தெரியப்படுத்தினால் நல்லது. *(Today {student_name} did not come to school. It would be good to let us know why.)*"
- **Options**:
  - `1`: "உடல்நிலை சரியில்லை *(Illness)*"
  - `2`: "குடும்ப விழா *(Family function)*"
  - `3`: "வேலைக்கு சென்றுள்ளார் *(Gone for work - TRIGGERS ALERT)*"
  - `4`: "மற்ற காரணங்கள் *(Other reasons)*"

---

## **Phase 3: Engagement & Motivation**
- **IVR**: "{student_name} இதுவரை {streak} நாட்கள் தொடர்ந்து பள்ளிக்கு வந்துள்ளார். அவர் ஒரு சாதனையாளர்! *(She has come for {streak} days continuously. She is an achiever!)*"
- **IVR**: "தேனி மாவட்ட நர்சு ஒருவரின் வெற்றி கதையை கேட்க 3 அழுத்தவும். *(Press 3 to hear a success story of a nurse from Theni district.)*"

---

## **Phase 4: Support Connection**
- **IVR**: "ஆசிரியரிடம் பேச விரும்பினால் 0 அழுத்தவும். *(Press 0 if you want to speak to the teacher.)*"

---

## **Agent 6 Logic Update (Theni-Specific Nuances)**
- **Language**: Standard Tamil (Senthamil) is often too formal for rural Theni. The voice should use **Local Theni Dialect** (Madurai-Theni accent) with warm hospitality tones.
- **Retry Logic**: If no input is received after 10 seconds, repeat the greeting once. If still no input, Agent 2 (Smart Communicator) will trigger a "Home Visit Requested" status.
