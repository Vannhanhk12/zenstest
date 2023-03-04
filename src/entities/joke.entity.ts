import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'zens_jokes' })
export class Joke {
  @PrimaryGeneratedColumn()
  id?: number | string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;

  @Column({ type: 'text', nullable: true })
  title: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Column({ type: 'text', nullable: true })
  liked: number;

  @Column({ type: 'text', nullable: true })
  disliked: number;

  @Column({ type: 'text', nullable: true })
  author: string;

  constructor(data: any) {
    if (data) {
      this.id = data.id;
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
      this.title = data.title;
      this.content = data.content;
      this.liked = data.liked;
      this.disliked = data.disliked;
      this.author = data.author;
    }
  }

  serialize() {
    return {
      title: this.title,
      content: this.content,
      author: this.author,
      liked: this.liked,
      disliked: this.disliked,
    };
  }
}
