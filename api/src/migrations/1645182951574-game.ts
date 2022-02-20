import { MigrationInterface, QueryRunner } from 'typeorm'

export class game1645182951574 implements MigrationInterface {
  name = 'game1645182951574'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "game" ("id" SERIAL NOT NULL, "board_id" character varying NOT NULL, "manager_id" character varying NOT NULL, "player1" character varying NOT NULL, "player2" character varying NOT NULL, "started_at" TIMESTAMP NOT NULL, "finished_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(`ALTER TABLE "owner" DROP COLUMN "otp"`)
    await queryRunner.query(`ALTER TABLE "owner" ADD "otp" integer`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "owner" DROP COLUMN "otp"`)
    await queryRunner.query(`ALTER TABLE "owner" ADD "otp" character varying`)
    await queryRunner.query(`DROP TABLE "game"`)
  }
}
