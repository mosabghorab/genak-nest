import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Serialize } from '../../../core/interceptors/serialize.interceptor';
import { AllowFor } from '../../../core/metadata/allow-for.metadata';
import { UserType } from '../../shared/enums/user-type.enum';
import { PermissionsTarget } from '../../../core/metadata/permissions-target.metadata';
import { PermissionsGroups } from '../enums/permissions-groups.enum';
import { AdminMustCanDo } from '../../../core/metadata/admin-must-can-do.metadata';
import { PermissionsActions } from '../enums/permissions-actions.enum';
import { DocumentsService } from '../services/documents.service';
import { DocumentDto } from '../../shared/dtos/document.dto';
import { CreateDocumentDto } from '../dtos/create-document.dto';
import { FindAllDocumentsDto } from '../dtos/find-all-documents.dto';
import { UpdateDocumentDto } from '../dtos/update-document.dto';

@AllowFor(UserType.ADMIN)
@PermissionsTarget(PermissionsGroups.DOCUMENTS)
@Controller('admin/documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @AdminMustCanDo(PermissionsActions.CREATE)
  @Serialize(DocumentDto, 'Document created successfully.')
  @Post()
  async create(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentsService.create(createDocumentDto);
  }

  @AdminMustCanDo(PermissionsActions.VIEW)
  @Serialize(DocumentDto, 'All documents.')
  @Get()
  findAll(@Query() findAllDocumentsDto: FindAllDocumentsDto) {
    return this.documentsService.findAll(findAllDocumentsDto);
  }

  @AdminMustCanDo(PermissionsActions.VIEW)
  @Serialize(DocumentDto, 'One document.')
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const document = await this.documentsService.findOneById(id);
    if (!document) {
      throw new NotFoundException('Document not found.');
    }
    return document;
  }

  @AdminMustCanDo(PermissionsActions.UPDATE)
  @Serialize(DocumentDto, 'Document updated successfully.')
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.documentsService.update(id, updateDocumentDto);
  }

  @AdminMustCanDo(PermissionsActions.DELETE)
  @Serialize(DocumentDto, 'Document deleted successfully.')
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.documentsService.remove(id);
  }
}