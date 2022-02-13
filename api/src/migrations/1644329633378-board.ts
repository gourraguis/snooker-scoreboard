import { MigrationInterface, QueryRunner } from 'typeorm'

export class board1644329633378 implements MigrationInterface {
  name = 'board1644329633378'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "board" ("id" character varying NOT NULL, "name" character varying NOT NULL, "owner" character varying NOT NULL, CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "board"`)
  }
}
