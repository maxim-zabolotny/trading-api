import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity('files')
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({
    unique: true,
  })
  @Column({
    name: 'image',
  })
  image: string;

  @Column({
    name: 'file_name',
  })
  fileName: string;
}