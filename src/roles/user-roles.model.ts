/* eslint-disable prettier/prettier */
import { User } from 'src/user/user.model';
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Roles } from './roles.model';


@Table({tableName:'user_roles',createdAt:false, updatedAt:false})
export class UserRoles extends Model<User>{
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(()=>Roles)
    @Column({ type: DataType.NUMBER})
    roleId: number;

    @ForeignKey(()=>User)
    @Column({ type: DataType.NUMBER, unique:true})
    userId: number;
  

}
