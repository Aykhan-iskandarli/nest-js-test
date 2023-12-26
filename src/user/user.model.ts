/* eslint-disable prettier/prettier */
// import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// import { Roles } from 'src/roles/roles.model';
import {  BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Roles } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';
// import { UserRoles } from 'src/roles/user-roles.model';



@Table({ tableName: 'user' })
export class User extends Model<User> {
  static find(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  @ApiProperty({ example: '1', description: 'User identity' })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({example:'Axiles@gmail.com', description:"User email address"})
  @Column({ type: DataType.STRING, unique:true, allowNull: false})
  email: string;

  @ApiProperty({example:'123456', description:"User password"})
  @Column({ type: DataType.STRING, unique:true, allowNull: false})
  password: string;

  @ApiProperty({example:'true', description:"banned"})
  @Column({ type: DataType.BOOLEAN, defaultValue: false})
  banned: string;

  @ApiProperty({example:'ban description', description:"ban reason"})
  @Column({ type: DataType.BOOLEAN, allowNull: true})
  banReason: string;

  @BelongsToMany(() => Roles,()=> UserRoles )
  roles: Roles[];
}
