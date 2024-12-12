import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SearchService } from '@/services/search.service';
import { BasicAuthGuard } from '@/auth/auth-guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBasicAuth,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Search')
@Controller('search')
@ApiBasicAuth()
@UseGuards(BasicAuthGuard)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @ApiOperation({ summary: 'Search contacts by name' })
  @ApiQuery({
    name: 'query',
    type: 'string',
    description: 'The name search query',
  })
  @ApiResponse({
    status: 200,
    description: 'The list of contacts found by name',
  })
  @Get('name')
  async searchByName(@Query('query') query: string) {
    return await this.searchService.searchByName(query);
  }

  @ApiOperation({ summary: 'Search contacts by phone number' })
  @ApiQuery({
    name: 'phoneNumber',
    type: 'string',
    description: 'The phone number search query',
  })
  @ApiResponse({
    status: 200,
    description: 'The list of contacts found by phone number',
  })
  @Get('phone')
  async searchByPhoneNumber(@Query('phoneNumber') phoneNumber: string) {
    return this.searchService.searchByPhoneNumber(phoneNumber);
  }
}
