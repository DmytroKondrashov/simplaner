import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1738342839418 implements MigrationInterface {
  name = 'Migrations1738342839418';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "list" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_d8feafd203525d5f9c37b3ed3b9" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "list"`);
  }
}
