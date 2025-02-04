import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1738678305825 implements MigrationInterface {
  name = 'Migrations1738678305825';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "list" ADD "items" integer array`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "list" DROP COLUMN "items"`);
  }
}
