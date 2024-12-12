import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SearchService } from '@/services/search.service';
import { BasicAuthGuard } from '@/auth/auth-guard';

@Controller('search')
@UseGuards(BasicAuthGuard)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('name')
  async searchByName(@Query('query') query: string) {
    return await this.searchService.searchByName(query);
  }

  @Get('phone')
  async searchByPhoneNumber(@Query('query') phoneNumber: string) {
    return this.searchService.searchByPhoneNumber(phoneNumber);
  }
}
