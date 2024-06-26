import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { PlatformModule } from './platform/platform.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectModule } from './project/project.module';
import { ResourceModule } from './resource/resource.module';
import { MetricModule } from './metric/metric.module';
import { SnapshotModule } from './snapshot/snapshot.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { CookieModule } from './cookie/cookie.module';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './token/token.module';
import { MetricGatewayModule } from './metric-gateway/metric-gateway.module';
import { ResubscribeModule } from './resubscribe/resubscribe.module';
import { ImportModule } from './import/import.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    TaskModule,
    PlatformModule,
    PrismaModule,
    ProjectModule,
    ResourceModule,
    MetricModule,
    SnapshotModule,
    AuthModule,
    AdminModule,
    CookieModule,
    ConfigModule.forRoot(),
    TokenModule,
    MetricGatewayModule,
    ResubscribeModule,
    ImportModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
