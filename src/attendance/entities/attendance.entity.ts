export interface Attendance {
    attendance_id: number;
    user_id: number;
    date: string; // YYYY-MM-DD
    time: string; // HH:MM:SS
    status: string;
}