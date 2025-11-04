import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) { }

  @Post()
  create(@Body() body: any): any {
    return this.attendanceService.create(body);
  }

  @Get('history/:user_id')
  getHistory(@Param('user_id', ParseIntPipe) user_id: number): any {
    return this.attendanceService.getHistory(user_id);
  }

  @Get('summary/:user_id')
  getMonthlySummary(@Param('user_id', ParseIntPipe) user_id: number): any {
    return this.attendanceService.getMonthlySummary(user_id);
  }

  @Post('analysis')
  getAttendanceAnalysis(@Body() body: any): any {
    return this.attendanceService.getAttendanceAnalysis(body);
  }
}