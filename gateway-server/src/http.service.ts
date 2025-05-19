import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HttpProxyService {
    constructor(private readonly httpService: HttpService) {}

    async forwardRequest(
        method: string,
        targetUrl: string,
        data: any = null,
        headers: Record<string, string> = {},
    ): Promise<AxiosResponse> {
        const config = {
            method,
            url: targetUrl,
            data,
            headers,
        };
        return await firstValueFrom(this.httpService.request(config));
    }
}
