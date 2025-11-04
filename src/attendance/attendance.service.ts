import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';

export interface Attendance {
  attendance_id: number;
  user_id: number;
  date: string;
  time: string;
  status: string; // "hadir" | "izin" | "sakit" | "alpa"
  group?: string; // kelas / jabatan (opsional)
}

@Injectable()
export class AttendanceService {
  private attendanceList: Attendance[] = [];

  create(data: any) {
    const { user_id, date, time, status, group } = data;

    if (!user_id || !date || !time) {
      return { message: 'Data presensi tidak lengkap' };
    }

    const attendanceStatus = status || this.getStatus(time);

    const newAttendance: Attendance = {
      attendance_id: this.attendanceList.length + 1,
      user_id: Number(user_id),
      date,
      time,
      status: attendanceStatus.toLowerCase(),
      group: group || 'Umum',
    };

    this.attendanceList.push(newAttendance);

    return {
      status: 'success',
      message: 'Presensi berhasil dicatat',
      data: newAttendance,
    };
  }

  getHistory(user_id: number) {
    const userAttendance = this.attendanceList.filter(
      (a) => a.user_id === user_id,
    );

    if (userAttendance.length === 0) {
      return { message: 'Riwayat presensi tidak ditemukan' };
    }

    return {
      status: 'success',
      data: userAttendance,
    };
  }

  // 🔹 Rekap bulanan
  getMonthlySummary(user_id: number) {
    const now = dayjs();
    const month = now.format('MM-YYYY');

    const userData = this.attendanceList.filter(
      (a) =>
        a.user_id === user_id &&
        dayjs(a.date).month() === now.month() &&
        dayjs(a.date).year() === now.year(),
    );

    const summary = {
      hadir: 0,
      izin: 0,
      sakit: 0,
      alpa: 0,
    };

    userData.forEach((a) => {
      if (summary[a.status as keyof typeof summary] !== undefined) {
        summary[a.status as keyof typeof summary]++;
      }
    });

    return {
      status: 'success',
      data: {
        user_id,
        month,
        attendance_summary: summary,
      },
    };
  }

  // 🔹 Analisis kehadiran berdasarkan periode dan kategori
  getAttendanceAnalysis(body: any) {
    const { start_date, end_date, group_by } = body;
    const start = dayjs(start_date);
    const end = dayjs(end_date);

    const filteredData = this.attendanceList.filter((a) => {
      const d = dayjs(a.date);
      return d.isAfter(start.subtract(1, 'day')) && d.isBefore(end.add(1, 'day'));
    });

    // Kelompokkan berdasarkan "group" (misal kelas / jabatan)
    const grouped: Record<string, Attendance[]> = {};

    filteredData.forEach((a) => {
      const group = a.group || 'Umum';
      if (!grouped[group]) grouped[group] = [];
      grouped[group].push(a);
    });

    const groupedAnalysis = Object.entries(grouped).map(([group, records]) => {
      const totalUsers = new Set(records.map((r) => r.user_id)).size;

      const totals = {
        hadir: 0,
        izin: 0,
        sakit: 0,
        alpa: 0,
      };

      records.forEach((r) => {
        if (totals[r.status as keyof typeof totals] !== undefined) {
          totals[r.status as keyof typeof totals]++;
        }
      });

      const totalAttendance = Object.values(totals).reduce((a, b) => a + b, 0);

      const percentages = {
        hadir_percentage: totalAttendance ? (totals.hadir / totalAttendance) * 100 : 0,
        izin_percentage: totalAttendance ? (totals.izin / totalAttendance) * 100 : 0,
        sakit_percentage: totalAttendance ? (totals.sakit / totalAttendance) * 100 : 0,
        alpa_percentage: totalAttendance ? (totals.alpa / totalAttendance) * 100 : 0,
      };

      return {
        group,
        total_users: totalUsers,
        attendance_rate: percentages,
        total_attendance: totals,
      };
    });

    return {
      status: 'success',
      data: {
        analysis_period: { start_date, end_date },
        grouped_analysis: groupedAnalysis,
      },
    };
  }

  // 🔸 Helper status otomatis
  private getStatus(time: string): string {
    const [hour] = time.split(':').map(Number);
    if (hour < 8) return 'hadir';
    else if (hour >= 8 && hour < 9) return 'izin';
    else if (hour >= 9 && hour < 12) return 'sakit';
    else return 'alpa';
  }
}