/**
 * KALVI KAVALAR - Genkit AI Flow: Predictive Dropout Detector
 * 
 * This flow takes a Student ID, fetches their historical data from Firestore,
 * and uses an AI model to predict potential dropout behavior three weeks early.
 */

import { defineFlow, run } from '@genkit-ai/flow';
import { generate } from '@genkit-ai/ai';
import { z } from 'zod';

// Input Schema: Just the student ID to analyze
export const DropoutInputSchema = z.object({
    studentId: z.string(),
});

// Output Schema: Detailed risk assessment
export const DropoutOutputSchema = z.object({
    studentId: z.string(),
    riskScore: z.number().min(0).max(100),
    riskLevel: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
    warningFactors: z.array(z.string()),
    recommendedAction: z.string(),
    theniContext: z.string(), // Specifically mentions Theni blocks or harvest seasons
});

/**
 * The main AI Flow for detecting dropout patterns.
 */
export const predictiveDropoutFlow = defineFlow(
    {
        name: 'predictiveDropoutFlow',
        inputSchema: DropoutInputSchema,
        outputSchema: DropoutOutputSchema,
    },
    async (input) => {
        // 1. Fetch Student Data (Simulated as we are in the training phase)
        // In production, this calls the Firestore schema we defined.
        const student = await run('fetch-student-data', async () => {
            // Logic to get data from KalviKavalar/data/sample_students.json for now
            return getStudentFromMockData(input.studentId);
        });

        // 2. Call the AI Model to analyze patterns
        const response = await generate({
            model: 'googleai/gemini-1.5-flash', // Example model
            prompt: `Analyze the following attendance and family data for a girl student in Theni, Tamil Nadu:
      
      STUDENT: ${JSON.stringify(student)}
      
      Assess the risk of this student dropping out of school.
      Consider:
      - Consecutive absences or "Friday/Monday" patterns.
      - Distance to school and BPL (Below Poverty Line) status.
      - Current "Harvest Season" adjustment (Grapes/Tea in Theni).
      
      Respond with a JSON risk score (0-100), risk level (LOW/MED/HIGH/CRITICAL), 
      and a list of local warning factors. Specify action items for the teacher or community matchmaker.`
        });

        // 3. Post-Process the AI result and format for Kalvi Kavalar
        const result = response.output();

        return {
            studentId: input.studentId,
            riskScore: result.score,
            riskLevel: result.level,
            warningFactors: result.factors,
            recommendedAction: result.action,
            theniContext: `Analyzed for ${student.block} block, Theni.`
        };
    }
);

/**
 * Mock data fetcher for the training/dev phase.
 */
function getStudentFromMockData(id) {
    const students = [
        { id: "STU101", block: "Andipatti", streak: 5, bpl: true },
        { id: "STU103", block: "Uthamapalayam", streak: 0, bpl: true, status: "LONG_TERM_ABSENCE" }
    ];
    return students.find(s => s.id === id) || students[0];
}
