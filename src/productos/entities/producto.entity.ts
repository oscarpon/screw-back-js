import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Producto {

    @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

}
