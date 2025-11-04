import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AttendanceModule } from './attendance/attendance.module';
import { AuthModule } from './auth/auth.module';
import { DecoratorsModule } from './decorators/decorators.module';
import { GuardsModule } from './guards/guards.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AttendanceModule, AuthModule, DecoratorsModule, GuardsModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
