import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  Resource,
  ResourceCreate,
  ResourceDetailed,
  ResourceSnapshots,
  ResourceWithMetrics,
} from './resource.entity';
import { MetricService } from 'src/metric/metric.service';
import { configs } from './config';
import { Metric, MetricDetailed } from '../metric/metric.entity';
import { ResourceConfig } from './config/types';
import { MetricConfig } from '../metric/config/types';
import { metricConfig } from '../metric/config/instances/metricConfig';

@Injectable()
export class ResourceService {
  constructor(
    private prisma: PrismaService,
    private metricService: MetricService,
  ) {}

  async findMany(filters: { project: string }): Promise<ResourceWithMetrics[]> {
    const result = await this.prisma.resource.findMany({
      where: {
        projectId: filters.project,
      },
      select: {
        id: true,
        name: true,
        projectId: true,
        platformId: true,
        platform: {
          select: {
            id: true,
            name: true,
          },
        },
        params: true,
        metrics: {
          select: {
            id: true,
            name: true,
            params: true,
            snapshotBased: true,
          },
        },
      },
    });

    result.forEach((resource) => {
      resource.metrics.forEach((metric) => {
        const config: MetricConfig = metricConfig[metric.name];
        const params = JSON.parse(metric.params);

        if (!config) return;

        config.params.forEach((param) => {
          if (!params.find((p) => p.name === param.name)) {
            params.push(param);
          }
        });

        metric.params = JSON.stringify(params);
      });

      const config: ResourceConfig = configs[resource.platform.name];
      const params = JSON.parse(resource.params);

      if (!config) return;

      config.data.forEach((param) => {
        if (!params.find((p) => p.prop === param.prop)) {
          params.push(param);
        }
      });

      resource.params = JSON.stringify(params);
    });

    return result.map((resource) => ({
      id: resource.id,
      name: resource.name,
      project: resource.projectId,
      params: resource.params,
      platform: resource.platformId,
      metrics: resource.metrics.map((metric) => ({
        id: metric.id,
        name: metric.name,
        data: [],
        resource: resource.id,
        params: metric.params || '[]',
        snapshotBased: metric.snapshotBased,
        isTracked: null,
      })),
    }));
  }

  async findOne(id: string): Promise<ResourceWithMetrics | null> {
    const result = await this.prisma.resource.findFirst({
      where: {
        id,
      },
    });

    if (!result) return null;

    const metrics = await this.metricService.findMany({ resource: result.id });

    return {
      id: result.id,
      name: result.name,
      params: result.params,
      project: result.projectId,
      platform: result.platformId,
      metrics,
    };
  }

  async createOne(resource: ResourceCreate): Promise<ResourceDetailed | null> {
    const platform = await this.prisma.platform.findFirst({
      where: {
        id: resource.platform,
      },
    });

    if (!platform) throw new Error('Platform not found');

    const config = configs[platform.name];

    if (!config) throw new Error('Platform not found');

    const result = await this.prisma.resource.create({
      data: {
        name: resource.name,
        params: JSON.stringify(config.data),
        platform: {
          connect: {
            id: resource.platform,
          },
        },
        project: {
          connect: {
            id: resource.project,
          },
        },
      },
    });

    if (!result) throw new Error('Failed to create resource');

    return {
      id: result.id,
      name: result.name,
      params: result.params,
      project: result.projectId,
      platform: result.platformId,
      metrics: [],
    };
  }

  async updateOne(resource: Resource): Promise<Resource> {
    const result = await this.prisma.resource.update({
      where: {
        id: resource.id,
      },
      data: {
        name: resource.name,
        params: resource.params,
        projectId: resource.project,
        platformId: resource.platform,
      },
    });

    if (!result) throw new Error('Failed to update resource');

    return {
      id: result.id,
      name: result.name,
      params: result.params,
      project: result.projectId,
      platform: result.platformId,
    };
  }

  populateWithSnapshots(
    resource: ResourceWithMetrics,
    snapshots: ResourceSnapshots,
  ): ResourceDetailed {
    return {
      ...resource,
      metrics: resource.metrics.map((metric) =>
        this.metricService.populateWithSnapshots(
          metric,
          snapshots ? snapshots[metric.name] : [],
        ),
      ),
    };
  }

  async deleteOne(id: string): Promise<Resource> {
    const result = await this.prisma.resource.delete({
      where: {
        id,
      },
    });

    if (!result) throw new Error('Failed to delete resource');

    return {
      id: result.id,
      name: result.name,
      params: result.params,
      project: result.projectId,
      platform: result.platformId,
    };
  }

  async getMetrics(id: string): Promise<Metric[]> {
    const metricsPrisma = await this.prisma.metric.findMany({
      where: {
        resource: {
          id,
        },
      },
      select: {
        id: true,
        params: true,
        name: true,
        resourceId: true,
        snapshotBased: true,
      },
    });

    return metricsPrisma.map((metric) => ({
      id: metric.id,
      name: metric.name,
      resource: metric.resourceId,
      snapshotBased: metric.snapshotBased,
      params: metric.params || '[]',
    }));
  }

  async createAllMetrics(resourceId: string) {
    const metrics = await this.metricService.listAll();

    const result: MetricDetailed[] = [];

    await Promise.all(
      metrics.map(async (metric) => {
        const metricInDB = await this.prisma.metric.findFirst({
          where: {
            name: metric.name,
            resourceId: resourceId,
          },
        });

        if (metricInDB) return;

        console.log(metric.name);

        const metricCreateResult = await this.metricService.create({
          params: '',
          name: metric.name,
          resource: resourceId,
        });

        if (metricCreateResult) result.push(...metricCreateResult);
      }),
    );

    return result;
  }

  async startTracking(id: string) {
    const metrics = await this.getMetrics(id);
    if (!metrics) throw new Error("Couldn't get metrics");

    const result = await Promise.all(
      metrics.map((metric) => this.metricService.start(metric)),
    );

    return result;
  }

  async stopTracking(id: string) {
    const metrics = await this.getMetrics(id);
    if (!metrics) throw new Error("Couldn't get metrics");

    const result = await Promise.all(
      metrics.map((metric) => this.metricService.stop(metric.id, false)),
    );

    return result;
  }
}
