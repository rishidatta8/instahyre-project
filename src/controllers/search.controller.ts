import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SearchService } from '@/services/search.service';
import { BasicAuthGuard } from '@/auth/auth-guard';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Search')
@Controller('search')
@UseGuards(BasicAuthGuard)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @ApiOperation({ summary: 'Search contacts by name' })
  @ApiParam({
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
  @ApiParam({
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
