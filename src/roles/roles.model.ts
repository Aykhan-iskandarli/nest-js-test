/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {  BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { User } from 'src/user/user.model';
import { UserRoles } from './user-roles.model';

@Table({ tableName: 'roles' })
export class Roles extends Model<User>{
  @ApiProperty({ example: '1', description: 'Roles identity' })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  
  @ApiProperty({example:'ADMIN', description:"Role"})
  @Column({ type: DataType.STRING, unique:true, allowNull:false })
  value: string;
  
  @ApiProperty({example:'Administrator', description:"Role description"})
  @Column({ type: DataType.STRING, unique:true, allowNull:false })
  description: string;

  @BelongsToMany(() => User,()=> UserRoles )
  users: User[];
}

