import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from '@/services/search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('name')
  async searchByName(@Query('query') query: string) {
    return await this.searchService.searchByName(query);
  }

  @Get('phone')
  async searchByPhoneNumber(@Query('phoneNumber') phoneNumber: string) {
    return this.searchService.searchByPhoneNumber(phoneNumber);
  }
}
